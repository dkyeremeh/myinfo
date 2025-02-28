import { useEffect, useRef } from 'react';

const Auth = ({ path }: { path: string }) => {
  // @ts-ignore
  const authUrl = window.config.authUrl;
  const src = authUrl + (path ?? '/login');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    console.log('listening to events');
    window.addEventListener('message', (event) => {
      console.log('message event', event.data?.state);

      if (event.data?.state === 'LOGGED_IN' && authUrl.match(event.origin)) {
        sessionStorage.setItem('token', event.data.token);
        location.assign('/');
      }

      if (event.data?.state === 'LOGGED_OUT' && authUrl.match(event.origin)) {
        sessionStorage.removeItem('token');
        if (!path.match('/login')) location.assign('/login');
      }
    });
  }, []);

  return (
    <iframe
      src={src}
      ref={iframeRef}
      style={{
        border: 0,
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default Auth;
