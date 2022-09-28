import "../styles/globals.css";

import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Router, { useRouter } from "next/router";
import { appWithTranslation, useTranslation } from "next-i18next";

import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import LoginPage from "./login";
import { NextPage } from "next";
import { app } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface authContextInterface {
  authUser?: string | null;
  loading: boolean;
}
interface stateInterface {
  test?: string | null;
}
export const AuthUserContext = createContext<
  [authContextInterface, any]
>([{ authUser: null, loading: true }, () => {}]);

export const StateContext = createContext<[stateInterface, any]>([
  {},
  () => {},
]);

const CreateProvider = ({ children }: any) => {
  // const [user, setUser] = useState<authContextInterface>({
  //   loading: true,
  //   authUser: null,
  // });

  const [user, setUser] = useState<authContextInterface>(() => {
    const auth = getAuth(app);
      if(auth.currentUser?.email){
        return {
          loading: false,
          authUser: auth.currentUser?.email,
        };
      }
    return {
      loading: true,
      authUser: null,
    };
  });

  const router = useRouter();
  const [state, setState] = useState<stateInterface>({
    test: null,
  });
  useEffect(() => {
    let isMounted = true;
    const getUser = async () => {
      const auth = getAuth(app);
      auth.onAuthStateChanged((fireAuth) => {
        if (fireAuth?.email != null) {
          setUser({ authUser: fireAuth.email, loading: false });
          // setLoading(false);
          if (router.pathname === "/login") {
            router.replace("/");
          }
          // router.push('/')
        } else {
          setUser({ authUser: null, loading: false });

          // router.push("/login")
        }
      });
    };
    getUser();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    if (!user.loading && user.authUser === null) {
      router.replace("/login");
    }
  }, [user.loading]);

  const { t, i18n } = useTranslation("common");


  return (
    <AuthUserContext.Provider value={[user, setUser]}>
      <Head>
        <title>POD</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user.loading ||
      (!user.loading &&
        router.pathname === "/login" &&
        user.authUser !== null) ? (
        <div>loading</div>
      ) : !user.loading && user.authUser === null ? (
        <LoginPage />
      ) : (
        <StateContext.Provider value={[state, setState]}>
          <Layout>{children}</Layout>
        </StateContext.Provider>
      )}
    </AuthUserContext.Provider>
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
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CreateProvider>
      <Component {...pageProps} />
    </CreateProvider>
  );
}
// @ts-ignored
export default appWithTranslation(MyApp);
