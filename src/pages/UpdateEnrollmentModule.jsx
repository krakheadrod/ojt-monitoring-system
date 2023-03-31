import React, { useContext, useState, useEffect, useCallback } from "react"
import { Layout, Textbox, SelectMenu, Back } from "components"
import { MenuItem } from "@mui/material"
import { useLocation } from "react-router-dom"
import { objectAssign } from "Utils/ReusableSyntax"

// context api
import { StudentContext } from "context/StudentProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"
// import { OrganizationContext } from "context/OrganizationProvider"
import { EnrollmentContext } from "context/EnrollmentProvider"

//HOC
import { FormHOC } from "HOC"

import { ACTIONS } from "types"

const initialState = {
  schoolYear: "",
  studName: "",
  coordName: "",
  coordEmail: "",
  orgsName: "",
}

const entity = {
  componentName: "updateEnrollment",
  collectionName: "enrollmentModuleData",
  actionType: "UPDATE",
}

function UpdateEnrollmentModule(props) {
  const [coordinatorNames, setCoordinatorNames] = useState(null)

  const { fetchStudent } = useContext(StudentContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)
  // const { fetchOrganization } = useContext(OrganizationContext)

  const { fetchSpecificEnroll, dispatch } = useContext(EnrollmentContext)

  fetchSpecificEnroll && objectAssign(fetchSpecificEnroll, initialState)

  const params = useLocation()
  const paramsId = params.search.split("=")
  const id = paramsId[1]

  const studentName = fetchStudent.map((type) => type.fullName)
  const coordinatorEmail = fetchCoordinator.map((type) => type.email)
  // const orgName = fetchOrganization.map((type) => type.organizationName)

  const fetchCoordinatorNames = useCallback(async () => {
    const fetchCoordinatorByEmail = await fetchCoordinator.filter(
      (type) => type.email === props.updateEnrollment?.coordEmail
    )

    setCoordinatorNames(fetchCoordinatorByEmail)
  }, [props.updateEnrollment?.coordEmail, fetchCoordinator])

  useEffect(() => {
    fetchCoordinatorNames()
  }, [fetchCoordinatorNames])

  const onChange = (event) => {
    const { name, value } = event.target

    props.onChange(name, value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const { studName, coordName, orgsName, coordEmail } =
      props?.updateEnrollment

    const config = {
      studName,
      coordName,
      orgsName,
      coordEmail,
    }

    // console.log(config, id)
    props.onSubmit(config, id)
  }

  useEffect(() => {
    id && dispatch({ type: ACTIONS.GETONE, payload: { id } })
  }, [id, dispatch])

  return (
    <Layout
      title="Update Enrollment"
      description="information of enrollment module"
    >
      <Back redirect="/admin/enrollmentModule" />
      <form onSubmit={onSubmit}>
        <div className="flex gap-4">
          <Textbox
            type="text"
            className="w-full"
            name="schoolYear"
            value={props.updateEnrollment?.schoolYear}
            disabled={true}
            label="School Year"
          />
          <SelectMenu
            name="studName"
            title="Students"
            value={props.updateEnrollment?.studName}
            onChange={(event) => onChange(event)}
          >
            {studentName.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </SelectMenu>
          {/* <SelectMenu
                name="section"
                value={section}
                onChange={(event) => onChange(event)}
                title="Section List"
              >
                {filteredSectionList.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu> */}
        </div>
        <div className="flex gap-4 my-4">
          <SelectMenu
            name="coordEmail"
            title="Supervisor Email"
            value={props.updateEnrollment?.coordEmail}
            onChange={(event) => onChange(event)}
          >
            {coordinatorEmail.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </SelectMenu>
          <SelectMenu
            name="coordName"
            title="Supervisor"
            value={props.updateEnrollment?.coordName}
            onChange={(event) => onChange(event)}
          >
            {coordinatorNames !== null &&
              coordinatorNames.map((type, index) => (
                <MenuItem key={index} value={type.coordinatorName}>
                  {type.coordinatorName}
                </MenuItem>
              ))}
          </SelectMenu>
          <SelectMenu
            name="orgsName"
            title="Organization"
            value={props.updateEnrollment?.orgsName}
            onChange={(event) => onChange(event)}
          >
            {coordinatorNames !== null &&
              coordinatorNames.map((type, index) => (
                <MenuItem key={index} value={type.company}>
                  {type.company}
                </MenuItem>
              ))}
          </SelectMenu>
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            Update data
          </button>
        </div>
      </form>
    </Layout>
  )
}

const CustonEnrollment = () => {
  const EnrollmentHOC = FormHOC(initialState)(entity)(UpdateEnrollmentModule)

  return <EnrollmentHOC />
}

export default CustonEnrollment
