import React, { useState, Fragment, useContext } from "react"
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore"
import { db } from "config/firebase"
import swal from "sweetalert2"

//context
import { AuthContext } from "context/auth"

export default function SearchChat() {
  const [email, setEmail] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const context = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "userData"), where("email", "==", email))

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot
        .forEach((doc) => {
          setUser(doc.data())
        })
        .catch(() => {
          swal.fire({
            title: "Warning!",
            text: "user not found",
            icon: "warning",
          })
        })
    } catch (err) {
      setError(true)
      swal.fire({
        title: "Warning!",
        text: "user not found",
        icon: "warning",
      })
    }
  }

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      context.uid > user.authId
        ? context.uid + user.authId
        : user.authId + context.uid

    try {
      const res = await getDoc(doc(db, "chats", combinedId))

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, "userChats", context.uid), {
          [combinedId + ".userInfo"]: {
            authId: user.authId,
            email: user.email,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }).catch((error) => {
          console.log(error)
        })

        await updateDoc(doc(db, "userChats", user.authId), {
          [combinedId + ".userInfo"]: {
            authId: context.uid,
            email: context.email,
            // photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }).catch((error) => {
          console.log(error)
        })
      }
    } catch (err) {
      console.log(err)
    }

    setUser(null)
    setEmail("")
  }

  console.log(error)

  return (
    <div className="search">
      {/* <h1>OJT Messenger</h1> */}
      <div className="searchForm">
        <input
          type="email"
          className="search-input"
          placeholder="Find a user by email"
          onKeyDown={(event) => handleKey(event)}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <Fragment>
        {error && <span>User not found!</span>}
        {user && (
          <div
            className="flex  gap-2 hover:bg-slate-800 hover:cursor-pointer rounded-lg p-2"
            onClick={handleSelect}
          >
            <img
              className="w-10 h-10 object-cover rounded-full"
              src="/images/chat-avatar.jpg"
              alt="chat avatar"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-400">{user.name}</h2>
              {/* <p className="text-gray-400"></p> */}
            </div>
          </div>
        )}
      </Fragment>
    </div>
  )
}
