import React, { Fragment, useContext, useState } from "react"
import { TabPanel } from "@mui/lab"
import { MenuItem } from "@mui/material"
import { Layout, Tabs, Textbox, Table, SelectMenu } from "components"
import { generateTaskCode, Months } from "Utils/ReusableSyntax"
import { useNavigate } from "react-router-dom"
import { sectionList } from "Utils/ReusableSyntax"
import {
  filterByOwnerIdTask,
  filterByCoordinatorUUID,
} from "Utils/ReusableSyntax"
import ReactQuill from "react-quill"

//context api
import { AuthContext } from "context/auth"
import { TaskContext } from "context/TasksProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"

//Higher Order Component
import { FormHOC } from "HOC"

import { deleteWithSubCollection } from "config/firebase"

const initialState = {
  taskCode: generateTaskCode(),
  taskName: "",
  deadline: "",
  description: "",
  section: "",
}

const entity = {
  componentName: "tasks",
  collectionName: "tasksDetails",
  actionType: "SAVE",
}

function Tasks(props) {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)
  const { fetchTasks } = useContext(TaskContext)
  const filteredTask = filterByOwnerIdTask(fetchTasks, context.uid)

  const isCurrentLogged = context.email === "demo@admin.com"

  // const filteredTasks = filterByUUID(fetchTasks, context.uid)

  const filteredSupervisor = filterByCoordinatorUUID(
    fetchCoordinator,
    context.uid
  )

  console.log(filteredSupervisor)

  const [convertedText, setConvertedText] = useState("")

  const onChange = (event) => {
    const { name, value } = event.target

    props.onChange(name, value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { taskCode, taskName, deadline, section } = props?.tasks
      const isCheckStatus = isCurrentLogged ? "admin" : "coordinator"

      const config = {
        email: context.email,
        ownerUUID: context.uid,
        taskCode,
        taskName,
        section,
        ownerStatus: isCheckStatus,
        taskStatus: isCurrentLogged ? "WAR" : "TASK",
        company:
          filteredSupervisor.length > 0 ? filteredSupervisor[0]?.company : null,
        deadline,
        description: convertedText,
        deadlineStatus: "active",
      }

      // console.log(config)

      props.onSubmit(config)
    } catch (error) {
      console.log(error)
    }
  }

  //column example
  const columns = [
    // {
    //   field: "id",
    //   headerName: "User Identification",
    //   width: 200,
    //   renderCell: (data) => {
    //     return <span className="text-blue-500">{data.id}</span>
    //   },
    // },
    {
      field: "taskCode",
      headerName: `${isCurrentLogged ? "Accomplishment Code" : "Task Code"}`,
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.row?.taskCode}</span>
      },
    },
    {
      field: "taskName",
      headerName: `${isCurrentLogged ? "Accomplishment Name" : "Task Name"}`,
      type: "string",
      width: 150,
    },
    {
      field: "section",
      headerName: "Section Name",
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
      field: "deadline",
      headerName: "Deadline",
      width: 200,
      renderCell: (data) => {
        var MyDate = new Date(data.row?.deadline)

        MyDate.setMonth(MyDate.getMonth())

        const MyDateString = `${
          Months[MyDate.getMonth()]
        } ${MyDate.getDate()}, ${MyDate.getFullYear()}`

        return (
          <span className="bg-slate-500 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
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
        // delete data in coordinator row
        const Delete = (e) => {
          e.stopPropagation() // don't select this row after clicking
          deleteWithSubCollection(params.row.id)
          //props.onDelete(params.row.id)
        }

        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/admin/updateTasks?id=${params.row.id}`)
          }

          // updateToggleModal();
        }

        return (
          <div className="space-x-4">
            <button
              onClick={Update}
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              Edit
            </button>
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

  const add_new_trainee = (
    <Fragment>
      <h1 className="font-bold text-2xl mb-4">
        {isCurrentLogged ? "Add new Accomplishment" : "Add New Task"}
      </h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-4 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="taskCode"
            disabled={true}
            value={props.tasks?.taskCode}
            onChange={(event) => onChange(event)}
            label={isCurrentLogged ? "Accomplishment Code" : "Task Code"}
          />
          <Textbox
            type="text"
            className="w-full"
            name="taskName"
            value={props.tasks?.taskName}
            onChange={(event) => onChange(event)}
            label={isCurrentLogged ? "Accomplishment Name" : "Task Name"}
          />
        </div>
        <div className="flex gap-4 my-4">
          <SelectMenu
            name="section"
            title="Section"
            onChange={(event) => onChange(event)}
          >
            {sectionList.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </SelectMenu>
          {/* <Textbox
            type="text"
            className="w-full"
            name="orgsName"
            disabled={true}
            value={filteredSupervisor[0]?.company}
            onChange={(event) => onChange(event)}
            label="Accomplishment Name"
          /> */}
          <Textbox
            type="date"
            className="w-full"
            value={props.tasks?.deadline}
            onChange={(event) => onChange(event)}
            name="deadline"
          />
        </div>
        <div className="w-full">
          <div>
            <ReactQuill
              theme="snow"
              value={convertedText}
              onChange={setConvertedText}
              placeholder={
                isCurrentLogged
                  ? "Accomplishment description"
                  : "Task description"
              }
              style={{
                border: 1,
                borderColor: "#d3c4c4",
                minHeight: "100%",
                height: "200px",
                borderRadius: "5px",
              }}
            />
          </div>
          {/* <Textbox
            type="text"
            className="w-full"
            name="description"
            value={props.tasks?.description}
            onChange={(event) => onChange(event)}
            rows={4}
            column={4}
            multiline
            label="Description"
          /> */}
        </div>
        <div className="text-white flex gap-2 justify-end mt-16">
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
            Save task
          </button>
        </div>
      </form>
    </Fragment>
  )

  const adminTabName = ["Accomplishment List", "Add New Accomplishment"]
  const coordinatorTabName = ["Task Lists", "Add New Task"]

  return (
    <Layout
      title="Accomplishment"
      description="a list of accomplishment assigned by coordinator"
    >
      <Tabs tabName={isCurrentLogged ? adminTabName : coordinatorTabName}>
        <TabPanel value="1">
          <Table data={filteredTask} columns={columns} loading={false} />
        </TabPanel>
        <TabPanel value="2">{add_new_trainee}</TabPanel>
      </Tabs>
    </Layout>
  )
}

const CustomTasks = () => {
  const TasksHOC = FormHOC(initialState)(entity)(Tasks)

  return <TasksHOC />
}

export default CustomTasks
