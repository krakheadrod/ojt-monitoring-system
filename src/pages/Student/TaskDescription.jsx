import { useContext, useEffect, Fragment, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { Layout, PageModal, Back } from "components"
import { ACTIONS } from "types"
import {
  objectAssign,
  MyDateString,
  filterByStudentUUIDs,
} from "Utils/ReusableSyntax"
import Avatar from "@mui/material/Avatar"
import { lightBlue } from "@mui/material/colors"
import { Edit2, UploadCloud } from "react-feather"
import CircularProgress from "@mui/material/CircularProgress"
import swal from "sweetalert2"
import useToggle from "hooks/useToggle"

//Context
import { TaskContext } from "context/TasksProvider"
import { AuthContext } from "context/auth"

//firebase
import { app } from "config/firebase"

const initialState = {
  taskCode: "",
  taskName: "",
  deadline: "",
  description: "",
  ownerStatus: "",
  taskStatus: "",
  email: "",
}

export default function TaskDescription() {
  //state
  const [isToggle, setToggle] = useToggle()
  const [file, setFile] = useState(null)

  // const [{taskCode, taskName, deadline, description}, setState] = useState(initialState);
  const inputRef = useRef(null)
  const [isLoading, setLoading] = useState(false)
  const { dispatch, fetchOneTask, fetchSubCollection } = useContext(TaskContext)
  const context = useContext(AuthContext)

  const params = useLocation()
  const paramsId = params.search.split("=")
  const id = paramsId[1]

  fetchOneTask && objectAssign(fetchOneTask, initialState)

  const filteredDocuments = filterByStudentUUIDs(
    fetchSubCollection,
    context.uid
  )

  // const isCheckSubmit = useMemo(() => {
  //   return filteredDocuments[0]?.documentDetails.status === "submitted"
  // }, [filteredDocuments])

  const onChange = (event) => {
    const { files } = event.target

    if (files.length > 0) {
      setFile(files[0])
    }
  }

  const removeFile = () => {
    if (inputRef.current) {
      inputRef.current.value = null
      setFile(null)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      fetchSubCollection.length > 0 &&
        filteredDocuments.forEach((el) => {
          if (el.documentid === id && el.userDetails.email === context.email) {
            if (el.documentDetails.status === "submitted") {
              swal.fire({
                title: "Warning!!",
                text: "you already submitted, you cant submit twice",
                icon: "warning",
              })

              setToggle(false)

              throw new Error("you already submitted, you cant submit twice")
            }
          }
        })

      if (file === null) {
        swal.fire({
          title: "Warning!!",
          text: "there is no containing file, please try again",
          icon: "warning",
        })

        return
      }

      const userDetails = JSON.parse(localStorage.getItem("user_details"))

      setLoading(true)

      const storageRef = app.storage().ref()
      const fileRef = storageRef.child(`submitted_documents/${file.name}`)
      file && (await fileRef.put(file))
      await fileRef
        .getDownloadURL()
        .then(async (fileUrl) => {
          if (fileUrl) {
            const response = await app
              .firestore()
              .collection("tasksDetails")
              .doc(id)
              .collection("submittedDocuments")
              .add({
                documentid: id,
                ownerEmail: initialState.email,
                userDetails: userDetails?.userData[0],
                ownerStatus: initialState.ownerStatus,
                taskStatus: initialState.taskStatus,
                documentDetails: {
                  taskName: initialState.taskName,
                  fileUrl,
                  fileName: file.name,
                  status: "submitted",
                  remarks: "done",
                  score: 0,
                  dateSubmission: MyDateString,
                  comments: "",
                },
              })

            setLoading(false)
            setToggle(false)

            if (response) {
              swal
                .fire({
                  title: "Succesfully",
                  text: "Succesfully submitted task",
                  icon: "success",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/admin/studentTasks"
                  }
                })
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    id && dispatch({ type: ACTIONS.GETONE, payload: { id } })
  }, [id, dispatch])

  const complyModal = (
    <PageModal open={isToggle} isClose={setToggle}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <form>
          <div className="flex items-center justify-center w-full mt-6">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 white:hover:bg-bray-800 white:bg-gray-700 hover:bg-gray-100 white:border-gray-600 white:hover:border-gray-500 white:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="text-gray-500 mb-3" size="40" />
                <p className="mb-2 text-sm text-gray-500 white:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 white:text-gray-400">
                  PDf or DOCX
                </p>
              </div>
              <input
                ref={inputRef}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => onChange(event)}
                required
              />
            </label>
          </div>
          {file !== null && (
            <div className="flex items-center justify-between mt-4 bg-slate-500 text-slate-800 text-sm font-semibold mr-2 px-3 py-2 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
              {file.name}
              {/* <Trash2
              onClick={removeFile}
              className="text-slate-900 hover:text-slate-500 transition-all cursor-pointer"
            /> */}
            </div>
          )}
          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={removeFile}
              type="button"
              className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all text-white"
            >
              cancel
            </button>
            <button
              onClick={(event) => onSubmit(event)}
              type="button"
              className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all text-white"
            >
              Upload file
            </button>
          </div>
        </form>
      )}
    </PageModal>
  )

  return (
    <Layout title="Task Description" description="all task descriptions">
      {complyModal}
      <Back redirect="/admin/studentTasks" />
      <Fragment>
        <aside className="shadow-lg border-2 border-slate-200 rounded-lg background-white p-8">
          <div className="flex items-center gap-2">
            <Avatar
              className="bg-slate-900"
              sx={{
                width: 30,
                height: 30,
                fontSize: 16,
                bgcolor: lightBlue[900],
              }}
            >
              {initialState.email?.charAt(0)}
            </Avatar>
            <span className="font-bold text-sm">{initialState.email}</span>
          </div>
          <div
            className="mt-6 px-6"
            dangerouslySetInnerHTML={{ __html: initialState.description }}
          />

          <div className="space-x-4 flex justify-end mt-4">
            <button
              // disabled={isCheckSubmit}
              onClick={setToggle}
              className={`bg-slate-900 cursor-pointer cursor-pointer hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2`}
            >
              {/* {isCheckSubmit ? (
                "already submitted"
              ) : (
               
              )} */}

              <span className="flex items-center gap-2 ">
                <Edit2 size="15" /> upload document
              </span>
            </button>
          </div>
        </aside>
      </Fragment>
    </Layout>
  )
}
