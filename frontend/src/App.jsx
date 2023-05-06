// PAGES
import LoginPage from "./pages/Login/LoginPage"
import Home from "./pages/Home/Home"

// USERS
import Users from "./pages/Users/index/Users"
import User from "./pages/Users/show/User"
import AddUserForm from "./pages/Users/create/AddUserForm"
import ChangeUserForm from "./pages/Users/change/ChangeUserForm"

// COMPANIES
import Companies from "./pages/Companies/index/Companies"
import Company from "./pages/Companies/show/Company"
import AddCompany from "./pages/Companies/create/AddCompany"
import ChangeCompany from "./pages/Companies/change/ChangeCompany"

import Jobs from "./pages/Jobs/index/Jobs"
import Job from "./pages/Jobs/show/Job"

//CONTEXTS
import { AuthContextProvider } from "./context/authContext"
import UserContextProvider from "./context/usersContext"
import { CompaniesContextProvider } from "./context/companiesContext"

// ROUTER
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element = { <Home/> }/> 
      <Route path="login" element = { <LoginPage/> }/>
      <Route path="users" element = { <Users/> }/>
      <Route path="users/:id" element = { <User/> }/>
      <Route path="users/add" element = { <AddUserForm/> }/>
      <Route path="users/change/:id" element= { <ChangeUserForm/> }/>
      <Route path="companies" element = { <Companies/> }/>
      <Route path="companies/:id" element = { <Company/> }/>
      <Route path="companies/add" element = { <AddCompany/>}/>
      <Route path="companies/change/:id" element = {<ChangeCompany/>}/>
      <Route path="jobs" element = { <Jobs/> }/>
      <Route path="jobs/:id" element = { <Job/> }/>
    </Route>
  
  )
)

function App() {

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <CompaniesContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CompaniesContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default App
