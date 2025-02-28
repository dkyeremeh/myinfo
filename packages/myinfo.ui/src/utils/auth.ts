// @ts-ignore
const parentHost = window.config.parentHost;

export const getIsLoggedIn = () => !!sessionStorage.getItem('token');

export const saveToken = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const getToken = () => sessionStorage.getItem('token');

export const getAuthHeader = () => `Bearer ${getToken()}`;
