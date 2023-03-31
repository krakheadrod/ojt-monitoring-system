import React, { useContext, Fragment } from "react"
import { Messages, ChatInput } from "components"
import { ChatContext } from "context/ChatContext"
import { User } from "react-feather"

export default function Chat() {
  const { data } = useContext(ChatContext)

  return (
    <div className="chat relative">
      <div className="chatInfo">
        {data.user?.email && (
          <Fragment>
            <div className="bg-gray-500 p-2 rounded-full">
              <User size="18" />
            </div>
            {data.user?.email}
          </Fragment>
        )}
      </div>
      <Messages />
      <ChatInput />
    </div>
  )
}
