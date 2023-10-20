import { FC, ReactNode } from "react";
import Head from 'next/head';
import * as U from '@/utils'
import Header from "./Header";
import SideNav from "./SideNav";

type TDK = {
  title?: string,
  keywords?: string,
  description?: string
}

type Props = {
  tdk?: TDK,
  children: ReactNode,
  header?: boolean,
  sideNav?: boolean,
  page: U.T.Page
}

const Base: FC<Props> = ({ tdk, children, header = true, sideNav = true, page }) => {

  return (
    <div className="w-full">
      <Head>
        <title>{tdk?.title || U.C.WEB_TITLE}</title>
        <meta name="description" content={tdk?.description || U.C.WEB_DESCRIPTION} />
      </Head>
      <div>
        {header && <Header />}
        <div className="flex justify-start px-[6.25rem] pb-[100px]">
          {sideNav && <SideNav page={page} />}
          {children}
        </div>
      </div>
    </div>
  )
}

export default Base;