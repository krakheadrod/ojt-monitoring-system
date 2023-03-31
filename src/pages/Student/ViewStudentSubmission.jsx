import React, { Fragment, useContext } from "react"
import { Layout, Back } from "components"
import { useLocation } from "react-router-dom"
import { filteredByIDSubmittedTask } from "Utils/ReusableSyntax"
import Avatar from "@mui/material/Avatar"
import { lightBlue } from "@mui/material/colors"
// import { Textbox, Back } from "components"
// import { app } from "config/firebase"
// import swal from "sweetalert2"

//context api
import { TaskContext } from "context/TasksProvider"

export default function ViewStudentSubmission() {
  const { fetchSubCollection } = useContext(TaskContext)
  const params = useLocation()
  const pathname = params.pathname
  const paramsId = pathname.split("/")
  const submittedDocumentsId = paramsId[3]

  const filteredData = filteredByIDSubmittedTask(
    fetchSubCollection,
    submittedDocumentsId
  )

  console.log(filteredData)

  const supervisor = filteredData[0]?.ownerEmail
  const score = filteredData[0]?.documentDetails?.score
  const comments = filteredData[0]?.documentDetails?.comments

  return (
    <Layout
      title="Student submission details"
      description="you can see here all student submitted information"
    >
      <Back redirect="/admin/task-record" />
      <div className="flex gap-3">
        <div className="flex-1">
          <object
            data={filteredData[0]?.documentDetails?.fileUrl}
            type="application/pdf"
            className="h-screen w-full"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={filteredData[0]?.documentDetails?.fileUrl}>
                to the PDF!
              </a>
            </p>
          </object>
        </div>
        <form className="flex-1 leading-5">
          {comments ? (
            <Fragment>
              <aside className="shadow-lg border-2 border-slate-200 rounded-lg background-white mx-8 p-8">
                {score !== 0 && (
                  <div className="flex items-center justify-between transition-all text-center  text-white">
                    <h1 className="font-bold text-2xl text-black">Feedback</h1>
                    <span className="bg-blue-500 rounded-sm p-2 text-sm">
                      {score}/100
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <Avatar
                    className="bg-slate-900"
                    sx={{
                      width: 30,
                      height: 30,
                      fontSize: 16,
                      bgcolor: lightBlue[900],
                    }}
                  >
                    {supervisor && supervisor[0]}
                  </Avatar>
                  <span className="font-bold text-sm">{supervisor}</span>
                </div>
                <div
                  className="mt-6 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: comments }}
                />
              </aside>
            </Fragment>
          ) : (
            <div className="bg-red-500 text-white p-4 text-center">
              Your supervisor does not review your submission yet please wait...
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}
