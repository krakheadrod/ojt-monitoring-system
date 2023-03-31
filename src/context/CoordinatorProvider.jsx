import React, { createContext, useEffect, useState, useReducer } from "react"
import { app } from "../config/firebase"
import { ACTIONS } from "types"

const CoordinatorContext = createContext()

const CoordinatorProvider = ({ children }) => {
  const [fetchSpecificCoord, setFetchSpecificCoord] = useState([])
  const [fetchCoordinator, setCoordinator] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("coordinatorData")
    return document.onSnapshot((snapshot) => {
      const coordinatorArray = []

      snapshot.forEach((farmLocation) => {
        coordinatorArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setCoordinator(coordinatorArray)
    })
  }

  useEffect(fetchdata, [])

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.GETONE:
        return [...state, fetchSpecificCoordinator(action.payload?.id)]
      default:
        return state
    }
  }

  const fetchSpecificCoordinator = (id) => {
    if (id) {
      const document = app.firestore().collection("coordinatorData").doc(id)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificCoord(items_array)
        }
      })
    }
  }

  const [state, dispatch] = useReducer(reducer, [])

  return (
    <CoordinatorContext.Provider
      value={{
        fetchSpecificCoord,
        fetchCoordinator,
        setFetchSpecificCoord,
        dispatch,
        state,
      }}
    >
      {children}
    </CoordinatorContext.Provider>
  )
}

export { CoordinatorProvider, CoordinatorContext }
