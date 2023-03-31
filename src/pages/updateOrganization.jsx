import React, { useContext, useEffect } from "react"
import { OrganizationContext } from "context/OrganizationProvider"
import { useLocation } from "react-router-dom"
import { Layout, Textbox, Back } from "components"
import { Link } from "react-router-dom"
import { ACTIONS } from "types"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  organizationName: "",
  companyBackground: "",
  contactPerson: "",
  contactNumber: 0,
  companyAddress: "",
}

const entity = {
  componentName: "updateCoordinator",
  collectionName: "organizationData",
  actionType: "UPDATE",
}

function UpdateOrganization(props) {
  const params = useLocation()
  const paramsId = params.search.split("=")
  const id = paramsId[1]
  const { fetchSpecificOrg, dispatch } = useContext(OrganizationContext)

  fetchSpecificOrg && objectAssign(fetchSpecificOrg, initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    props.onChange(name, value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const {
      organizationName,
      companyBackground,
      contactPerson,
      contactNumber,
      companyAddress,
      id,
    } = props?.updateCoordinator

    const config = {
      organizationName,
      companyBackground,
      contactPerson,
      contactNumber,
      companyAddress,
    }

    props.onSubmit(config, id)
  }

  useEffect(() => {
    id && dispatch({ type: ACTIONS.GETONE, payload: { id } })
  }, [id, dispatch])

  return (
    <Layout
      title="Update organization"
      description="this section you can update organization information"
    >
      <Back redirect="/admin/organization" />
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="w-full my-4">
          <Textbox
            type="text"
            className="w-full"
            name="organizationName"
            value={props.updateCoordinator?.organizationName}
            label="Organization Name"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full my-4">
          <Textbox
            type="text"
            className="w-full"
            name="companyBackground"
            value={props.updateCoordinator?.companyBackground}
            label="Company Background"
            multiline
            rows={4}
            maxRows={4}
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="contactPerson"
            value={props.updateCoordinator?.contactPerson}
            label="Contact Person"
            onChange={(event) => onChange(event)}
          />
          <Textbox
            type="number"
            className="w-full"
            name="contactNumber"
            value={props.updateCoordinator?.contactNumber}
            label="Contact Number"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            className="w-full"
            name="companyAddress"
            value={props.updateCoordinator?.companyAddress}
            label="Company Address"
            onChange={(event) => onChange(event)}
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

const CustomUpdateOrganization = () => {
  const UpdateOrganizationHOC =
    FormHOC(initialState)(entity)(UpdateOrganization)

  return <UpdateOrganizationHOC />
}

export default CustomUpdateOrganization
