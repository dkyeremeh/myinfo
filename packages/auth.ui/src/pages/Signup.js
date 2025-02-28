var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { TextField } from '@mui/material';
import { signup } from '../utils/api';
const Signup = () => {
    const [response, setResponse] = useState({});
    const [repassword, setRepassword] = useState('');
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield signup(Object.assign(Object.assign({}, data), { repassword }));
        setResponse(res);
        // setMessage(msg)
        location.assign('/login');
    });
    const bottomContent = (<div>
      Have an account? <a href="/login">Login</a>
      {!response.success && (<div style={{ marginTop: '1em', color: '#c22' }}>{response.msg}</div>)}
    </div>);
    return (<AuthForm onSubmit={onSubmit} title="Signup" bottomContent={bottomContent}>
      <TextField label="Confirm Password" type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required/>
    </AuthForm>);
};
export default Signup;
