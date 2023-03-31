import React, { useContext, useEffect } from "react"
import { CoordinatorContext } from "context/CoordinatorProvider"
import { Layout, Textbox, Back } from "components"
import { Link, useLocation } from "react-router-dom"
import { ACTIONS } from "types"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  authId: "",
  coordinatorName: "",
  contact: "",
  email: "",
  address: "",
}

const entity = {
  componentName: "updateCoordinator",
  collectionName: "coordinatorData",
  actionType: "UPDATE",
}

function UpdateCoordinator(props) {
  const params = useLocation()
  const paramsId = params.search.split("=")
  const id = paramsId[1]

  const { fetchSpecificCoord, dispatch } = useContext(CoordinatorContext)

  fetchSpecificCoord && objectAssign(fetchSpecificCoord, initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    props.onChange(name, value)
    // setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const { authId, coordinatorName, contact, email, address, id } =
      props?.updateCoordinator

    const config = {
      authId,
      coordinatorName,
      contact,
      email,
      address,
    }

    props.onSubmit(config, id)
  }

  useEffect(() => {
    dispatch({ type: ACTIONS.GETONE, payload: { id } })
  }, [id, dispatch])

  return (
    <Layout
      title="Update Company Coordinator"
      description="this section you can update company coordinator information"
    >
      <Back redirect="/admin/coordinator" />
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="coordinatorName"
            value={props.updateCoordinator?.coordinatorName}
            onChange={(event) => onChange(event)}
            label="Coordinate Name"
          />
          <Textbox
            type="number"
            className="w-full"
            name="contact"
            value={props.updateCoordinator?.contact}
            onChange={(event) => onChange(event)}
            label="Contact"
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="email"
            disabled
            className="w-full"
            name="email"
            value={props.updateCoordinator?.email}
            onChange={(event) => onChange(event)}
            label="Email"
          />
          <Textbox
            type="text"
            className="w-full"
            name="address"
            value={props.updateCoordinator?.address}
            onChange={(event) => onChange(event)}
            label="Address"
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <Link
            to="/coordinator"
            className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
          >
            cancel
          </Link>
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            update
          </button>
        </div>
      </form>
    </Layout>
  )
}

const CustomerUpdateCoordinator = () => {
  const UpdateCoordinatorHOC = FormHOC(initialState)(entity)(UpdateCoordinator)

  return <UpdateCoordinatorHOC />
}

export default CustomerUpdateCoordinator
