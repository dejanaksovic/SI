// PAGES
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"

// USERS
import Users from "./pages/Users/Users"
import User from "./pages/Users/User"
import AddUserForm from "./pages/Users/AddUserForm"
import ChangeUserForm from "./pages/Users/ChangeUserForm"

// COMPANIES
import Companies from "./pages/Companies/Companies"
import Company from "./pages/Companies/Company"
import AddCompany from "./pages/Companies/AddCompany"

import Jobs from "./pages/Jobs"
import Job from "./pages/Job"

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
