import React, { createContext, useEffect, useState, useReducer } from "react"
import { app } from "../config/firebase"
import { ACTIONS } from "types"

const EnrollmentContext = createContext()

const EnrollmentProvider = ({ children }) => {
  const [fetchSpecificEnroll, setFetchSpecificEnroll] = useState([])
  const [fetchEnrollment, setEnrollment] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("enrollmentModuleData")
    return document.onSnapshot((snapshot) => {
      const enrollmentArray = []

      snapshot.forEach((farmLocation) => {
        enrollmentArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setEnrollment(enrollmentArray)
    })
  }

  useEffect(fetchdata, [])

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.GETONE:
        return [...state, fetchSpecificEnrollment(action.payload?.id)]
      default:
        return state
    }
  }

  const fetchSpecificEnrollment = (id) => {
    console.log(id)

    if (id) {
      const document = app
        .firestore()
        .collection("enrollmentModuleData")
        .doc(id)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificEnroll(items_array)
        }
      })
    }
  }

  const [state, dispatch] = useReducer(reducer, [])

  // useEffect(fetchSpecificEnrollment, [enrollmentId])

  return (
    <EnrollmentContext.Provider
      value={{
        fetchSpecificEnroll,
        fetchEnrollment,
        setFetchSpecificEnroll,
        dispatch,
        state,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  )
}

export { EnrollmentProvider, EnrollmentContext }
