import { useEffect, useRef } from 'react';
const Auth = ({ path }) => {
    // @ts-ignore
    const authUrl = window.config.authUrl;
    const src = authUrl + (path !== null && path !== void 0 ? path : '/login');
    const iframeRef = useRef(null);
    useEffect(() => {
        console.log('listening to events');
        window.addEventListener('message', (event) => {
            var _a, _b, _c;
            console.log('message event', (_a = event.data) === null || _a === void 0 ? void 0 : _a.state);
            if (((_b = event.data) === null || _b === void 0 ? void 0 : _b.state) === 'LOGGED_IN' && authUrl.match(event.origin)) {
                sessionStorage.setItem('token', event.data.token);
                location.assign('/');
            }
            if (((_c = event.data) === null || _c === void 0 ? void 0 : _c.state) === 'LOGGED_OUT' && authUrl.match(event.origin)) {
                sessionStorage.removeItem('token');
                if (!path.match('/login'))
                    location.assign('/login');
            }
        });
    }, []);
    return (<iframe src={src} ref={iframeRef} style={{
            border: 0,
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
        }}/>);
};
export default Auth;
