import React, { Fragment, useState, useContext } from "react"
import { Plus } from "react-feather"
import { Layout, Table, AddCoordinatorModal } from "components"
import { useNavigate } from "react-router-dom"

// context
import { CoordinatorContext } from "context/CoordinatorProvider"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  coordinatorName: "",
  company: "",
  contact: "",
  email: "",
  address: "",
  password: "",
}

const entity = {
  componentName: "coordinator",
  userCollection: "userData",
  dataCollection: "coordinatorData",
  actionType: "REGISTER",
}

function Coordinator(props) {
  const [isToggle, setToggle] = useState(false)

  const navigate = useNavigate()

  const { fetchCoordinator } = useContext(CoordinatorContext)

  const toggleModal = () => {
    setToggle((isToggle) => !isToggle)
  }

  const onChange = (event) => {
    const { name, value } = event.target

    props.onChange(name, value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const { coordinatorName, company, contact, email, address, password } =
        props?.coordinator

      if (email && password) {
        const config = {
          coordinatorName,
          company,
          contact,
          address,
        }

        const userData = {
          name: coordinatorName,
          status: "coordinator",
        }

        await props.onAuth(email, password, config, userData)
      }

      setToggle(false)
    } catch (error) {
      console.log(error)
    }
  }

  //column example
  const columns = [
    {
      field: "id",
      headerName: "User Identification",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.id}</span>
      },
    },
    {
      field: "authId",
      headerName: "Auth Identification",
      width: 200,
      hide: true,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.id}</span>
      },
    },
    {
      field: "coordinatorName",
      headerName: "Coordinator Name",
      width: 200,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      type: "number",
      width: 150,
    },
    {
      field: "company",
      headerName: "Company Name",
      type: "string",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/admin/updateCoordinator?id=${params.row.id}`)
          }
        }

        return (
          <div className="space-x-4">
            <button
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
              onClick={Update}
            >
              Edit
            </button>
          </div>
        )
      },
    },
  ]

  const addModal = (
    <AddCoordinatorModal
      isToggle={isToggle}
      toggleModal={toggleModal}
      config={props}
      clearState={props.clearState}
      onSubmit={onSubmit}
      onChange={onChange}
      loading={props.loading}
    />
  )

  return (
    <Fragment>
      {addModal}
      <Layout title="Company Coordinator" description="a list of company coordinator data">
        <div className="flex justify-end my-4">
          <button
            onClick={toggleModal}
            className="bg-slate-900 rounded-lg flex items-center justify-center py-1.5 px-3 gap-2 text-white hover:bg-slate-600 transition-all"
          >
            <Plus size="18" />
          </button>
        </div>
        <Table data={fetchCoordinator} columns={columns} loading={false} />
      </Layout>
    </Fragment>
  )
}

const CustomCoordinator = () => {
  const CoordinatorHOC = FormHOC(initialState)(entity)(Coordinator)

  return <CoordinatorHOC />
}

export default CustomCoordinator
