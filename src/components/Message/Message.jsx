import React, { useContext, useEffect, useRef } from "react"
import { AuthContext } from "context/auth"
import { User } from "react-feather"
// import { ChatContext } from "context/ChatContext"

export default function Message({ message }) {
  const context = useContext(AuthContext)
  // const { data } = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  return (
    <div
      className={`message ${message.senderId === context.uid && "owner"} m-4`}
    >
      <div className="messageInfo">
        <div className="flex items-center justify-center bg-gray-500 w-10 h-10 rounded-full ">
          <User size="18" className="text-white" />
        </div>
        {/* <span>just now</span> */}
      </div>
      <div className="messageContent">
        <div
          className="messageBody"
          dangerouslySetInnerHTML={{ __html: message.text }}
        />
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
    </div>
  )
}
