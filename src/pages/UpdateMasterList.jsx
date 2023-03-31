import React, { useContext, useEffect, useState } from "react"
import { MenuItem } from "@mui/material"
import { Layout, Textbox, SelectMenu, Back } from "components"
import { useLocation } from "react-router-dom"
import { AuthContext } from "context/auth"

//context api
import { EnrollmentContext } from "context/EnrollmentProvider"
import { RegisteredStudentContext } from "context/RegisteredStudentProvider"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

//firebase api
import { updateDocument } from "config/firebase"

const initialState = {
  studName: "",
  schoolID: "",
  course: "",
  contact: "",
  schoolYear: "",
  organization: "",
  studentEmail: "",
  address: "",
}

export default function UpdateMasterList() {
  const [
    {
      studName,
      schoolID,
      course,
      contact,
      schoolYear,
      organization,
      studentEmail,
      address,
    },
    setState,
  ] = useState(initialState)

  const { fetchEnrollment } = useContext(EnrollmentContext)
  const { fetchOneRegisteredStudent, setregisteredStudentId } = useContext(
    RegisteredStudentContext
  )
  const context = useContext(AuthContext)
  const params = useLocation()
  const paramsId = params.search.split("=")

  const onChange = (event) => {
    const { name, value } = event.target

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const config = {
      studName,
      schoolID,
      course,
      contact,
      schoolYear,
      organization,
      studentEmail,
      address,
    }

    updateDocument("registeredStudentsInfo", config, paramsId[1])
  }

  fetchOneRegisteredStudent &&
    objectAssign(fetchOneRegisteredStudent, initialState)

  const fetchStudents = fetchEnrollment.filter(
    (type) => type.coordEmail === context.email
  )

  useEffect(() => {
    paramsId[1] && setregisteredStudentId(paramsId[1])
  }, [paramsId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout
      title="Update Master List"
      description="this section you can update master list information"
    >
      <Back redirect="/admin/masterList" />

      <h1 className="font-bold text-2xl mb-4">Add new student</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-4">
          <SelectMenu
            name="studName"
            value={studName}
            onChange={(event) => onChange(event)}
            title="Students Name"
          >
            {fetchStudents.map((type, index) => (
              <MenuItem key={index} value={type.studName}>
                {type.studName}
              </MenuItem>
            ))}
          </SelectMenu>
          <Textbox
            type="text"
            value={schoolID}
            onChange={(event) => onChange(event)}
            className="w-full"
            name="schoolID"
            label="School ID Number"
          />
        </div>
        <div className="flex gap-4 my-4">
          <Textbox
            type="text"
            value={course}
            onChange={(event) => onChange(event)}
            className="w-full"
            name="course"
            label="Course"
          />
          <Textbox
            type="number"
            value={contact}
            onChange={(event) => onChange(event)}
            className="w-full"
            name="contact"
            label="Contact"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <SelectMenu
            name="schoolYear"
            value={schoolYear}
            onChange={(event) => onChange(event)}
            title="School Year"
          >
            {fetchStudents.map((type, index) => (
              <MenuItem key={index} value={type.schoolYear}>
                {type.schoolYear}
              </MenuItem>
            ))}
          </SelectMenu>
          <SelectMenu
            name="organization"
            value={organization}
            onChange={(event) => onChange(event)}
            title="Organization"
          >
            {fetchStudents.map((type, index) => (
              <MenuItem key={index} value={type.orgsName}>
                {type.orgsName}
              </MenuItem>
            ))}
          </SelectMenu>
          <Textbox
            disabled={true}
            type="email"
            value={studentEmail}
            onChange={(event) => onChange(event)}
            className="w-full"
            name="studentEmail"
            label="Email"
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            value={address}
            onChange={(event) => onChange(event)}
            className="w-full"
            name="address"
            label="Address"
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            update trainee
          </button>
        </div>
      </form>
    </Layout>
  )
}
