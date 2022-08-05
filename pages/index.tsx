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
import { app, database } from "../firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import Head from "next/head";
import Header from "../components/Layout";
import Image from "next/image";
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

const MaterialReactTable = React.lazy(() => import('material-react-table'));
const Home: NextPageWithLayout = () => {
  // const { t } = useTranslation('common');
  const [test, setTest, t, i18n] = useContext(AuthUserContext);

  const [state, setState] = useContext(StateContext);
  const auth = getAuth(app);
  useEffect(() => {
    setState({ test: "123isdkofhdsf" });
  }, []);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const taskRef = collection(database, "Tasks");
    // const docRef = doc(database, "Tasks");

    console.log(taskRef);

    const docSnap = await getDocs(taskRef);

    // docSnap.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
  };
  const router = useRouter();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
      },
      {
        accessorFn: (row: { age: any,name : any }) => row.age + row.name, //alternate way
        id: "age", //id required if you use accessorFn instead of accessorKey
        header: "Age",
        Header: <i style={{ color: "red" }}>Age</i>, //optional custom markup
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        name: "John",
        age: 30,
      },
      {
        name: "Sara",
        age: 25,
      },
    ],
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
      <div className="p-4">
        <MaterialReactTable
          //@ts-ignored
          columns={columns}
          data={data}
          enableColumnOrdering //enable some features
          enableRowSelection
          enableStickyHeader
          onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
          state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
        />
      </div>
    </div>

    // </CreateProvider>
  );
};
// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
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
