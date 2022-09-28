import {
  FormEventHandler,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react"
import Router,{useRouter} from "next/router"
import { app, database } from "../firebaseConfig"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

import Head from "next/head"
import Image from "next/image"
import type { NextPage } from "next"
import iconImg from "../assets/icon-black.png"
import style from "../styles/bg.module.css"

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [formState, setFormState] = useState({
    email: { validate: false, text: "Please input Email" },
    password: { validate: false, text: "Please input password" },
  })
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const auth = getAuth(app)

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value // typechecks!
    const password = target.password.value

    if (email.includes("@")) {
      console.log(true)
    }
    // signOut(auth)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        if (user.email) {
          // localStorage.setItem("user", user.email)
          // router.replace('/')
          // alert('login success')
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage);
        
      })
  }

  return (
    <div className={`${style.header} m-0 h-wave  `} >
      <div>
        <div className="flex inner-header justify-center items-center text-center">
          <div className="mt-12">
            <Image src={iconImg} layout="responsive" alt="POD" />
            <h1 className=" text-4xl">POD</h1>

            <div className="w-full max-w-xs mt-6">
              <form
                onSubmit={onSubmit}
                className=" bg-[#F5DEB3] shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 text-left "
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    defaultValue={'pokket.1@gmail.com'}
                    className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    // required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 text-left"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                         defaultValue={'123456'}
                    className="shadow solid border-solid appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    // required
                    placeholder="******************"
                  />

                  {formState.email.validate ||
                    (formState.password.validate && (
                      <p className="text-red-500 text-xs italic">
                        {formState.email.validate &&
                          "Please choose a password ."}{" "}
                        <br />
                        {formState.password.validate &&
                          "Please choose a password ."}
                      </p>
                    ))}
                </div>
                <div className="flex items-center  justify-center">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a> */}
                </div>
              </form>
              <p className="text-center text-gray-500 text-xs">
                &copy2022 AAPICO HITECH. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full ">
        <svg
          className={style.waves + " absolute bottom-0 left-0"}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={style.parallax}>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
    // </div>
  )
}

export default LoginPage
