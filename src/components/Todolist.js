import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

const Todolist = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  useEffect(() => {
    let localTodo = localStorage.getItem('todo')
    if (localTodo) setTodoList(JSON.parse(localTodo))
  }, [])
  const addTodoHandler = () => {
    if (newTodo === '') return
    let todo = { id: uuidv4(), content: newTodo }
    let newTodoList = [...todoList, todo]
    setNewTodo('')
    setTodoList(newTodoList)
    localStorage.setItem('todo', JSON.stringify(newTodoList))
  }

  const onDragEnd = (e) => {
    console.log(e)
    const { source, destination } = e
    if (!destination) return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return
    let newTodo = [...todoList]
    let add = newTodo[source.index]
    // if (destination.droppableId === 'todoFinList') {
    //   // DRAG TO FINISH
    //   newTodo = newTodo.map((todo) => {
    //     if (todo.id === add.id) return { ...todo, status: true }
    //     return todo
    //   })
    // } else {
    //   // SORT TODOLIST
    //   newTodo.splice(source.index, 1)
    //   newTodo.splice(destination.index, 0, add)
    // }
    newTodo.splice(source.index, 1)
    newTodo.splice(destination.index, 0, add)
    setTodoList(newTodo)
    localStorage.setItem('todo', JSON.stringify(newTodo))
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
        <Droppable droppableId="td">
          {(provided) => (
            <div
              className="my-2 mx-3 "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todoList.map((v, i) => {
                return (
                  <Draggable draggableId={v.id} index={i}>
                    {(provided) => (
                      <div
                        key={v.id}
                        className="border rounded p-1 my-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {v.content}
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Todolist
