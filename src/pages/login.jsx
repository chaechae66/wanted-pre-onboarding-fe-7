import React from 'react'
import { Link } from 'react-router-dom'
import EmailForm from '../components/emailForm'

function Login() {
    return (
    <>
        <h2>투두에 오신 것을 환영합니다.</h2>
        <p>
        저희 투두를 통해 해야할 일을 관리 할 수 있어요 <br />
        로그인해서 멋진 서비스를 이용해보세요!!
        </p>
    
        <EmailForm txt="로그인"/>

        <Link to="/signup">
        아직 회원이 아닌가요?
        </Link>
    </>
    )
}

export default Login