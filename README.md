# AUTH
This is a simple proof of concept auth service

*Note:* There are a number of security concerns with this app. Do not use it except for local deployments

## Usage
1. Embed this as an iframe into your app with the iframe src pointing to `/login` or `/logout`
2. Depending on the state, a message will be sent by `postMessage` indicating the state of the auth service as well as any event.

```ts
{
  action?: 'LOGIN_SUCCESS' | 'LOGOUT_SUCCESS' 
  state: 'LOGGED_IN' | 'LOGGED_OUT',
  token?: `jwt-token`
}
```
3. The main window will need to listen to the message event to get the token as shown
```ts
  window.addEventListener('message', ({data}) => {
    switch(data?.action){
        case "LOGIN_SUCCESS":
        // Do stuff with the token. Maybe save it or something
        saveAccessToken(data.token)

        case "LOGOUT_SUCCESS":
        // Delete token or do whatever logout is supposed to do

        deleteAccessToken()
        default: 
        // We actually don't need a default. So don't add one
    }
  });
```



