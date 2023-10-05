import './App.css'
import Home from './components/Home/Home'
import TodoList from './components/TodoList/TodoList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Home/Nav/Nav'

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter basename={'/mike_web'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolist" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
