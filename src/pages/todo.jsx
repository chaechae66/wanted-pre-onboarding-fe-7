import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Todo() {

    const navigate = useNavigate();

    useEffect(()=>{
        const isToken = localStorage.getItem('token');
        if(!isToken){
            navigate('/')
        }
    },[navigate])

    return (
        <>
            <h2>반갑습니다 유저님, 투두 사이트입니다.</h2>
            <p>투두로 할 일 관리를 깔끔하고 명확하게 해보세요!</p>
        </>        
    )
}

export default Todo