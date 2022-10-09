import React from 'react'

function EmailForm({ txt }) {
    return (
        <form>
            <label>이메일
            <input type="email"/>
            </label>
            <br />
            <label>비밀번호 
            <input type="password"/>
            </label>
            <br />
            <br />
            <button type='submit'>{txt}</button>
        </form>
    ) 
}

export default EmailForm