import React, { useContext, useRef } from "react"
// import { MenuItem } from "@mui/material"
import { TabPanel } from "@mui/lab"
import { Layout, Tabs, Table } from "components"

// import { EnrollmentContext } from "context/EnrollmentProvider"
import { RegisteredStudentContext } from "context/RegisteredStudentProvider"
import { deleteDocument } from "config/firebase"
// import { useNavigate } from "react-router-dom"
import { AuthContext } from "context/auth"
import { filterByUUID } from "Utils/ReusableSyntax"
import swal from "sweetalert2"
import { FilePlus } from "react-feather"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  studName: "",
  schoolID: "",
  course: "",
  contact: "",
  section: "",
  schoolYear: "",
  organization: "",
  email: "",
  address: "",
}

const entity = {
  componentName: "masterList",
  collectionName: "registeredStudentsInfo",
  actionType: "SAVE",
}

function MasterList(props) {
  const { fetchRegisteredStudent } = useContext(RegisteredStudentContext)
  const context = useContext(AuthContext)

  const inputRef = useRef(null)

  const filteredData = filterByUUID(fetchRegisteredStudent, context.email)

  const onChangeFile = (event) => {
    const { files } = event.target

    props.handleFileOnChange(files, context.email, context.uid)
  }

  //column example
  const columns = [
    {
      field: "id",
      headerName: "User Identification",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.id}</span>
      },
    },
    {
      field: "schoolID",
      headerName: "School ID Number",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.row?.schoolID}</span>
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
    },
    {
      field: "course",
      headerName: "Course",
      type: "number",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
    },
    {
      field: "section",
      headerName: "Section",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        // delete data in coordinator row
        const Delete = (e) => {
          e.stopPropagation() // don't select this row after clicking

          swal
            .fire({
              title: "ARE YOU SURE?",
              text: "are you sure to delete this data?",
              icon: "warning",
              showCancelButton: true,
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await deleteDocument(
                  "registeredStudentsInfo",
                  params.row.id
                ).then(() => {
                  swal.fire({
                    title: "Successfully Deleted",
                    text: "Please click yes to continue",
                    icon: "success",
                  })
                })
              } else {
                swal.fire("Yay!", "your data is safe", "success")
              }
            })
        }

        // update data in coordinator row
        // const Update = (e) => {
        //   e.stopPropagation() // don't select this row after clickin

        //   if (params.row.id) {
        //     navigate(`/admin/updateMasterList?id=${params.row.id}`)
        //   }

        //   // updateToggleModal();
        // }

        return (
          <div className="space-x-4">
            {/* <button
              onClick={Update}
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              Edit
            </button> */}
            <button
              onClick={Delete}
              className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              Delete
            </button>
          </div>
        )
      },
    },
  ]

  const tabName = ["Student List"]

  // const add_new_trainee = (
  //   <Fragment>
  //     <h1 className="font-bold text-2xl mb-4">Add new student</h1>
  //     <form onSubmit={(event) => onSubmit(event)}>
  //       <div className="flex gap-4">
  //         <SelectMenu
  //           name="studName"
  //           value={studName}
  //           onChange={(event) => onChange(event)}
  //           title="Students Name"
  //         >
  //           {fetchStudents.map((type, index) => (
  //             <MenuItem key={index} value={type.studName}>
  //               {type.studName}
  //             </MenuItem>
  //           ))}
  //         </SelectMenu>
  //         <Textbox
  //           type="text"
  //           className="w-full"
  //           value={schoolID}
  //           onChange={(event) => onChange(event)}
  //           name="schoolID"
  //           label="School ID Number"
  //         />
  //       </div>
  //       <div className="flex gap-4 my-4">
  //         <Textbox
  //           type="text"
  //           className="w-full"
  //           value={course}
  //           onChange={(event) => onChange(event)}
  //           name="course"
  //           label="Course"
  //         />
  //         <Textbox
  //           type="number"
  //           className="w-full"
  //           value={contact}
  //           onChange={(event) => onChange(event)}
  //           name="contact"
  //           label="Contact"
  //         />
  //         <SelectMenu
  //           name="section"
  //           value={section}
  //           onChange={(event) => onChange(event)}
  //           title="Section"
  //         >
  //           {filteredSectionList.map((type, index) => (
  //             <MenuItem key={index} value={type}>
  //               {type}
  //             </MenuItem>
  //           ))}
  //         </SelectMenu>
  //       </div>
  //       <div className="flex gap-4 mb-4">
  //         <SelectMenu
  //           name="schoolYear"
  //           value={schoolYear}
  //           onChange={(event) => onChange(event)}
  //           title="School Year"
  //         >
  //           {fetchStudents.map((type, index) => (
  //             <MenuItem key={index} value={type.schoolYear}>
  //               {type.schoolYear}
  //             </MenuItem>
  //           ))}
  //         </SelectMenu>
  //         <SelectMenu
  //           name="organization"
  //           value={organization}
  //           onChange={(event) => onChange(event)}
  //           title="Organization"
  //         >
  //           {fetchStudents.map((type, index) => (
  //             <MenuItem key={index} value={type.orgsName}>
  //               {type.orgsName}
  //             </MenuItem>
  //           ))}
  //         </SelectMenu>
  //         <Textbox
  //           type="email"
  //           className="w-full"
  //           value={email}
  //           onChange={(event) => onChange(event)}
  //           name="email"
  //           label="Email"
  //         />
  //       </div>
  //       <div className="w-full">
  //         <Textbox
  //           type="text"
  //           className="w-full"
  //           value={address}
  //           onChange={(event) => onChange(event)}
  //           name="address"
  //           label="Address"
  //         />
  //       </div>
  //       <div className="text-white flex gap-2 justify-end mt-4">
  //         <button
  //           type="button"
  //           className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
  //           onClick={clearState}
  //         >
  //           cancel
  //         </button>
  //         <button
  //           type="submit"
  //           className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
  //         >
  //           Save trainee
  //         </button>
  //       </div>
  //     </form>
  //   </Fragment>
  // )

  return (
    <Layout title="Master List" description="all the student lists are here">
      <Tabs tabName={tabName}>
        <TabPanel value="1">
          <div className="flex justify-end mb-4">
            <label
              htmlFor="dropzone-file"
              className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white rounded-lg px-4 pb-2"
            >
              <div className="flex items-center justify-center gap-2 pt-2">
                <FilePlus size="15" />
                <span>import csv</span>
              </div>
              <input
                accept=".csv"
                ref={inputRef}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => onChangeFile(event)}
                required
              />
            </label>
          </div>
          <Table data={filteredData} columns={columns} loading={false} />
        </TabPanel>
        {/* <TabPanel value="2">{add_new_trainee}</TabPanel> */}
      </Tabs>
    </Layout>
  )
}

const CustomEnrollmentModule = () => {
  const MasterListHOC = FormHOC(initialState)(entity)(MasterList)

  return <MasterListHOC />
}

export default CustomEnrollmentModule
