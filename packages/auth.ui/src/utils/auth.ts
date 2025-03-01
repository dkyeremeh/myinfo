// @ts-ignore
const parentHost = window.config.parentHost;

export const getIsLoggedIn = () => !!localStorage.getItem('token');

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const postAuthStatus = (action?: string) => {
  const token = getToken();

  console.log('sending status to', parentHost);

  window.parent.postMessage(
    { state: token ? 'LOGGED_IN' : 'LOGGED_OUT', action, token },
    // @ts-ignore
    window.config.parentHost
  );
};

export const logout = async () => {
  localStorage.removeItem('token');
};
