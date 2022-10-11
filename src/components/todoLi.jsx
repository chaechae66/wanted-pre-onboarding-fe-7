import React, { useRef, useState } from 'react'

function TodoLi({val,handleDelete,handleChange}) {
    const [update, setUpdate] = useState(true);

    const todoRef = useRef(val.todo);
    const isCompletedRef = useRef(val.isCompleted);

    const onUpdate = () => {
        setUpdate(false);
    }

    const onCancel = (e) => {
        e.preventDefault();
        todoRef.current.value = val.todo;
        isCompletedRef.current.defaultChecked = val.isCompleted;
        setUpdate(true);
    }

    const onChange = (e) => {
        e.preventDefault();
        const id = val.id
        const todo = todoRef.current.value;
        const isCompleted = todoRef.current.defaultChecked;
        const todoObj = {
            id,
            todolist : todo,
            isCompleted
        }
        handleChange(todoObj);
        setUpdate(true);
    }

    const onDelete = (e) => {
        e.preventDefault();
        handleDelete(val.id);
    }

    return (
    <div style={{
        "marginBottom" : "10px"
    }}>
        <label style={{
            "color" : "#aaa"
        }}
        >할 일
        <input style={{
            "display" : "inline-block",
            "width" : "380px",
            "marginLeft" : "10px",
            "marginRight" : "10px"
        }} defaultValue={val.todo} disabled={update} ref={todoRef}/>
        </label>
        <label>
            완료여부
            <input type="checkbox" disabled={update} defaultChecked={val.isCompleted} ref={isCompletedRef}/>
        </label>
        <button
            style={{
                "backgroundColor" : "#036ffc",
                "color" : "#fff",
                "border" : "none",
                "padding" : "4px 6px",
                "borderRadius" : "5px",
                "marginRight" : "8px"
            }}
            onClick={onUpdate}
        >수정</button>{
            !update? (
                <>
                    <button onClick={onChange}>제출</button>
                    <button onClick={onCancel}>취소</button>
                </>
            ) : <></>
        }
        <button
            style={{
                "backgroundColor" : "#e32a09",
                "color" : "#fff",
                "border" : "none",
                "padding" : "4px 6px",
                "borderRadius" : "5px",
            }}       
            onClick={onDelete}
        >삭제</button>
    </div> 
    )
}

export default TodoLi