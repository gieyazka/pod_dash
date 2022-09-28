import { AuthUserContext, NextPageWithLayout, StateContext } from "./_app";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { app, database } from "../firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import Head from "next/head";
import Header from "../components/Layout";
import Image from "next/image";
import { JobDetail } from "../type/job";
import { KyTable } from "../components/table";
import Link from "next/link";
// import  MaterialReactTable from "material-react-table";
import type { NextPage } from "next";
import React from "react";
import TestPage from "./test";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import style from "../styles/bg.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// const MaterialReactTable = React.lazy(() => import('material-react-table'));

export const paresesDate = (date: Date) => {
  return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+" "+date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes()+":"+(date.getSeconds()<10?'0':'') + date.getSeconds();
  
};

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const [test, setTest] = useContext(AuthUserContext);
  // console.log(t);

  const [state, setState] = useContext(StateContext);
  const [jobDetail, setJobDetail] = useState<JobDetail[]>();
  const [column, setColum] = useState<MRT_ColumnDef<JobDetail>[]>();
  const auth = getAuth(app);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const taskRef = collection(database, "Tasks");
    const docSnap = await getDocs(taskRef);
    let docArr: JobDetail[] = new Array<JobDetail>();
    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docArr.push({
        id: doc.id,
        ...doc.data(),
      });
      // console.log(doc.id, " => ",doc.data().scheduled , 'timeStamp',doc.data().timeStamp);
    });
    // var date = new Date(doc.data().timestamp.second * 1000);
    console.log(docArr.find((d) => d.id === "ygHjr3Ri3c9wzbEizWEQ"));

    setJobDetail(docArr);
  };
  const router = useRouter();

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "id",
          header: "DOC ID",
        },
        {
          accessorKey: "jobName",
          header: "Job Name",
        },
        {
          accessorKey: "status",
          header: "Status",
        },
        {
          accessorKey: "workStatus",
          header: "Work Status",
        },
        {
          accessorKey: "email",
          header: "Email",
        },
        {
          accessorFn: (row) => {
        
            if (row.timeStamp) {
              return paresesDate(new Date(row.timeStamp.seconds * 1000));
            }
            return undefined;
          },
          id: "create_Date",
          header: "Create Date",
          Cell: ({ cell }) => {
            //@ts-ignored
            return <div>{cell.getValue()}</div>;
          },
        },
        {
          accessorFn: (row) => {
        
            if (row.scheduled) {
              return paresesDate(new Date(row.scheduled.seconds * 1000));
            }
            return undefined;
          },
          id: "Date",
          header: "Date",
          Cell: ({ cell }) => {
            //@ts-ignored
            return <div>{cell.getValue()}</div>;
          },
        },
      ] as MRT_ColumnDef<JobDetail>[],
    []
  );


  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  return (
    // <CreateProvider>

    <div>
      {/* <Header /> */}
      <Link href="/" locale={router.locale === "en" ? "th" : "en"}>
        <button>
          {t("change-locale", {
            changeTo: router.locale === "en" ? "th" : "en",
          })}
        </button>
      </Link>
      wowza
      <button onClick={() => signOut(auth)}> {t("hello")}</button>
      <Link href={"/test"}>
        <button>Link</button>
      </Link>
      <div className="p-4 ">
        {jobDetail && (
          <MaterialReactTable columns={columns} data={jobDetail!} />
          // <KyTable columns={columns} data={jobDetail}/>
        )}
        {/* {jobDetail && (
          <KyTable columns={columns} data={jobDetail}/>
        )} */}
      </div>
    </div>

    // </CreateProvider>
  );
};
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
// Home.getLayout = function getLayout(page: ReactElement) {
//   console.log(page);

//   return (
//     <div>
//       <Header />
//       {page}

//     </div>
//   )
// }
export default Home;
