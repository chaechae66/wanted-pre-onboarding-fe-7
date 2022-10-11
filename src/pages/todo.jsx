import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TodoLi from '../components/todoLi';

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

    const fetchData = () => {
        const token = localStorage.getItem("token");
        axios.get("https://pre-onboarding-selection-task.shop/todos",{
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        }).then((res)=>{
            setTodo(res.data)
        }).catch((err)=>{
            console.log('err',err);
        })
    }

    useEffect(()=>{
        fetchData();
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

    const handleChange = ({id, todolist, isCompleted}) => {
        const token = localStorage.getItem("token");
        axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`,
        {todo : todolist, isCompleted}, {headers: {
            "Authorization": `Bearer ${token}` 
        }
        },).then((res)=>{
            const newTodo = todo.map((list)=>{
                if(list.id === res.data.id){
                    return res.data
                }
                return list
            })
            setTodo(newTodo);
        }).catch((err)=>{
            console.log('err',err);
        })
    }

    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
        axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,
        {headers: {
            "Authorization": `Bearer ${token}` 
        }
        }).then((res)=>{
            console.log(res)
            const delTodo = todo.filter((list)=>{
                return list.id !== id
            })
            setTodo(delTodo);
            alert("삭제가 성공되었습니다.");
        }).catch((err)=>{
            console.log('err',err)
        });
    }

    return (
        <>
            <h2>반갑습니다 유저님, 투두 사이트입니다.</h2>
            <p>투두로 할 일 관리를 깔끔하고 명확하게 해보세요!</p>
            {
                !todo? <div>투두를 만들어주세요</div> 
                : todo.map((val) => {
                    return(
                        <TodoLi key={val.id} val={val} handleDelete={handleDelete} handleChange={handleChange} />
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