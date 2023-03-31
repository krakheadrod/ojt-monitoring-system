import React, { useContext } from "react"
import { Layout } from "components"
import { useNavigate } from "react-router-dom"
import { filteredSubmission } from "Utils/ReusableSyntax"

//context api
import { TaskContext } from "context/TasksProvider"

export default function ViewSubmission() {
  const { fetchSubCollection } = useContext(TaskContext)
  const navigate = useNavigate()

  const filteredTaskSubmission =
    fetchSubCollection && filteredSubmission(fetchSubCollection)

  const redirectTo = (event, submittedId) => {
    event.preventDefault()

    if (submittedId) {
      navigate(`/admin/update-grade/${submittedId}`)
    }
  }

  const submittedHtmlElement = (
    <>
      {filteredTaskSubmission.map((el) => (
        <div
          onClick={(event) => redirectTo(event, el.id)}
          key={el.id}
          className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-md white:bg-gray-800 white:border-gray-700 cursor-pointer transition-all transform hover:-translate-y-2"
        >
          <div>
            <object
              data={el.documentDetails?.fileUrl}
              type="application/pdf"
              className="h-60 w-full"
            >
              <p>
                Alternative text - include a link{" "}
                <a href={el.documentDetails?.fileUrl}>to the PDF!</a>
              </p>
            </object>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 white:text-white">
                {el.userDetails?.fullName}
              </h5>
            </div>
            <p className="text-gray-700 text-sm">
              Submitted Date: {el.documentDetails?.dateSubmission}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              Course & Section: {el.userDetails?.course}{" "}
              {el.userDetails?.section}
            </p>
            <p className="w-20 text-gray-700 text-sm mt-2 bg-slate-500 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
              Score: {el.documentDetails?.score}
            </p>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <Layout
      title="Students who Submitted"
      description="all the submitted tasks by the students"
    >
      {filteredTaskSubmission.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 w-full">
          {submittedHtmlElement}
        </div>
      ) : (
        <div className="flex items-center justify-center bg-red-500 w-full font-bold text-white rounded-sm py-2">
          No data to be shown
        </div>
      )}
    </Layout>
  )
}
