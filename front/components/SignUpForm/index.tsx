import React, { useState } from 'react';
import axios from "axios";
import api from "../../utils/api"
import router, { useRouter } from 'next/router'

import styled from "styled-components";

const Input = styled.input`
  font-size: 18px;
  width: 90%;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;


function SignUpForm() {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleSubmit = async () => {
        let obj = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        }

        console.log("obj : ", obj);

        try {
            const response = await axios.post(
                `${api.cats}`,
                { name, email, password },
            );

            console.log("response : ", response);
            if (response.data.success) {
                router.push('/')
            }

        } catch (error) {

        }

    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "name") {
            setName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    return (

        <div>
            <header>
                <h2>회원 가압</h2>
            </header>

            <div className="form" style={{width: "500px", border:"1px solid black", padding:"10px"}}>
                <div className="form-body">
                    <div className="email">
                        <label className="form__label" htmlFor="email" >Email </label>
                        <Input type="email" id="email" className="form__Input" placeholder="Email" value={email} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="name">
                        <label className="form__label" htmlFor="name">Name </label>
                        <Input type="text" name="" id="name" className="form__Input" placeholder="name" value={name} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="password">
                        <label className="form__label" htmlFor="password">Password </label>
                        <Input className="form__Input" type="password" id="password" placeholder="Password" value={password} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                        <Input className="form__Input" type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn" onClick={() => handleSubmit()} >Register</button>
                </div>
            </div>
        </div>

    )
}
export default SignUpForm;