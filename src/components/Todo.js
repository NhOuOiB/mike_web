import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FiEdit2 } from 'react-icons/fi'

const Todo = ({
  v,
  i,
  todoList,
  setTodoList,
  editList,
  setEditList,
  editTodoHandler,
  delTodoHandler,
}) => {
  const [edit, setEdit] = useState(v.content)
  return (
    <Draggable draggableId={`${v.id}`} index={i} key={v.id}>
      {(provided) => (
        <div
          className="border rounded p-1 my-2 hover:border-cyan-600 hover:text-cyan-600 active:border-cyan-600 active:text-cyan-600"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={() => {
            editTodoHandler(v.id)
          }}
        >
          <div className="grid grid-cols-3">
            <div></div>
            {editList.includes(v.id) ? (
              <input
                type="text"
                className="border focus:outline-none focus:border-cyan-600 px-1 text-[#000] text-center "
                onChange={(e) => setEdit(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && edit.trim()) {
                    let newTodoList = [...todoList].map((v2) => {
                      if (v.id === v2.id) {
                        return { ...v2, content: edit }
                      }
                      return v2
                    })
                    setTodoList(newTodoList)
                    localStorage.setItem('todo', JSON.stringify(newTodoList))
                    setEditList(editList.filter((v2) => v.id !== v2))
                  }
                }}
                value={edit}
                maxLength={20}
              />
            ) : (
              <p>{v.content}</p>
            )}
            <div className="flex gap-1 justify-end items-center">
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  editTodoHandler(v.id)
                }}
              >
                <FiEdit2 />
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  delTodoHandler(v)
                }}
              >
                <IoIosCloseCircleOutline />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Todo
