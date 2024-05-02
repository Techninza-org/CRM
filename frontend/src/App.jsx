
import './App.css'
import Signup from './pages/Signup'
import EmployeeSinup from './pages/EmployeeSinup'
import Signin from './pages/Signin'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProjectDashboard from './pages/ProjectDashboard'
import Member from './pages/Member'
import Project from './pages/Project'
import Tasks from './pages/Tasks'
import Amit from './pages/Amit'



function App() {

  return (
    <BrowserRouter >
      <Routes >
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/employeesignup' element={<EmployeeSinup />}></Route>
        <Route path='/' element={<Signin />}></Route>
        
        <Route path='/project-dashboard' element={<ProjectDashboard />}></Route>
        <Route path='/members' element={<Member />}></Route>
        <Route path='/projects' element={<Project />}></Route>
        <Route path='/tasks' element={<Tasks />}></Route>        
        <Route path='/amit' element={<Amit />}></Route>        




      </Routes>
    </BrowserRouter>
  )
}

export default App
