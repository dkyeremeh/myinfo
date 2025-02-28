var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { postAuthStatus, saveToken } from './auth';
//@ts-expect-error mumbo jumbo
const config = window.config;
const api = axios.create({
    baseURL: config.authApiUrl,
    headers: { 'Content-Type': 'application/json' },
});
export const login = (data, onSuccess) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield api.post('/login', data);
        saveToken(response.data.token);
        postAuthStatus('LOGIN_SUCCESS');
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(response.data.token);
    }
    catch (error) {
        window.parent.postMessage({
            action: 'LOGIN_FAILED',
            error,
        }, 
        // @ts-ignore
        window.config.parentHost);
        console.error('Login failed:', error);
    }
});
export const signup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield api.post('/signup', data);
        console.log('Signup successful:', response.data);
        return { success: true, msg: 'Signup successful' };
    }
    catch (error) {
        console.error('Signup failed:', error); // @ts-ignore
        const msg = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || error.message;
        return { success: false, msg };
    }
});
export default api;
