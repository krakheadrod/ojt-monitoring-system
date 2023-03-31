import { Fragment, useContext, useEffect, useState } from "react"
import { AuthContext } from "context/auth"
import { ChatContext } from "context/ChatContext"
import { User } from "react-feather"
import { db, doc, onSnapshot } from "config/firebase"

export default function Chats() {
  const [chats, setChats] = useState([])
  const context = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", context.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    context.uid && getChats()
  }, [context.uid])

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo })
  }

  return (
    <Fragment>
      {Object.entries(chats)?.map((chat) => (
        <div
          key={chat[0]}
          className="flex items-center gap-2 hover:bg-slate-800 hover:cursor-pointer rounded-lg p-2"
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <div className="bg-gray-500 p-4 rounded-full h-full">
            <User size="24" className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-400">
              {chat[1].userInfo?.email}
            </h2>

            <div
              className="text-gray-400"
              dangerouslySetInnerHTML={{ __html: chat[1].lastMessage?.text }}
            />
          </div>
        </div>
      ))}
    </Fragment>
  )
}
