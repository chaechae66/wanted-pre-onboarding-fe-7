import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmailForm from '../components/emailForm'

function Login() {
    const navigate = useNavigate();

    useEffect(()=>{
        const isToken = localStorage.getItem('token');
        if(isToken){
            navigate('/todo')
        }
    },[navigate])

    const handleSubmit = (_data) => {
        axios.post("https://pre-onboarding-selection-task.shop/auth/signin",_data)
        .then((res)=>res.data.access_token)
        .then((token)=>{
            localStorage.setItem('token', token);
            const isToken = localStorage.getItem('token');
            if(isToken){
                navigate('/todo')
            }
        })
        .catch((err) =>{
            alert(err.response.data.message);
        })
    }

    return (
    <>
        <h2>투두에 오신 것을 환영합니다.</h2>
        <p>
        저희 투두를 통해 해야할 일을 관리 할 수 있어요 <br />
        로그인해서 멋진 서비스를 이용해보세요!!
        </p>
    
        <EmailForm txt="로그인" handleSubmit={handleSubmit} />

        <Link to="/signup">
        아직 회원이 아닌가요?
        </Link>
    </>
    )
}

export default Login