import React, { createContext, useEffect, useState, useReducer } from "react"
import { app } from "../config/firebase"
import { ACTIONS } from "types"

const StudentContext = createContext()

const StudentProvider = ({ children }) => {
  const [fetchSpecificStudent, setFetchSpecificStudent] = useState([])
  const [fetchStudent, setStudent] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("studentsData")
    return document.onSnapshot((snapshot) => {
      const coordinatorArray = []

      snapshot.forEach((farmLocation) => {
        coordinatorArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setStudent(coordinatorArray)
    })
  }

  useEffect(fetchdata, [])

  // useEffect(fetchSpecificStudents, [])

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.GETONE:
        return [...state, fetchSpecificStudents(action.payload?.id, state)]
      default:
        return state
    }
  }

  const fetchSpecificStudents = (id, state) => {
    if (id) {
      const document = app.firestore().collection("studentsData").doc(id)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificStudent(items_array)
        }
      })
    }
  }

  const [state, dispatch] = useReducer(reducer, [])

  return (
    <StudentContext.Provider
      value={{
        fetchSpecificStudent,
        setFetchSpecificStudent,
        fetchStudent,
        dispatch,
        state,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export { StudentProvider, StudentContext }
