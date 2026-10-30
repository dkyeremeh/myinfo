# Myinfo

Myinfo is a demo app that allows users to find their digital footprint on the internet by scanning multiple sources and data brokers on the internet. Once a user signs up, a scanner service is launched which performs the actual scanning. The data is presented through a UI to the user. 

## Setup

### Configuration

The app is configured via two files in `k8s/`, neither of which is committed to git:

1. Copy `k8s/config.yml.example` to `k8s/config.yml` — non-sensitive settings (service URLs,
   DB names/users).
1. Copy `k8s/secrets.yml.example` to `k8s/secrets.yml` — sensitive values (`AUTH_DB_PASS`,
   `MYINFO_DB_PASS`, `JWT_SECRET`), kept out of the `ConfigMap` and applied as a Kubernetes
   `Secret` instead.
1. Fill in real values in both files (at minimum, change the placeholder passwords/secrets).

For local development with `docker-compose` instead of Kubernetes, copy `.env.example` to `.env`
and fill it in the same way — `docker-compose.yml` loads it via `env_file`.

### Running

Run `kubectl apply -f k8s` or `yarn start` to start the app.

## Architecture

The app is split into two independently deployable "products" — **auth** (sign up / log in) and **myinfo** (the footprint scan) — each with its own UI, API, and database. A `myinfo.scanner` service performs the actual (simulated) scanning work. Every service is stateless and horizontally scalable except the two databases.

```mermaid
flowchart LR
    subgraph outside[Outside the cluster]
        browser(["Browser"])
    end

    subgraph k8s["Kubernetes cluster"]
        subgraph authGroup["auth"]
            authUi["auth.ui\n(NodePort 30001)"]
            authApi["auth.api\n(NodePort 30002)"]
            authDb[("auth-db\nMariaDB + PVC")]
        end

        subgraph myinfoGroup["myinfo"]
            myinfoUi["myinfo.ui\n(NodePort 30000)"]
            myinfoApi["myinfo.api\n(NodePort 30003)"]
            myinfoDb[("myinfo-db\nMariaDB + PVC")]
            scanner["myinfo.scanner\n(ClusterIP, internal only)"]
        end
    end

    browser -->|HTTP| authUi
    browser -->|HTTP| myinfoUi
    authUi -->|REST| authApi
    myinfoUi -->|REST, JWT| myinfoApi
    authApi --> authDb
    myinfoApi --> myinfoDb
    authApi -->|"POST /internal/scan\n(x-internal-api-key)"| myinfoApi
    myinfoApi -->|"POST /scan\n(x-internal-api-key)"| scanner
    scanner -->|"POST /internal/scan-result\n(x-internal-api-key)"| myinfoApi
```

- **auth.ui / myinfo.ui** — React SPAs served by a small Express host, the only components reachable from a browser (`NodePort`).
- **auth.api** — owns signup/login, issues JWTs, and is the only service with write access to `auth-db`.
- **myinfo.api** — owns the scanned data, validates the JWT on `/api/*`, and exposes `/internal/*` routes used only by other services.
- **myinfo.scanner** — stateless worker that performs the (fake) data-broker scan; has no database of its own and is only reachable from inside the cluster (`ClusterIP`).
- **auth-db / myinfo-db** — one MariaDB instance per bounded context, each backed by a `PersistentVolumeClaim` so data survives pod restarts. Not scaled (`replicas: 1`), per the assignment's requirements.

### Signup → scan flow

Scanning is kicked off as a side effect of signup/login and runs asynchronously: `myinfo.scanner` acknowledges the scan request immediately (`202`) and reports results back once it "finds" them.

```mermaid
sequenceDiagram
    participant U as Browser
    participant AU as auth.ui
    participant AA as auth.api
    participant MA as myinfo.api
    participant MS as myinfo.scanner
    participant DB as myinfo-db

    U->>AU: Sign up / log in
    AU->>AA: POST /signup or /login
    AA->>AA: Validate, hash password, issue JWT
    AA-->>MA: POST /internal/scan (user, isNewUser)
    AA-->>U: 200 OK + JWT
    MA->>MA: Insert user if new
    MA-->>MS: POST /scan
    MS-->>MA: 202 Accepted (ack only)
    Note over MS: Background loop "finds" results
    MS-->>MA: POST /internal/scan-result (per result)
    MA->>DB: Insert into user_info

    U->>MA: GET /api/info (JWT)
    MA->>DB: SELECT user_info WHERE user = id
    MA-->>U: Scan results
```

All service-to-service calls under `/internal/*` require a shared `INTERNAL_API_KEY` sent via the `x-internal-api-key` header, since `myinfo-api`'s Service is exposed as `NodePort` and would otherwise be reachable from outside the cluster.