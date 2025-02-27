export const getIsLoggedIn = () => !!localStorage.getItem('token');

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const postAuthStatus = (action?: string) => {
  const token = getToken();

  window.parent.postMessage({
    state: token ? 'LOGGED_IN' : 'LOGGED_OUT',
    action,
    token,
  });
};

export const logout = async () => {
  localStorage.removeItem('token');
};
