import React, { useContext } from "react"
import { SearchChat, Chats } from "components"
import { useNavigate } from "react-router-dom"

//context
import { AuthContext } from "context/auth"

const ChatSidebar = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const backButton = () => {
    navigate("/admin")
  }

  return (
    <div className="sidebar">
      <div className="flex items-center justify-between my-2 w-full bg-slate-800 rounded-lg p-2">
        <aside className="flex items-center gap-2">
          <img
            src="/images/profile_avatar.jpg"
            className="rounded-full w-10 h-10 object-cover"
            alt="profile"
          />
          <span className="text-bold text-white">{context.email}</span>
        </aside>
        <button
          type="button"
          className="bg-slate-700 hover:bg-slate-600 py-2 px-4 rounded-lg text-white"
          onClick={backButton}
        >
          Back
        </button>
      </div>
      <SearchChat />
      <Chats />
    </div>
  )
}

export default ChatSidebar
