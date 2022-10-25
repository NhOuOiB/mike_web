import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import { DatePicker, Space } from 'antd'


const Todolist = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  const [editList, setEditList] = useState([])
  const [fin, setFin] = useState([])
  // get todo
  useEffect(() => {
    let localTodo = localStorage.getItem('todo')
    if (localTodo) setTodoList(JSON.parse(localTodo))
    let localFin = localStorage.getItem('fin')
    if (localFin) setFin(JSON.parse(localFin))
  }, [])
  // add todo
  const addTodoHandler = () => {
    if (newTodo === '') return
    let todo = { id: uuidv4(), content: newTodo }
    let newTodoList = [...todoList, todo]
    setNewTodo('')
    setTodoList(newTodoList)
    localStorage.setItem('todo', JSON.stringify(newTodoList))
  }
  // edit todo
  const editTodoHandler = (v) => {
    if (editList.includes(v)) {
      return setEditList(editList.filter((v2) => v !== v2))
    }
    let newEditList = [...editList, v]
    setEditList(newEditList)
  }
  // delete todo
  const delTodoHandler = (v) => {
    let newTodoList = todoList.filter((v2) => v.id !== v2.id)
    setTodoList(newTodoList)
    localStorage.setItem('todo', JSON.stringify(newTodoList))
  }

  // dnd
  const onDragEnd = (e) => {
    const { source, destination } = e
    // same droppableId
    const dragToSameId = (newList, item, set, localName) => {
      newList.splice(source.index, 1)
      newList.splice(destination.index, 0, item)
      set(newList)
      localStorage.setItem(localName, JSON.stringify(newList))
    }
    // different droppableId
    const dragToOtherId = (sourceList, destinationList, item) => {
      sourceList.splice(source.index, 1)
      destinationList.splice(destination.index, 0, item)
      setFin(newFin)
      localStorage.setItem('fin', JSON.stringify(newFin))
      setTodoList(newTodo)
      localStorage.setItem('todo', JSON.stringify(newTodo))
    }
    if (!destination) return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return
    let newTodo = [...todoList]
    let add = newTodo[source.index]
    let newFin = [...fin]
    let good = newFin[source.index]
    // drag to fin
    if (destination.droppableId === 'fin') {
      // fin to fin
      if (source.droppableId === 'fin') {
        dragToSameId(newFin, good, setFin, 'fin')
        return
      }
      dragToOtherId(newTodo, newFin, add)
      return
    }
    if (source.droppableId === 'fin') {
      dragToOtherId(newFin, newTodo, good)
      return
    }
    dragToSameId(newTodo, add, setTodoList, 'todo')
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
            maxLength={20}
            onChange={(e) => {
              setNewTodo(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTodoHandler()
            }}
          />
          <Space direction="vertical" size={12}>
            <DatePicker showTime />
          </Space>
          <button
            className="border p-1 hover:border-cyan-600 hover:text-cyan-600"
            onClick={addTodoHandler}
          >
            Enter
          </button>
        </div>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="my-2 mx-3 "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3 className="text-2xl font-semibold text-left border-l-4 border-cyan-600 px-2">
                Unfinished
              </h3>
              {todoList.map((v, i) => {
                return (
                  <Todo
                    i={i}
                    v={v}
                    key={v.id}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    editList={editList}
                    setEditList={setEditList}
                    editTodoHandler={editTodoHandler}
                    delTodoHandler={delTodoHandler}
                  ></Todo>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="fin">
          {(provided) => (
            <div
              className="my-2 mx-3 h-64"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3 className="text-2xl font-semibold text-left border-l-4 border-cyan-600 px-2">
                Finished
              </h3>
              {fin.map((v, i) => {
                return (
                  <Draggable draggableId={`${v.id}`} index={i} key={v.id}>
                    {(provided) => (
                      <div
                        className="border rounded p-1 my-2 hover:border-cyan-600 hover:text-cyan-600 active:border-cyan-600 active:text-cyan-600 text-[#ccc] "
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="">{v.content}</p>
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
