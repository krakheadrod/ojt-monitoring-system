import React from "react"
import { ChatSidebar, Chat } from "components"

export default function Message() {
  return (
    <div className="home">
      <div className="container bg-slate-200">
        <ChatSidebar />
        <Chat />
      </div>
    </div>
  )
}
