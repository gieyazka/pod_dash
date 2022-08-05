import Link from "next/link";
import { TbReportAnalytics } from "react-icons/tb";
import { Tooltip } from "./tooltip";
import { motion } from "framer-motion";

export const MenuItem = ({ open, label, children }: any) => {
  return (
    <>
      {open ? (
        <Link href={"/"}>
          <div className="flex py-4 pl-5 mr-auto items-center  min-w-[calc(100%-1.25rem)]   cursor-pointer hover:bg-gray-400">
            {children}
            {open && <label>&nbsp;{label}</label>}
          </div>
        </Link>
      ) : (
        <Tooltip message="Dashboard">
          <Link href={"/"}>
            <div className="flex py-4  pl-5 mr-auto  items-center w-[calc(100%-calc(1.25rem))]   cursor-pointer  hover:bg-gray-400">
              <TbReportAnalytics className=" " size="24" />
            </div>
          </Link>
        </Tooltip>
      )}
    </>
  );
};
