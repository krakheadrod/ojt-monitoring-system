import { createContext, useContext, useReducer } from "react"
import { AuthContext } from "./auth"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const context = useContext(AuthContext)

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            context.uid > action.payload.authId
              ? context.uid + action.payload.authId
              : action.payload.authId + context.uid,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
