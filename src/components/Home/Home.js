import React from 'react'
import './_home.scss'
const home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="rotate flipCard w-[12rem] h-[16rem]">
          <div className="w-[12rem] h-[16rem] bg-gray-800 border-8 border-amber-200 rounded card cardFront absolute"></div>
          <div className="w-[12rem] h-[16rem] bg-amber-200 border-8 border-gray-800 rounded card cardBack absolute "></div>
        </div>
      </div>
    </>
  )
}

export default home
