import React from 'react'
import SignUpForm from "../components/SignUpForm"

type Props = {}




function SignUp({}: Props) {
  return (
    <div style={{display:'flex', justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
      <SignUpForm />
    </div>
  )
}

export default SignUp