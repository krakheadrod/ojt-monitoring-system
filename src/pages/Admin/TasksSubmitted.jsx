import React, { useContext } from "react"
import { Layout, Table } from "components"
import { useNavigate } from "react-router-dom"
import { filteredByEmail } from "Utils/ReusableSyntax"
import { Download } from "react-feather"

// context
import { TaskContext } from "context/TasksProvider"
import { AuthContext } from "context/auth"

export default function TasksSubmitted() {
  // const [filteredData, setFilteredData] = useState(null)
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const { fetchSubCollection } = useContext(TaskContext)

  const filteredTasks =
    fetchSubCollection.length > 0 &&
    filteredByEmail(fetchSubCollection, context.email)

  const columnVisibilityModel = {
    score: context.email === "demo@admin.com" ? false : true,
  }

  //column example
  const columns = [
    {
      field: "documentid",
      headerName: "User Identification",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data?.id}</span>
      },
    },
    {
      field: "studName",
      headerName: "Student Name",
      width: 200,
      renderCell: (params) => {
        return <span>{params?.row?.userDetails?.fullName}</span>
      },
    },
    {
      field: "section",
      headerName: "Section Name",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return <span>{params?.row?.userDetails?.section}</span>
      },
    },
    {
      field: "taskName",
      headerName: "Task Name",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return <span>{params?.row?.documentDetails?.taskName}</span>
      },
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
      field: "score",
      headerName: "Score",
      columnVisibilityModel: {
        // Hide columns status and traderName, the other columns will remain visible
        status: false,
        traderName: false,
      },
      type: "string",
      width: 150,
      renderCell: (params) => {
        return (
          <span className="bg-slate-500 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
            {params?.row?.documentDetails?.score}
          </span>
        )
      },
    },
    {
      field: "fileUrl",
      headerName: "File",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <a
              href={params?.row?.documentDetails?.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900 hover:bg-slate-900 p-2 rounded-sm"
            >
              <Download size="15" className="text-white" />
            </a>
          </div>
        )
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const redirectTo = () => {
          navigate(`/admin/update-grade/${params?.row?.id}`)
        }

        return (
          <div className="space-x-4">
            <button
              onClick={redirectTo}
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              view
            </button>
            {/* <button className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2">
              Delete
            </button> */}
          </div>
        )
      },
    },
  ]

  return (
    <Layout
      title="Submitted Task"
      description="all the task submitted by the students"
    >
      <Table
        columnVisibilityModel={columnVisibilityModel}
        data={filteredTasks}
        columns={columns}
        loading={false}
      />
    </Layout>
  )
}
