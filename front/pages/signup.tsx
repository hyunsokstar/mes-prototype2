import React from 'react'
import SignUpForm2 from "../components/SignUpForm2"

type Props = {}




function SignUp({}: Props) {
  return (
    <div style={{display:'flex', justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
      <SignUpForm2 />
    </div>
  )
}

export default SignUp