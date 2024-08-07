
import './App.css'
import Signup from './pages/Signup'
import EmployeeSinup from './pages/EmployeeSinup'
import Signin from './pages/Signin'
import EmployeeSinin from './pages/EmployeeSinin'


import {HashRouter, Routes, Route} from 'react-router-dom'
import ProjectDashboard from './pages/ProjectDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Member from './pages/Member'
import Reports from './pages/Reports'
import Project from './pages/Project'
import EmployeeProject from './pages/EmployeeProject'
import Tasks from './pages/Tasks'
import EmployeeTasks from './pages/EmployeeTask' 
import Images from './pages/Image'
import CreateInvoice from './pages/CreateInvoice'
import Client from './pages/Client'
import UpdateInvoice from './pages/UpdateInvoice'
import AllInvoice from './pages/AllInvoice'
import CRMController from './pages/CrmController'

// import Test from './pages/test'


function App() {

  return (
    <HashRouter >
      <Routes >
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/employeesignup' element={<EmployeeSinup />}></Route>
        <Route path='/' element={<Signin />}></Route>
        <Route path='/employeesignin' element={<EmployeeSinin />}></Route>
        
        <Route path='/project-dashboard' element={<ProjectDashboard />}></Route>
        <Route path='/employee-dashboard' element={<EmployeeDashboard />}></Route>
        <Route path='/members' element={<Member />}></Route>
        <Route path='/members-report' element={<Reports />}></Route>
        <Route path='/projects' element={<Project />}></Route>
        <Route path='/employee-projects' element={<EmployeeProject />}></Route>
        <Route path='/tasks' element={<Tasks />}></Route>        
        <Route path='/employee-tasks' element={<EmployeeTasks />}></Route>   
        <Route path='/images' element={<Images/>}></Route>   
        <Route path='/create-invoice' element={<CreateInvoice/>}></Route>   
        <Route path='/all-invoice' element={<AllInvoice/>}></Route>   
        <Route path='/clients' element={<Client/>}></Route>   
        <Route path='/update-invoice' element={<UpdateInvoice/>}></Route> 
        <Route path='/crm-controller' element={<CRMController/>}></Route> 



        {/* <Route path='/test' element={<Test/>}></Route>    */}
             




      </Routes>
    </HashRouter>
  )
}

export default App
