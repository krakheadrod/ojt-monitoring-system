import { useState, Fragment } from "react"
// import { checkOrganization } from "Utils/ErrorHandling"
import Papa from "papaparse"
import swal from "sweetalert2"

//Context
// import { OrganizationContext } from "context/OrganizationProvider"

//Firebase functions
import {
  signInWithEmailAndPassword,
  auth,
  saveDoc,
  updateDocument,
  registerUser,
  deleteDocument,
  setDoc,
  doc,
  db,
} from "config/firebase"

const ACTIONS = {
  save: "SAVE",
  onRegister: "REGISTER",
  update: "UPDATE",
  DELETE: "DELETE",
}

const attributes = ["csv"]

const FormHOC = (propState) => (entity) => (WrappedComponent) => {
  const HOC = () => {
    const [state, setState] = useState({ [entity?.componentName]: propState })
    const [isLoading, setIsLoading] = useState(false)
    // const { fetchOrganization } = useContext(OrganizationContext)

    const clearState = () => {
      setState({
        [entity?.componentName]: { ...propState },
      })
    }

    const Login = async () => {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          state.Login?.email,
          state.Login?.password
        )

        if (response) {
          const { email } = response?.user
          localStorage.setItem("email", email)

          swal.fire({
            title: "Success!",
            text: "successfully login click okay to continue",
            icon: "success",
          })
        }
      } catch (error) {
        if ((error.code = "auth/user-not-found")) {
          swal.fire({
            title: "Oops!",
            text: "this account still not registered please try again",
            icon: "warning",
          })
        }
      }
    }

    const saveData = async (data) => {
      try {
        const response = await swal.fire({
          title: "Opps!",
          text: "would you like to save this file?",
          icon: "question",
          showCancelButton: true,
        })

        if (response.isConfirmed) {
          console.log(data)
          data &&
            saveDoc(data, entity?.collectionName).then(() => {
              swal.fire({
                title: "Successfully Created",
                text: "please click the okay button to continue",
                icon: "success",
              })
            })
          clearState()
          return false
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleAuth = async (email, password, configData, userData) => {
      try {
        setIsLoading(true)
        if (entity?.actionType === ACTIONS.onRegister) {
          const credentials = await registerUser(email, password)
          await setDoc(doc(db, "userChats", credentials.user.uid), {})

          const config = {
            authId: credentials.user.uid,
            email: credentials.user.email,
            ...configData,
          }

          const user = {
            authId: credentials.user.uid,
            email: credentials.user.email,
            ...userData,
          }

          //firebase saved event user
          config.email &&
            config.authId &&
            (await setDoc(
              doc(db, entity?.userCollection, credentials.user.uid),
              { ...user }
            ))
          //firebase saved event
          config.email &&
            config.authId &&
            (await setDoc(
              doc(db, entity?.dataCollection, credentials.user.uid),
              {
                ...config,
              }
            ).then(async () => {
              swal.fire({
                title: "Successfully Created",
                text: "please click the okay button to continue",
                icon: "success",
              })
            }))
          clearState()
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleDelete = (id) => {
      swal
        .fire({
          title: "ARE YOU SURE?",
          text: "are you sure to delete this data?",
          icon: "warning",
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            setIsLoading(true)
            await deleteDocument(entity?.collectionName, id).then(() => {
              swal.fire({
                title: "Successfully Deleted",
                text: "Please click yes to continue",
                icon: "success",
              })
            })
            setIsLoading(false)
          } else {
            swal.fire("Yay!", "your data is safe", "success")
          }
        })
    }

    // const parseCsv = () => {
    //   if (!state) {
    //     swal.fire({
    //       title: "Warning",
    //       text: "Enter a valid file",
    //       icon: "warning",
    //     })
    //   }

    //   // Initialize a reader which allows user
    //   // to read any file or blob.
    //   const reader = new FileReader()

    //   // Event listener on reader when the file
    //   // loads, we parse it and set the data.
    //   reader.onload = async ({ target }) => {
    //     const csv = Papa.parse(target.result, { header: true })
    //     const parsedData = csv?.data
    //     console.log(parsedData)
    //   }

    //   reader.readAsText(state?.[entity?.componentName]?.csvFile)
    // }

    const handleSubmit = (data, id) => {
      /**
       * if the entity componentName is equal to Login return Login function
       * otherwise run with actionType
       */
      if (entity?.componentName === "Login") {
        Login()
      }

      if (entity?.actionType === ACTIONS.save) {
        saveData(data)
      }

      if (entity?.actionType === ACTIONS.update) {
        updateDocument(entity?.collectionName, data, id)
      }

      //console.log("note save data")

      //saveData(data)
    }

    const handleFileOnChange = async (files, email, uuid) => {
      try {
        if (files.length) {
          let inputFile = files[0]

          //it will select and split the file type
          const fileExtension = inputFile?.type.split("/")
          // const orgName = fetchOrganization.map((el) => el.organizationName)

          // if the extension does not match with .csv it will return an error
          if (!attributes.includes(fileExtension[1])) {
            swal.fire({
              title: "Warning",
              text: "Please import csv file only",
              icon: "warning",
            })

            return
          }
          // Initialize a reader which allows user
          // to read any file or blob.
          const reader = new FileReader()

          const response = await swal.fire({
            title: "Are you sure?",
            text: "do you want to save this data?",
            icon: "question",
          })

          // Event listener on reader when the file
          // loads, we parse it and set the data.
          reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true })
            const parsedData = csv?.data

            // const isCheck = checkOrganization(parsedData, orgName)

            // console.log(isCheck)

            parsedData.forEach(async (el) => {
              if (el.schoolYear !== "") {
                const config = {
                  ...el,
                  coordinatorEmail: email,
                  coordinatorUUID: uuid,
                }

                if (response.isConfirmed) {
                  config &&
                    saveDoc(config, entity?.collectionName).then(() => {
                      swal.fire({
                        title: "Successfully Created",
                        text: "please click the okay button to continue",
                        icon: "success",
                      })
                    })
                }
              }
            })

            inputFile = null
          }

          reader.readAsText(inputFile)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleChange = (name, value, files) => {
      setState((prevState) => ({
        [entity?.componentName]: {
          ...prevState[entity?.componentName],
          [name]: value,
        },
      }))
    }

    return (
      <Fragment>
        <WrappedComponent
          {...state}
          handleFileOnChange={handleFileOnChange}
          onAuth={handleAuth}
          clearState={clearState}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onChange={handleChange}
          loading={isLoading}
        />
      </Fragment>
    )
  }

  return HOC
}

export default FormHOC
