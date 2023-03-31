import React, { useEffect, useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import { TaskContext } from "context/TasksProvider"
import { Layout, Back, Textbox } from "components"
import { ACTIONS } from "types"
import ReactQuill from "react-quill"

//Utils
import { objectAssign } from "Utils/ReusableSyntax"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  taskCode: "",
  taskName: "",
  deadline: "",
  description: "",
}

const entity = {
  componentName: "updateTasks",
  collectionName: "tasksDetails",
  actionType: "UPDATE",
}

function UpdateTasks(props) {
  const params = useLocation()
  const paramsId = params.search.split("=")
  const id = paramsId[1]

  const { taskCode, taskName, deadline, description } = props?.updateTasks

  const { dispatch, fetchOneTask } = useContext(TaskContext)
  const [convertedText, setConvertedText] = useState(description)

  fetchOneTask && objectAssign(fetchOneTask, initialState)

  useEffect(() => {
    id && dispatch({ type: ACTIONS.GETONE, payload: { id } })
  }, [id, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (event) => {
    const { name, value } = event.target

    props.onChange(name, value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    try {
      const config = {
        taskCode,
        taskName,
        deadline,
        description: convertedText,
      }

      props.onSubmit(config, paramsId[1])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout
      title="Update Tasks Information"
      description="this section you can update Tasks information"
    >
      <Back redirect="/admin/tasks" />
      <h1 className="font-bold text-2xl mb-4">Update tasks</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-4 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="taskCode"
            value={props.updateTasks?.taskCode}
            onChange={(event) => onChange(event)}
            disabled={true}
            label="Task Code"
          />
          <Textbox
            type="text"
            className="w-full"
            name="taskName"
            value={props.updateTasks?.taskName}
            onChange={(event) => onChange(event)}
            label="Task Name"
          />
          <Textbox
            type="date"
            className="w-full"
            name="deadline"
            value={props.updateTasks?.deadline}
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full">
          <div>
            <ReactQuill
              theme="snow"
              value={convertedText}
              onChange={setConvertedText}
              placeholder="task description"
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
            value={props.updateTasks?.description}
            onChange={(event) => onChange(event)}
            rows={4}
            column={4}
            multiline
            label="Description"
          /> */}
        </div>
        <div className="text-white flex gap-2 justify-end mt-16">
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            Update task
          </button>
        </div>
      </form>
    </Layout>
  )
}

const CustomUpdateTasks = () => {
  const UpdateTasksHOC = FormHOC(initialState)(entity)(UpdateTasks)

  return <UpdateTasksHOC />
}

export default CustomUpdateTasks
