import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Todolist = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todo, setTodo] = useState([])
  let todoList = JSON.parse(localStorage.getItem('todo'))
  return (
    <div className=" max-w-xl mx-auto">
      <div className=" border-2 px-2 rounded-2xl border-black font-semibold my-2 w-fit mx-auto">
        Todolist
      </div>
      <div className="">
        <input
          type="text"
          className="border focus:outline-none p-1 focus:border-cyan-600 mr-2"
          placeholder="type something todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value)
          }}
        />
        <button
          className="border p-1 hover:border-cyan-600 hover:text-cyan-600"
          onClick={() => {
            let newTodoList = [...todo, newTodo]
            setNewTodo('')
            setTodo(newTodoList)
            localStorage.setItem('todo', JSON.stringify(newTodoList))
          }}
        >
          Enter
        </button>
      </div>
      <div className="my-2 mx-3 ">
        {todoList.map((v, i) => {
          return (
            <div key={i} className="border rounded p-1 my-2">
              {v}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Todolist
