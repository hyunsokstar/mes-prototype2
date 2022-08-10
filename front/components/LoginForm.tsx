import { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import api from "../utils/api"
import userSlice from "../slices/user"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducer';

type Props = {
}

const LoginBar = styled.h1`
    display: flex;
    justify-content: flex-end;
`;


function LoginForm({ }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = useCallback(async () => {
        try {
            const response = await axios.post(
                `${api.cats}/login`,
                { email, password },
                { withCredentials: true }
            );
            console.log("response.data : ", response.data);

            if (response.data) {
                dispatch(
                    userSlice.actions.setUser({
                        email: response.data.data.email,
                        name: response.data.data.name,
                        accessToken: response.data.data.token,
                    }),
                );
            }

            localStorage.setItem('mes-token', response.data.data.token);


        } catch (error: any) {
            if (error.response) {
                console.log(error.response);
                alert(error.response.data.message);
            } else {
                alert(error.message);
            }
        }
    }, [email, password]);

    return (
        <div>
            <LoginBar>
                <input
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    type="text"
                    placeholder="email"
                />
                <input
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    type="password"
                    placeholder="password"
                />
                <button onClick={handleClick}>Login</button>
            </LoginBar>
        </div>
    )
}


export default LoginForm