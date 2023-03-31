import React, { Fragment, useState, useContext, useEffect } from "react"
import { Plus, Download } from "react-feather"
import { MenuItem } from "@mui/material"
import { Layout, Table, AddStudentsModal, SelectMenu } from "components"
import { sectionList } from "Utils/ReusableSyntax"
import { useNavigate } from "react-router-dom"
import { saveDoc } from "config/firebase"

//download csv
import { CSVLink } from "react-csv"

// context
import { StudentContext } from "context/StudentProvider"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  schoolID: "",
  fullName: "",
  course: "",
  company: "",
  contact: 0,
  section: "",
  email: "",
  address: "",
  password: "",
}

const entity = {
  componentName: "students",
  userCollection: "userData",
  dataCollection: "studentsData",
  actionType: "REGISTER",
}

//csv headers
const headers = [
  {
    label: "id",
    key: "id",
  },
  {
    label: "schoolID",
    key: "schoolID",
  },
  {
    label: "fullName",
    key: "fullName",
  },
  {
    label: "course",
    key: "course",
  },
  {
    label: "company",
    key: "company",
  },
  {
    label: "coordinatorEmail",
    key: "coordinatorEmail",
  },
  {
    label: "contact",
    key: "contact",
  },
  {
    label: "section",
    key: "section",
  },
  {
    label: "email",
    key: "email",
  },
  {
    label: "address",
    key: "address",
  },
]

function Students(props) {
  const [isToggle, setToggle] = useState(false)
  const [section, setSelect] = useState("")
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const { fetchStudent } = useContext(StudentContext)

  const filter = () => {
    const filtered = fetchStudent.filter((el) => {
      return el.section === section
    })

    setData(filtered)
  }

  useEffect(filter, [section, fetchStudent])

  const resetValue = () => {
    setData([])
    setSelect("")
  }

  const toggleModal = () => {
    setToggle((isToggle) => !isToggle)
  }

  const onChange = (event) => {
    const { name, value } = event.target

    props.onChange(name, value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const courseValidator = /^([^0-9]*)$/

    const {
      schoolID,
      fullName,
      course,
      company,
      coordinatorEmail,
      contact,
      section,
      address,
      email,
      password,
    } = props?.students

    try {
      if (courseValidator.test(course)) {
        const config = {
          schoolID,
          fullName,
          course,
          company,
          coordinatorEmail,
          email,
          contact,
          section,
          address,
        }

        const userData = {
          name: fullName,
          status: "student",
        }

        await props.onAuth(email, password, config, userData)
        config && saveDoc(config, "registeredStudentsInfo")
      }
      setToggle(false)
    } catch (error) {
      console.log(error)
    }
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
      field: "company",
      headerName: "Company",
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
        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/admin/updateStudents?id=${params.row.id}`)
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
            {/* <button
              className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
              onClick={Delete}
            >
              Delete
            </button> */}
          </div>
        )
      },
    },
  ]

  const addModal = (
    <AddStudentsModal
      isToggle={isToggle}
      toggleModal={toggleModal}
      config={props}
      clearState={props.clearState}
      onSubmit={onSubmit}
      onChange={onChange}
      loading={props?.loading}
    />
  )

  return (
    <Fragment>
      {addModal}
      <Layout title="Students" description="a list of student data">
        <div className="flex justify-end gap-3 my-4">
          <SelectMenu
            name="section"
            value={section}
            onChange={(event) => setSelect(event.target.value)}
            required
            title="Section"
          >
            <div className="flex justify-end ">
              <button
                type="button"
                onClick={resetValue}
                className="bg-slate-900 hover:bg-slate-800 p-2 px-4 m-4 text-white rounded-sm"
              >
                Reset value
              </button>
            </div>
            {sectionList.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </SelectMenu>
          <CSVLink
            style={{ textDecoration: "none" }}
            data={data.length > 0 ? data : fetchStudent}
            headers={headers}
            filename="download.csv"
          >
            <button className="w-48 h-full bg-slate-900 rounded-lg flex items-center justify-center py-1.5 px-3 gap-2 text-white hover:bg-slate-600 transition-all">
              <Download size="18" />
              Download CSV
            </button>
          </CSVLink>
          <button
            onClick={toggleModal}
            className="w-48  bg-slate-900 rounded-lg flex items-center justify-center py-1.5 px-3 gap-2 text-white hover:bg-slate-600 transition-all"
          >
            <Plus size="18" /> add student
          </button>
        </div>
        <Table
          data={data.length > 0 ? data : fetchStudent}
          columns={columns}
          loading={false}
        />
      </Layout>
    </Fragment>
  )
}

const CustomStudents = () => {
  const StudentsHOC = FormHOC(initialState)(entity)(Students)

  return <StudentsHOC />
}

export default CustomStudents
