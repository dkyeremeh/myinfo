# RECON AUTH UI 
This is just a service for auth for recon service. 

## Security
This is not intended to be a secure auth service. Do not use for any productions system

## Usage
### Login
1. Embed this as an iframe into the
2. After authentication, the token will be sent through postMessage with the structure shown.

```ts
{
  action: 'LOGIN_SUCCESSFUL',
  token: `jwt-token`
}
```
3. The main window will need to listen to this event to get the token

### Logout
1. Embed an iframe to the path /logout
2. The following data will be sent through postMessage
```ts
{ action: 'LOGOUT_SUCCESSFUL' }
```


