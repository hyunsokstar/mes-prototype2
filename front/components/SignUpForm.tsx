import React, { useState } from 'react';
import axios from "axios";
import api from "../utils/api"
import router, { useRouter } from 'next/router'


// import './style.css'

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
        <div className="form">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" for="email" >Email </label>
                    <input type="email" id="email" className="form__input" placeholder="Email" value={email} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="name">
                    <label className="form__label" for="name">Name </label>
                    <input type="text" name="" id="name" className="form__input" placeholder="name" value={name} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password" id="password" placeholder="Password" value={password} onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleInputChange(e)} />
                </div>
            </div>
            <div className="footer">
                <button type="submit" class="btn" onClick={() => handleSubmit()} >Register</button>
            </div>
        </div>
    )
}
export default SignUpForm;