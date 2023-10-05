import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <nav className="absolute flex sm:justify-center space-x-4">
        {[
          ['Home', '/'],
          ['TodoList', '/todolist'],
        ].map(([title, url]) => (
          <Link
            to={url}
            key={title}
            className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          >
            {title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Nav
