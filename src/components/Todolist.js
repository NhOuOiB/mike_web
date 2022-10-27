import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import { DatePicker, Space } from 'antd'
import { IoIosCloseCircleOutline } from 'react-icons/io'

const Todolist = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])
  const [editList, setEditList] = useState([])
  const [fin, setFin] = useState([])
  const [deadline, setDeadline] = useState('')
  const [hover, setHover] = useState(false)
  const now = Date.now()

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
    if (deadline && deadline - now <= 0) return
    let todo = { id: uuidv4(), content: newTodo, deadline }
    let newTodoList = [...todoList, todo]
    setNewTodo('')
    // setDeadline('')
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
  const delTodoHandler = (v, List, setList, localName) => {
    let newList = List.filter((v2) => v.id !== v2.id)
    setList(newList)
    localStorage.setItem(localName, JSON.stringify(newList))
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
      <div className=" max-w-lg mx-auto text-sm pt-5">
        <div className=" border-2 px-2 rounded-2xl border-black font-semibold mb-5 w-fit mx-auto">
          Todolist
        </div>
        <div className="mx-3 my-5 flex justify-around sm:gap-0 gap-1">
          <input
            type="text"
            className="border focus:outline-none p-1 focus:border-cyan-600 w-5/12"
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
          <Space direction="vertical" className="w-5/12">
            <DatePicker
              showTime
              onChange={(d, dateStrings) => {
                setDeadline(new Date(dateStrings).getTime())
              }}
            />
          </Space>
          <button
            className="border py-1 px-2 hover:border-cyan-600 hover:text-cyan-600 w-auto"
            onClick={addTodoHandler}
          >
            Enter
          </button>
        </div>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="my-3 mx-3 "
              ref={provided.innerRef}
              {...provided.droppableProps}
              onMouseOver={() => {
                setHover(true)
              }}
              onMouseOut={() => {
                setHover(false)
              }}
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
                    hover={hover}
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
              className="my-3 mx-3 h-64"
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
                        className="border rounded p-1  my-2 hover:border-cyan-600 hover:text-cyan-600 active:border-cyan-600 active:text-cyan-600 text-[#ccc] grid grid-cols-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div></div>
                        <p className="my-0">{v.content}</p>
                        <div className="flex gap-1 justify-end items-center">
                          <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              delTodoHandler(v, fin, setFin, 'fin')
                            }}
                          >
                            <IoIosCloseCircleOutline />
                          </div>
                        </div>
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
