import React from "react"
import { PageModal, Textbox } from "components"

export default function AddOrganization({
  isToggle,
  toggleModal,
  config,
  onChange,
  clearState,
  onSubmit,
}) {
  const {
    organizationName,
    companyBackground,
    contactPerson,
    contactNumber,
    companyAddress,
  } = config

  const multiline = true

  return (
    <PageModal open={isToggle} isClose={toggleModal}>
      <h1 className="font-bold text-2xl mb-6">Organization Information</h1>
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="w-full my-4">
          <Textbox
            type="text"
            className="w-full"
            name="organizationName"
            value={organizationName}
            label="Organization Name"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full my-4">
          <Textbox
            type="text"
            className="w-full"
            name="companyBackground"
            value={companyBackground}
            label="Company Background"
            multiline
            rows={multiline ? 4 : null}
            maxRows={multiline ? 4 : null}
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="contactPerson"
            value={contactPerson}
            label="Contact Person"
            onChange={(event) => onChange(event)}
          />
          <Textbox
            type="number"
            className="w-full"
            name="contactNumber"
            value={contactNumber}
            label="Contact Number"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            className="w-full"
            name="companyAddress"
            value={companyAddress}
            label="Company Address"
            onChange={(event) => onChange(event)}
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
    </PageModal>
  )
}
