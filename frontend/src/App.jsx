// PAGES
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import Users from "./pages/Users"
import User from "./pages/User"
import Jobs from "./pages/Jobs"
import Job from "./pages/Job"
import Companies from "./pages/Companies"
import Company from "./pages/Company"
import AddUserForm from "./pages/AddUserForm"
import DeleteUserForm from "./pages/DeleteUserForm"
import ChangeUserForm from "./pages/ChangeUserForm"

//CONTEXTS
import { AuthContextProvider } from "./context/authContext"
import { UserContextProvider } from "./context/usersContext"

// ROUTER
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
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
      <Route path="users/remove/:id" element = { <DeleteUserForm/> }/>
      <Route path="users/change/:id" element= { <ChangeUserForm/> }/>
      <Route path="jobs" element = { <Jobs/> }/>
      <Route path="jobs/:id" element = { <Job/> }/>
      <Route path="companies" element = { <Companies/> }/>
      <Route path="companies/:id" element = { <Company/> }/>
    </Route>
  
  )
)

function App() {

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}/>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default App
