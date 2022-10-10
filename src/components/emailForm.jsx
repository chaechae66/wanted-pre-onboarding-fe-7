import React, { useEffect, useRef, useState } from 'react'

function EmailForm({ txt , handleSubmit }) {

    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({
        email : "이메일을 입력하세요",
        password : "비밀번호를 입력하세요",
    });

    const emailRef = useRef("");
    const passwordRef = useRef("");

    useEffect(()=>{
        if(!error.email.trim() && !error.password.trim()){
            setDisabled(false);
        }
    },[error])

    const onErrorEmail = (e) => {
        const emailRegex = /^.*(@).*/
        
        if(!e.target.value){
            setError({
                ...error,
                email : "이메일을 입력하세요"
            })
        }else if(!emailRegex.test(e.target.value)){
            setError({
                ...error,
                email : "이메일 양식에 맞춰 입력하세요"
            })
        }else{
            setError({
                ...error,
                email : ` `
            })
        }
    }

    const onErrorPassword = (e) => {
        const passwordRegex = /^[a-zA-Z0-9]{8,}$/

        if(!e.target.value){
            setError({
                ...error,
                password : "비밀번호를 입력하세요"
            })
        }else if(!passwordRegex.test(e.target.value)){
            setError({
                ...error,
                password : "최소 8글자 이상 입력하세요"
            })
        }else{
            setError({
                ...error,
                password : ` `
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }
        handleSubmit(data);
    }

    return (
        <form>
            <label>이메일
            <input 
                type="email" 
                ref={emailRef}
                onChange={onErrorEmail} 
            />
            </label>
            <div>{error.email}</div>
            <br />
            <label>비밀번호 
            <input 
                type="password" 
                ref={passwordRef}
                onChange={onErrorPassword}
            />
            </label>
            <div>{error.password}</div>
            <br />
            <button type='submit' disabled={disabled} onClick={onSubmit}>{txt}</button>
        </form>
    ) 
}

export default EmailForm