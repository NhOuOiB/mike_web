import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Todolist = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  useEffect(() => {
    let localTodo = JSON.parse(localStorage.getItem('todo'))
    setTodoList(localTodo)
  }, [])
  const addTodoHandler = () => {
    if (newTodo === '') return
    let newTodoList = [...todoList, newTodo]
    setNewTodo('')
    setTodoList(newTodoList)
    localStorage.setItem('todo', JSON.stringify(newTodoList))
  }
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodoHandler()
          }}
        />
        <button
          className="border p-1 hover:border-cyan-600 hover:text-cyan-600"
          onClick={addTodoHandler}
        >
          Enter
        </button>
      </div>
      <div className="my-2 mx-3 ">
        {todoList &&
          todoList.map((v, i) => {
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
