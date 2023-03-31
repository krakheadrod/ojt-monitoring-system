import React, { useContext, useState } from "react"
import { AuthContext } from "context/auth"
import { ChatContext } from "context/ChatContext"
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import ReactQuill from "react-quill"
import { db } from "config/firebase"
import { v4 as uuid } from "uuid"
// import { Image } from "react-feather"

export default function ChatInput() {
  const [text, setText] = useState("")
  const context = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: context.uid,
        date: Timestamp.now(),
      }),
    })

    await updateDoc(doc(db, "userChats", context.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.authId), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    setText("")
  }

  return (
    <React.Fragment>
      {Object.entries(data.user).length > 0 && (
        <div className="flex gap-4 mx-5">
          <div className="w-full">
            <ReactQuill
              theme="snow"
              value={text}
              onChange={setText}
              placeholder="Message"
            />
          </div>
          {/* <input
               type="text"
               className="outline-none"
               placeholder="Type something..."
               onChange={(event) => setText(event.target.value)}
             /> */}
          <div className="send self-end">
            {/* <Image size="25" className="text-slate-500" /> */}
            {/* <input
             type="file"
             style={{ display: "none" }}
             id="file"
           />
           <label htmlFor="file">
             <img src={Img} alt="" />
           </label> */}
            <button
              className="bg-slate-900 hover:bg-slate-800 rounded-lg text-white py-2 px-4"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
