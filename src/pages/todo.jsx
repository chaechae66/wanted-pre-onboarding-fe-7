import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Todo() {
    const navigate = useNavigate();
    const txtRef = useRef();
    const [todo, setTodo] = useState(null);

    useEffect(()=>{
        const isToken = localStorage.getItem('token');
        if(!isToken){
            navigate('/')
        }
    },[navigate])

    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get("https://pre-onboarding-selection-task.shop/todos",{
            headers: {
                "Authorization": `Bearer ${token}` 
            }
    }).then((res)=>{
        setTodo(res.data)
        console.log(res.data);
    })
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            todo : txtRef.current.value
        }
        const token = localStorage.getItem("token");
        axios.post("https://pre-onboarding-selection-task.shop/todos",
            obj, {headers: {
                "Authorization": `Bearer ${token}` 
            }
        },).then((res)=>{
            setTodo([
                ...todo,
                res.data   
            ])
            alert('할 일이 추가 되었습니다.');
            txtRef.current.value = "";
        }).catch((err)=>{
            console.log('err',err);
        })
    }

    return (
        <>
            <h2>반갑습니다 유저님, 투두 사이트입니다.</h2>
            <p>투두로 할 일 관리를 깔끔하고 명확하게 해보세요!</p>
            {
                !todo? <div>투두를 만들어주세요</div> 
                : todo.map((val) => {
                    return(
                    <div key={val.id}>
                        <span style={{
                            "color" : "#aaa"
                        }}
                        >할 일</span>
                        <span style={{
                            "display" : "inline-block",
                            "width" : "400px",
                            "paddingLeft" : "10px"
                        }}>{val.todo}</span>
                        <label>
                            완료여부
                            <input type="checkbox" defaultChecked={val.isCompleted}/>
                        </label>
                    </div> 
                    )
                })
            }
            <form onSubmit={onSubmit} style={{
                "marginTop" : "20px"
            }}>
                <label style={{
                    "color" : "#aaa"
                }}>
                    할 일
                    <input style={{
                            "display" : "inline-block",
                            "width" : "450px",
                            "marginLeft" : "10px"
                    }} type="text" ref={txtRef} />
                </label>
                <button type='submit'>추가</button>
            </form>
        </>        
    )
}

export default Todo