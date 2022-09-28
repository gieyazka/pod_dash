import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useContext, useRef, useState } from "react";
import { app, database } from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

import { AiOutlineLogout } from "react-icons/ai";
import { AuthUserContext } from "../pages/_app";
import { Hamburger } from "./hambergerIcon.js";
import Link from "next/link";
import { MenuItem } from "./menuItem";
import { TbReportAnalytics } from "react-icons/tb";
import { Tooltip } from "./tooltip";
import { useRouter } from "next/router";

// import { TbReportAnalytics } from 'react-icons/';

const Header = ({ open, headSize }: any) => {
  const [user, setUser] = useContext(AuthUserContext);
  const domRef = useRef<any>();
  const router = useRouter();
  const logout = () => {
    signOut(auth);
    setUser({ ...user, authUSer: null });
    router.replace("/login");
  };

  const auth = getAuth(app);
  return (
    <motion.div
      // style={{width: `calc(100vw - ${headSize})`}}
      initial={{
        width: `calc(100vw - ${"64px"})`,
      }}
      animate={{
        
        width: `calc(100vw - ${headSize})`,
        maxWidth: `calc(100vw - ${headSize})`,
      }}
    >
      <motion.div
        className={`flex bg-red-400 items-center    justify-between `}
      >
        <p className="ml-4 text-lg">App Name</p>
        <div
          className="flex items-center mr-4 cursor-pointer"
          onClick={() => logout()}
        >
          <AiOutlineLogout size={32} className="mr-1 " /> Logout
        </div>
      </motion.div>
    </motion.div>
  );
};

const Sidebar = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const openWidth = open ? "192px" : "64px";
  return (
    <div className="flex max-h-screen ">
      <motion.div
        className={` h-screen bg-orange-600
      } flex flex-col `}
        initial={{ width: '64px', }}

        animate={{
          maxWidth: openWidth,
          width : openWidth
        }}
      >
        {/* <AnimatePresence> */}

        <Hamburger
          onClick={() => setOpen(!open)}
          className={`mt-6 mb-6  ml-auto mr-2  cursor-pointer ${open && ""} `}
          open={open}
          color="black"
          size={24}
        />
        {/* </AnimatePresence> */}
        <MenuItem open={open} label={"Dashboard"}>
          <TbReportAnalytics size="24" />
        </MenuItem>
        {/* <p>Dashboard</p> */}
        {/* <p>asdsads</p> */}
      </motion.div>
      <div>
        <div className={`flex flex-col  w`}>
          <Header open={open} headSize={openWidth} />
          <div
            style={{
              // here
              maxWidth: `calc(100vw - ${openWidth}) `,
              maxHeight: `calc(100vh - 64px)`,
            //   width: `calc(100vw - ${openWidth}) `,
            //  height: `calc(100vh - 64px)`,
              // here
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
const Layout = ({ children }: any) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Layout;
