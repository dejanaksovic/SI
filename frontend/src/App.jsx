// PAGES
import LoginPage from "./pages/LoginPage"
import Home from "./pages/Home"
import Users from "./pages/Users"
import User from "./pages/User"
import Jobs from "./pages/Jobs"
import Job from "./pages/Job"
import Companies from "./pages/Companies"
import Company from "./pages/Company"

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
      <Route path="jobs" element = { <Jobs/> }/>
      <Route path="jobs/:id" element = { <Job/> }/>
      <Route path="companies" element = { <Companies/> }/>
      <Route path="companies/:id" element = { <Company/> }/>
    </Route>
  
  )
)

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
