import { createContext, useReducer } from "react";

const setLocalUsers = (state) => {
    localStorage.setItem('users', JSON.stringify({
        ...state
    }))
}

const removeLocalUsers = () => {
    localStorage.removeItem('users')
}

export const userContext = createContext()

const userReducer = (state, action) => {
    
    switch (action.type) {
        case "SET_USERS":{
            setLocalUsers({expiers: state.expiers, ...action.payload})
            return action.payload
        }
        case "ADD_USER":{
            setLocalUsers({users: [...state.users, action.payload], expiers: state.expiers})
            return {users: [...state.users, action.payload], expiers: state.expiers}
        }
        case "DELETE_USER":{
            setLocalUsers({ users: state.users.filter( e => e.id !== e.payload ), expiers: state.expiers })
            return { users: state.users.filter( e => e.id !== e.payload ), expiers: state.expiers }
        }
        case "CHANGE_USER": {
            let arrayWithout = state.users.filter( e => e._id !== action.payload._id )
            return { users: [...arrayWithout, action.payload] }

        }
        case "RESET": {
            removeLocalUsers()
            return { users: [], expiers: Date.now() }
        }
    }

}

const UserContextProvider = ({children}) => {
    let prevUsers = localStorage.getItem('users')

    if(prevUsers) {
        prevUsers = JSON.parse(prevUsers)
        if(!(prevUsers.expiers > Date.now())) {
            prevUsers = { users: [], expiers: Date.now() }
        }
    }

    else {
        prevUsers = { users: [], expiers: Date.now() }
        removeLocalUsers()
    }

    const [state, dispatch] = useReducer(userReducer, prevUsers)

    console.log("Init state", state);

    return (
    <userContext.Provider value={{state, dispatch}}>
        {children}
    </userContext.Provider>
    )
}

export default UserContextProvider
