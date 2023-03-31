import React, { useContext } from "react"
import { Layout, Table } from "components"
import {
  Months,
  filterByStudentUUID,
  filteredBySection,
} from "Utils/ReusableSyntax"
import { File } from "react-feather"
import { useNavigate } from "react-router-dom"

//context api
import { TaskContext } from "context/TasksProvider"
// import { EnrollmentContext } from "context/EnrollmentProvider"
import { StudentContext } from "context/StudentProvider"
import { AuthContext } from "context/auth"

export default function StudentTasks() {
  // const submittedDocument = JSON.parse(localStorage.getItem("documents"))
  const { fetchTasks } = useContext(TaskContext)
  const { fetchStudent } = useContext(StudentContext)
  const context = useContext(AuthContext)
  const { userData } = JSON.parse(localStorage.getItem("user_details"))

  const navigate = useNavigate()

  const filteredByUID = filterByStudentUUID(fetchStudent, context.uid)

  const studentTasks = filteredBySection(
    fetchTasks,
    filteredByUID[0]?.section,
    userData[0]?.company
  )

  // const filteredStudentTasks = newSetOfStudentTasks(
  //   studentTasks,
  //   filteredDocuments
  // )

  //column example
  const columns = [
    // {
    //   field: "id",
    //   headerName: "User Identification",
    //   width: 200,
    //   renderCell: (data) => {
    //     return <span className="text-blue-500">{data.row?.id}</span>
    //   },
    // },
    {
      field: "taskCode",
      headerName: "Task Code",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.row?.taskCode}</span>
      },
    },
    {
      field: "taskName",
      headerName: "Task Name",
      type: "string",
      width: 150,
    },
    {
      field: "taskStatus",
      headerName: "Type",
      width: 200,
      renderCell: (data) => {
        return (
          <span className="text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
            {data.row?.taskStatus}
          </span>
        )
      },
    },
    {
      field: "ownerStatus",
      headerName: "Status",
      width: 200,
      renderCell: (data) => {
        return (
          <span className="text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
            {data.row?.ownerStatus}
          </span>
        )
      },
    },
    {
      field: "deadlineStatus",
      headerName: "Status",
      width: 200,
      renderCell: (data) => {
        const status = data.row.deadlineStatus
        return (
          <span
            className={`${
              status === "active"
                ? "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded white:bg-green-200 white:text-green-900"
                : "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded white:bg-red-200 white:text-red-900"
            }`}
          >
            {status}
          </span>
        )
      },
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 200,
      renderCell: (data) => {
        var MyDate = new Date(data.row?.deadline)

        MyDate.setMonth(MyDate.getMonth())

        const MyDateString = `${
          Months[MyDate.getMonth()]
        } ${MyDate.getDate()} ${MyDate.getFullYear()}`

        return (
          <span className="bg-slate-800 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded white:bg-slate-200 mt-2">
            {MyDateString}
          </span>
        )
      },
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
        // const deadlineDate = new Date(params.row?.deadline)
        // const dateToday = new Date(MyDateString)
        // const isCheckDeadline = dateToday >= deadlineDate
        // const isCheckSubmit =
        //   isCheckDeadline ||
        //   isCheckSubmittedTasks(filteredDocuments, params.row.taskName)

        const redirect = () => {
          navigate(`/admin/view-task?=${params.row?.id}`)
        }

        return (
          <div className="space-x-4">
            <button
              // onClick={() => toggleModal(params.row?.id, params.row?.taskName)}
              onClick={redirect}
              className={`bg-slate-900 cursor-pointer cursor-pointer hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2`}
            >
              <span className="flex items-center gap-2 ">
                <File size="15" /> preview
              </span>
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <Layout
      title="Student Tasks List"
      description="a list of tasks given to a student"
    >
      <Table data={studentTasks} columns={columns} loading={false} />
    </Layout>
  )
}
