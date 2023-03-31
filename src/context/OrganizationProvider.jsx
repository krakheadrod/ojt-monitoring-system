import React, { createContext, useEffect, useState, useReducer } from "react"
import { app } from "../config/firebase"
import { ACTIONS } from "types"

const OrganizationContext = createContext()

const OrganizationProvider = ({ children }) => {
  const [fetchSpecificOrg, setFetchSpecificOrg] = useState([])
  const [fetchOrganization, setOrganization] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("organizationData")
    return document.onSnapshot((snapshot) => {
      const organizationArray = []

      snapshot.forEach((farmLocation) => {
        organizationArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setOrganization(organizationArray)
    })
  }

  useEffect(fetchdata, [])

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.GETONE:
        return [...state, fetchSpecificOrganization(action.payload?.id)]
      default:
        return state
    }
  }

  const fetchSpecificOrganization = (id) => {
    if (id) {
      const document = app.firestore().collection("organizationData").doc(id)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificOrg(items_array)
        }
      })
    }
  }

  const [state, dispatch] = useReducer(reducer, [])

  // useEffect(fetchSpecificOrganization, [orgId])

  return (
    <OrganizationContext.Provider
      value={{
        fetchSpecificOrg,
        setFetchSpecificOrg,
        fetchOrganization,
        dispatch,
        state,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export { OrganizationProvider, OrganizationContext }
