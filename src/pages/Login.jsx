import React, { useContext, useState, Fragment } from "react"
import { AuthContext } from "context/auth"
import { Card } from "components"
import { Navigate } from "react-router-dom"
import { ChevronLeft } from "react-feather"

//Higher order component
import { FormHOC } from "HOC"

const initialState = {
  email: "",
  password: "",
}

function Login(props) {
  const [isClick, setIsClick] = useState(false)
  const context = useContext(AuthContext)

  const onChange = (event) => {
    const { name, value } = event.target
    props.onChange(name, value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    props.onSubmit()
  }

  if (context) {
    return <Navigate to="/admin" />
  }

  const loginLabel = ["Admin", "Company Coordinator", "Student"]

  const loginBy = (
    <div className="z-10">
      <h2 className="font-bold text-white z-12 mb-14 text-center">OJT Monitoring System for PHINMA UI</h2>
      <h1 className="font-bold text-white z-10 mb-14 text-center">Login as </h1>
      <div className=" flex items-center justify-center gap-8">
        {loginLabel.map((el) => {
          return (
            <div
              key={el}
              onClick={() => setIsClick(true)}
              className="flex items-center justify-center bg-slate-900 text-white ring-4 rounded-sm z-10 h-48 w-60 cursor-pointer transition-all hover:-translate-y-1 shadow-lg"
            >
              <span className="font-bold text-lg">{el}</span>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <section className="flex h-screen">
      <div className="m-auto">
        <div
          className="bg-no-repeat bg-cover bg-center relative w-screen h-screen"
          style={{
            backgroundImage:
              "url(https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/309256908_466872748814653_2590235963283915048_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeHHQZbkjRgFl1SIHSGRpH98pBZhM65D9jOkFmEzrkP2M0vzUPeBEeQ_GHi3sBuLHgXxcp8Dq5-zZFsHVB0b2OtV&_nc_ohc=Hc95Hn1H9jwAX-kKRyu&_nc_oc=AQkoixgVA5Wj_NOerbpGAGKys4y5lj4pW6flNI13cLBx-kIEyY8IKjXYtREra-AN_L8&_nc_ht=scontent.fceb6-1.fna&oh=00_AfAFVg5MAvUZ8F4ZbQMvBeBRmZ0BHCJDqpjEtGhf99SV_Q&oe=642CD622)",
          }}
        >
          <div className="absolute bg-gradient-to-b from-gray-800 to-gray-800 opacity-75 inset-0 z-0"></div>
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center items-center">
            {!isClick ? (
              loginBy
            ) : (
              <Fragment>
                <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
                  <div className="self-start hidden lg:flex flex-col  text-white">
                    <h1 className="mb-3 font-bold text-5xl">
                      Hi! Welcome Back{" "}
                    </h1>
                    <p className="pr-3">
                      This system will easily tracks all interns task and
                      informations, by using of this website it will be easily
                      to handle all of the interns profile
                    </p>
                  </div>
                </div>
                <Card
                  padding="p-12"
                  additionalStyle="flex justify-center self-center z-40"
                >
                  <span
                    onClick={() => setIsClick(false)}
                    className="font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft size="20" />
                    Back
                  </span>
                  <div className="my-4">
                    <h3 className="font-semibold text-2xl text-gray-800">
                      Sign In{" "}
                    </h3>
                    <p className="text-gray-500">
                      Please sign in to your account.
                    </p>
                  </div>
                  <form
                    className="space-y-8"
                    onSubmit={onSubmit}
                    onChange={(event) => onChange(event)}
                  >
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 tracking-wide">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                          name="email"
                          placeholder="mail@gmail.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                          name="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-end">
                <div className="text-sm">
                  <span className="text-green-400 hover:text-green-500 hover:underline cursor-pointer">
                    Forgot your password?
                  </span>
                </div>
              </div> */}
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-gray-400  hover:bg-gray-500 text-gray-100 py-2 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                  <div className="pt-5 text-center text-gray-400 text-md">
                    {/* <span>
                  Don't have an account ?
                  <span className="text-green hover:text-gray-500 ml-1 cursor-pointer hover:underline">
                    Sign In
                  </span>
                </span> */}
                  </div>
                </Card>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const LoginHOC = () => {
  const entity = { componentName: "Login" }
  const UpdatedComponent = FormHOC(initialState)(entity)(Login)

  return <UpdatedComponent />
}

export default LoginHOC
