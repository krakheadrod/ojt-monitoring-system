import React, { useContext, Fragment } from "react"
import { MenuItem } from "@mui/material"
import { PageModal, Textbox, SelectMenu } from "components"
import CircularProgress from "@mui/material/CircularProgress"

//context
import { OrganizationContext } from "context/OrganizationProvider"

export default function AddCoordinatorModal({
  isToggle,
  toggleModal,
  config,
  onChange,
  clearState,
  onSubmit,
  loading,
}) {
  const { coordinatorName, company, contact, email, address, password } = config

  const { fetchOrganization } = useContext(OrganizationContext)
  const orgName = fetchOrganization.map((type) => type.organizationName)

  return (
    <PageModal open={isToggle} isClose={toggleModal}>
      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <h1 className="font-bold text-2xl mb-6">Company Coordinator Information</h1>
          <form className="w-full" onSubmit={(event) => onSubmit(event)}>
            <div className="flex gap-5 my-4">
              <Textbox
                type="text"
                className="w-full"
                name="coordinatorName"
                value={coordinatorName}
                label="Coordinator Name"
                onChange={(event) => onChange(event)}
                required
              />
              <SelectMenu
                name="company"
                value={company}
                onChange={(event) => onChange(event)}
                required
                title="Organization"
              >
                {orgName.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu>
            </div>
            <div className="w-full">
              <Textbox
                type="number"
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
            <div className="w-full">
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
