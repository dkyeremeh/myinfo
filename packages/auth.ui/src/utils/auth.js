var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
const parentHost = window.config.parentHost;
export const getIsLoggedIn = () => !!localStorage.getItem('token');
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};
export const getToken = () => localStorage.getItem('token');
export const postAuthStatus = (action) => {
    const token = getToken();
    console.log('sending status to', parentHost);
    window.parent.postMessage({
        state: token ? 'LOGGED_IN' : 'LOGGED_OUT',
        action,
        token,
    }, '*');
};
export const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    localStorage.removeItem('token');
});
