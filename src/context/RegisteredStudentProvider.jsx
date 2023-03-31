import React, { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase"

const RegisteredStudentContext = createContext()

const RegisteredStudentProvider = ({ children }) => {
  const [registeredStudentId, setregisteredStudentId] = useState("")
  const [fetchOneRegisteredStudent, setOneRegisteredStudent] = useState([])
  const [fetchRegisteredStudent, setRegisteredStudent] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("registeredStudentsInfo")
    return document.onSnapshot((snapshot) => {
      const studentInfo = []

      snapshot.forEach((response) => {
        studentInfo.push({ ...response.data(), id: response.id })
      })

      setRegisteredStudent(studentInfo)
    })
  }

  useEffect(fetchdata, [])

  const fetchSpecificCoordinator = () => {
    if (registeredStudentId) {
      const document = app
        .firestore()
        .collection("registeredStudentsInfo")
        .doc(registeredStudentId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setOneRegisteredStudent(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificCoordinator, [registeredStudentId])

  return (
    <RegisteredStudentContext.Provider
      value={{
        fetchOneRegisteredStudent,
        setregisteredStudentId,
        fetchRegisteredStudent,
      }}
    >
      {children}
    </RegisteredStudentContext.Provider>
  )
}

export { RegisteredStudentContext, RegisteredStudentProvider }
