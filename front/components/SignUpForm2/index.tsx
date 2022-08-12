import React, { useState } from 'react';
import axios from "axios";
import api from "../../utils/api"
import router, { useRouter } from 'next/router'
import styled from "styled-components";
import { useForm } from "react-hook-form"; // https://react-hook-form.com/


const Form = styled.form`
  width: 500px;
  margin: 0 auto;
  padding: 0 10px;
  border: 1px solid black;
`;


const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  /* margin-bottom: 13px; */
  /* margin-top: 10px; */
  color: blue;
  font-size: 20px;
  font-weight: 200;
`;

const Input = styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid black;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
`;

interface Itype {
    email: String,
    name: String,
    password: String,
    confirm_password: String
}

function SignUpForm2() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data:Itype) => {
        // alert(JSON.stringify(data));
        console.log("data : ", data);


        try {
            const response = await axios.post(
                `${api.cats}`,
                data,
            );

            console.log("response : ", response);
            if (response.data.success) {
                router.push('/')
            }

        } catch (error) {
        }

      };

    // 필드 벨류 워치로 출력해 보기
    // console.log(watch("example"));

    return (

        <div>
            <header>
                <h2>회원 가입 22</h2>
            </header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>email</Label>
                <Input defaultValue="" {...register("email", { required: true })} />
                {errors.name && <span>email is required</span>} <br />

                <Label>name</Label>
                <Input defaultValue="" {...register("name", { required: true })} />
                {errors.name && <span>name is required</span>} <br />

                <Label>password</Label>
                <Input {...register("password", { required: true })} />
                {errors.password && <span>password is required</span>} <br />

                <Label>confirm password</Label>
                <Input {...register("confirm_password", { required: true })} />
                {errors.confirm_password && <span>confirm_password is required</span>} <br />
                
                <Input type="submit" />

            </Form>


        </div>

    )
}
export default SignUpForm2;