import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Tasks = () => {
  return (
    <>
            <div id="mytask-layout">
                <Sidebar />
                {/* main body area */}
                <div className="main px-lg-4 px-md-4">
                    {/* Body: Header */}
                    <Header />
                    

                </div>

            </div>


        </>
  )
}

export default Tasks