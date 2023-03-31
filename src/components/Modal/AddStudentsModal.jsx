import React, { Fragment, useContext } from "react"
import { MenuItem } from "@mui/material"
import { sectionList } from "Utils/ReusableSyntax"
import { PageModal, Textbox, SelectMenu } from "components"
import CircularProgress from "@mui/material/CircularProgress"

//context
import { OrganizationContext } from "context/OrganizationProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"

export default function AddStudentsModal({
  isToggle,
  toggleModal,
  config,
  onChange,
  clearState,
  onSubmit,
  loading,
}) {
  const {
    schoolID,
    fullName,
    course,
    company,
    coordinatorEmail,
    contact,
    section,
    email,
    address,
    password,
  } = config?.students

  const { fetchOrganization } = useContext(OrganizationContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)

  return (
    <PageModal open={isToggle} isClose={toggleModal}>
      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <h1 className="font-bold text-2xl mb-6">Student Information</h1>
          <form className="w-full" onSubmit={(event) => onSubmit(event)}>
            <div className="flex gap-5 my-4">
              <Textbox
                type="text"
                className="w-full"
                name="schoolID"
                value={schoolID}
                label="School ID Number"
                onChange={(event) => onChange(event)}
                required
              />
              <Textbox
                type="text"
                className="w-full"
                name="fullName"
                value={fullName}
                label="Full Name"
                onChange={(event) => onChange(event)}
                required
              />
              <SelectMenu
                name="section"
                value={section}
                onChange={(event) => onChange(event)}
                required
                title="Section"
              >
                {sectionList.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu>
            </div>
            <div className="flex gap-5 my-4">
              <Textbox
                type="text"
                className="w-full"
                name="course"
                value={course}
                label="Course"
                onChange={(event) => onChange(event)}
                required
              />
              <SelectMenu
                name="company"
                value={company}
                onChange={(event) => onChange(event)}
                required
                title="company"
              >
                {fetchOrganization.map((type, index) => (
                  <MenuItem key={index} value={type.organizationName}>
                    {type.organizationName}
                  </MenuItem>
                ))}
              </SelectMenu>
              <Textbox
                type="text"
                className="w-full"
                name="contact"
                value={contact}
                label="Contact"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="flex gap-5 my-4">
              <Textbox
                type="email"
                className="w-full"
                name="email"
                value={email}
                label="Email"
                onChange={(event) => onChange(event)}
                required
              />
              <SelectMenu
                name="coordinatorEmail"
                value={coordinatorEmail}
                onChange={(event) => onChange(event)}
                required
                title="Coordinator Email"
              >
                {fetchCoordinator.map((type, index) => (
                  <MenuItem key={index} value={type.email}>
                    {type.email}
                  </MenuItem>
                ))}
              </SelectMenu>
              <Textbox
                type="text"
                className="w-full"
                name="address"
                value={address}
                label="Address"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="w-full my-4">
              <Textbox
                type="password"
                className="w-full"
                name="password"
                value={password}
                label="Password"
                onChange={(event) => onChange(event)}
                required
              />
            </div>
            <div className="text-white flex gap-2 justify-end mt-4">
              <button
                onClick={clearState}
                type="button"
                className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
              >
                cancel
              </button>
              <button
                type="submit"
                className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
              >
                submit
              </button>
            </div>
          </form>
        </Fragment>
      )}
    </PageModal>
  )
}
