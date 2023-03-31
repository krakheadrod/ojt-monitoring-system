import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react"
import { MenuItem } from "@mui/material"
import { TabPanel } from "@mui/lab"
import { useNavigate } from "react-router-dom"
import { Layout, Tabs, Textbox, SelectMenu, Table } from "components"
import { FilePlus } from "react-feather"

// context api
import { StudentContext } from "context/StudentProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"
// import { OrganizationContext } from "context/OrganizationProvider"
import { EnrollmentContext } from "context/EnrollmentProvider"
import { filterByStudentName } from "Utils/ReusableSyntax"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  schoolYear: "",
  studName: "",
  coordName: "",
  coordEmail: "",
  orgsName: "",
}

const entity = {
  componentName: "submitEnrollment",
  collectionName: "enrollmentModuleData",
  actionType: "SAVE",
}

function EnrollmentModule(props) {
  const [coordinatorNames, setCoordinatorNames] = useState(null)

  const { fetchStudent } = useContext(StudentContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)
  // const { fetchOrganization } = useContext(OrganizationContext)
  const { fetchEnrollment } = useContext(EnrollmentContext)

  const inputRef = useRef(null)

  const navigate = useNavigate()

  const studentName = fetchStudent.map((type) => type.fullName)
  // const sectionList = fetchStudent.map((type) => type.section)
  // const filteredSectionList = eliminateDuplicates(sectionList)

  // const coordinatorName = fetchCoordinator.map((type) => type.coordinatorName)
  const coordinatorEmail = fetchCoordinator.map((type) => type.email)

  const filteredStudent = useMemo(() => {
    return filterByStudentName(fetchStudent, props.submitEnrollment?.studName)
  }, [props.submitEnrollment?.studName, fetchStudent])

  // const orgName = fetchOrganization.map((type) => type.organizationName)

  const fetchCoordinatorNames = useCallback(async () => {
    const fetchCoordinatorByEmail = await fetchCoordinator.filter(
      (type) => type.email === props.submitEnrollment?.coordEmail
    )

    setCoordinatorNames(fetchCoordinatorByEmail)
  }, [props.submitEnrollment?.coordEmail, fetchCoordinator])

  useEffect(() => {
    fetchCoordinatorNames()
  }, [fetchCoordinatorNames])

  const onChange = (event) => {
    const { name, value } = event.target
    props.onChange(name, value)
  }

  const onChangeFile = (event) => {
    const { files } = event.target

    props.handleFileOnChange(files)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const { schoolYear, studName, coordName, orgsName, coordEmail } =
      props?.submitEnrollment

    const config = {
      schoolYear,
      studName,
      coordName,
      orgsName,
      coordEmail,
      enrolled: true,
      studentDetails: filteredStudent,
    }

    props.onSubmit(config)
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
      field: "schoolYear",
      headerName: "School Year",
      width: 200,
    },
    {
      field: "orgsName",
      headerName: "Organization Name",
      type: "string",
      width: 150,
    },
    {
      field: "coordName",
      headerName: "Coordinator Name",
      width: 200,
    },
    {
      field: "coordEmail",
      headerName: "Coordinator Email",
      width: 200,
    },
    {
      field: "studName",
      headerName: "Student Name",
      width: 200,
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.contact || ""} ${params.row coordinatorName || ""}`,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        // delete data in coordinator row
        const Delete = (e) => {
          e.stopPropagation() // don't select this row after clicking
          props.onDelete(params.row.id)
        }

        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/admin/updateEnrollment?id=${params.row.id}`)
          }

          // updateToggleModal();
        }

        return (
          <div className="space-x-4">
            <button
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
              onClick={Update}
            >
              Edit
            </button>
            <button
              className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
              onClick={Delete}
            >
              Delete
            </button>
          </div>
        )
      },
    },
  ]

  const tabName = ["Module List", "Add new Module"]

  return (
    <Layout title="Enrollment Module" description="a list of enrollment module">
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

          {/* <button
            className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
            onClick={props?.parseCsv}
          >
            parse data
          </button> */}
          <Table
            data={fetchEnrollment}
            columns={columns}
            loading={props?.loading}
          />
        </TabPanel>
        <TabPanel value="2">
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="flex gap-4">
              <Textbox
                type="text"
                className="w-full"
                name="schoolYear"
                value={props.submitEnrollment?.schoolYear}
                onChange={(event) => onChange(event)}
                label="School Year"
              />
              <SelectMenu
                name="studName"
                value={props.submitEnrollment?.studName}
                onChange={(event) => onChange(event)}
                title="Students"
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
                value={props.submitEnrollment?.coordEmail}
                onChange={(event) => onChange(event)}
                title="Supervisor Email"
              >
                {coordinatorEmail.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu>
              <SelectMenu
                name="coordName"
                value={props.submitEnrollment?.coordName}
                onChange={(event) => onChange(event)}
                title="Supervisor"
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
                value={props.submitEnrollment?.orgsName}
                onChange={(event) => onChange(event)}
                title="Organization"
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
                type="button"
                onClick={props.clearState}
                className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
              >
                cancel
              </button>
              <button
                type="submit"
                className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
              >
                Save module
              </button>
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </Layout>
  )
}

const CustomEnrollmentModule = () => {
  const EnrollmentModuleHOC = FormHOC(initialState)(entity)(EnrollmentModule)

  return <EnrollmentModuleHOC />
}

export default CustomEnrollmentModule
