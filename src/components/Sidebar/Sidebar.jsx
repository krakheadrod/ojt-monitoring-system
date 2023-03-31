import React, { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { LogOut, Trash } from "react-feather"
import { auth, signOut } from "config/firebase"
import { useNavigate } from "react-router-dom"
import rolesHook from "hooks/rolesHook"
import swal from "sweetalert2"

//context api
import { AuthContext } from "context/auth"

//firebase functions
import { deleteUserAuth } from "config/firebase"

export default function Sidebar() {
  const query = useLocation()
  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const { info, links } = rolesHook()

  const logoutUser = async () => {
    await signOut(auth)
    navigate("/")
    localStorage.clear()
  }

  const deleteAccount = () => {
    try {
      if (context.uid) {
        const isCheckCollection =
          info.status === "coordinator" ? "coordinatorData" : "studentsData"

        deleteUserAuth(context?.uid, isCheckCollection)
      }
    } catch (error) {
      console.log(error)
      swal.fire({
        title: "Warning!",
        text: "something went wrong!!!",
        icon: "warning",
      })
    }
  }

  const isCheckStatus =
    info.status === "coordinator" || info.status === "student"

  return (
    <section className="w-1/4">
      <aside className="sticky top-0 bg-slate-900 w-full h-screen shadow-lg py-12 px-4">
        <div className="text-center text-white flex flex-col items-center justify-center">
          <img
            src="/images/profile_avatar.jpg"
            className="rounded-full w-44 h-44 border-2 border-gray-500 object-cover mb-4"
            alt=""
          />
          <h1 className="font-bold text-lg">{info.name}</h1>
          <h2 className="text-sm">{info.email}</h2>
          <span className="bg-slate-500 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
            {info.status}
          </span>
        </div>
        <ul className="space-y-3 mt-10 list-none">
          {links.map((type) => {
            return (
              <li key={type.id}>
                <Link
                  to={type.path}
                  className={`${
                    type.path === query.pathname
                      ? "bg-slate-800 text-white"
                      : "text-slate-600"
                  } flex items-center hover:text-white hover:bg-slate-800 cursor-pointer transition-all rounded-sm py-2 no-underline`}
                >
                  <i className="mx-2 ml-3">{type.icon}</i>
                  <span className="text-sm">{type.title}</span>
                </Link>
              </li>
            )
          })}
          <li>
            {isCheckStatus && (
              <div
                onClick={deleteAccount}
                className={`text-slate-600 hover:text-white flex items-center hover:text-white hover:bg-slate-800 cursor-pointer transition-all rounded-sm py-2`}
              >
                <i className="mx-2 ml-3">
                  <Trash size="18" />
                </i>
                <span className="text-sm">Delete account</span>
              </div>
            )}
          </li>
          <li>
            <div
              onClick={logoutUser}
              className={`text-slate-600 hover:text-white flex items-center hover:text-white hover:bg-slate-800 cursor-pointer transition-all rounded-sm py-2`}
            >
              <i className="mx-2 ml-3">
                <LogOut size="18" />
              </i>
              <span className="text-sm">Logout</span>
            </div>
          </li>
        </ul>
      </aside>
    </section>
  )
}
