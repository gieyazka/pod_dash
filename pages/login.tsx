import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import style from "../styles/bg.module.css";

const LoginPage: NextPage = () => {
  return (
    <div className={`${style.header} m-0 h-screen `}>
      <div >
        <div className="grid grid-cols-1 gap-y-1 inner-header justify-center items-center text-center flex">
          <div className="">
            <h1>POD</h1>
          </div>

          <div className="">
            <h2>Comming soon</h2>
          </div>
        </div>
        </div>
     
        <div className="absolute bottom-0 w-full ">
          <svg
            className={style.waves + " absolute bottom-0" }
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
  );
};

export default LoginPage;
