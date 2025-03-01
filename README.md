# Myinfo

Myinfo is a demo app that allows users to find their digital footprint on the internet by scanning multiple sources and data brokers on the internet. Once a signs up, a scanner service is launched which performs the actual scanning. The data is presented through a UI to the user. 

## Setup
1. Copy `k8s/config.yml.example` to `k8s/config.yml`
1. Update the settings in the `k8s/config.yml` file
1. Run `kubectl apply -f k8s` or `yarn start` to start the app