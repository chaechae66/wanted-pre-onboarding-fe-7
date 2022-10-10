import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmailForm from '../components/emailForm'

function SignUp() {

    const navigator = useNavigate();

    const handleSubmit = (_data) =>{
        axios.post("https://pre-onboarding-selection-task.shop/auth/signup",_data)
        .then((res)=>{
            console.log('res',res);
            alert(`회원가입 성공하셨습니다. 로그인해주세요`)
            navigator("/");
        }).catch((err) =>{
            alert(err.response.data.message);
        })
    }
    
    return (
        <>
            <h2>회원가입</h2>
            <EmailForm txt="회원가입" handleSubmit={handleSubmit}/>
        </>
    )
}

export default SignUp