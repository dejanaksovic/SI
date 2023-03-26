import { createContext, useReducer } from "react";

export const userContext = createContext()
const userReducer = (state, action) => {
    
    switch (action.type) {
        case "SET_USERS":
            return {users: action.payload}
        case "ADD_USER":
            return {users: [...state.users, action.payload]}
        case "DELETE_USER":
            return state.users.filter(e => e.id != payload.id)
    }

}

export const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, {users: []})

    return (
    <userContext.Provider value={{state, dispatch}}>
        {children}
    </userContext.Provider>
    )
}
