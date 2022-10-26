import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FiEdit2 } from 'react-icons/fi'
import { Col, Row, Statistic } from 'antd'
const { Countdown } = Statistic
const deadline = Date.now() + 1000 * 60 * 60 * 12
const Todo = ({
  v,
  i,
  todoList,
  setTodoList,
  editList,
  setEditList,
  editTodoHandler,
  delTodoHandler,
  hover,
}) => {
  const now = Date.now()
  const [edit, setEdit] = useState(v.content)
  const [close, setClose] = useState(false)
  const [day, setDay] = useState(false)

  useEffect(() => {
    if (v.deadline - now <= 1000 * 60 * 60 * 12) setClose(true)
    if (v.deadline - now <= 1000 * 60 * 60 * 24) setDay(true)
  }, [now, v.deadline, close, day])
  console.log(day)
  return (
    <Draggable draggableId={`${v.id}`} index={i} key={v.id}>
      {(provided) => (
        <div
          className={`border rounded p-1 my-2 hover:border-cyan-600 hover:text-cyan-600 active:border-cyan-600 active:text-cyan-600 ${
            v.deadline !== '' && v.deadline !== null ? 'border-slate-500' : ''
          } ${
            v.deadline !== '' &&
            close &&
            v.deadline !== null &&
            'border-red-500'
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={() => {
            editTodoHandler(v.id)
          }}
        >
          <div className="grid grid-cols-3">
            <div className="h-fit">
              {v.deadline !== '' && v.deadline !== null ? (
                <>
                  {hover ? (
                    <div className="opacity-100 transition duration-500">
                      <Row>
                        <Countdown
                          value={v.deadline}
                          valueStyle={{
                            fontSize: 0,
                            color: close ? 'red' : '',
                          }}
                          className="hover:text-cyan-600"
                          format={
                            day ? ' H 時 m 分 s 秒' : 'D 天 H 時 m 分 s 秒'
                          }
                        />
                      </Row>
                    </div>
                  ) : (
                    <div className="opacity-0 transition duration-500">
                      <Row>
                        <Countdown
                          value={v.deadline}
                          valueStyle={{
                            fontSize: 0,
                            color: close ? 'red' : '',
                          }}
                          className="hover:text-cyan-600"
                          format={
                            day ? ' H 時 m 分 s 秒' : 'D 天 H 時 m 分 s 秒'
                          }
                        />
                      </Row>
                    </div>
                  )}
                </>
              ) : (
                ''
              )}
            </div>
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
              <p className="my-0">{v.content}</p>
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
                  delTodoHandler(v, todoList, setTodoList, 'todo')
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
