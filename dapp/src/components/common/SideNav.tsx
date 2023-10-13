import { FC, useMemo, useContext } from "react";
import * as U from '@/utils'
import BaseCtx from "@/utils/context";
import { useRouter } from "next/router";

type Props = {
  page: U.T.Page
}

const SideNav: FC<Props> = ({ page }) => {

  const router = useRouter()

  return (
    <div className="w-[300px] flex flex-col justify-start h-[100vh] pt-[10rem]">
      <div
        className={`${page === 'deploy' ? 'text-[30px] text-r-medium' : 'text-[20px] text-r-regular'} mb-4 cursor-pointer hover:text-[30px]`}
        onClick={() => {
          router.push('/deploy')
        }}
      >Deploy</div>
      <div
        className={`${page === 'zk proof' ? 'text-[30px] text-r-medium' : 'text-[20px] text-r-regular'} mb-4 cursor-pointer hover:text-[30px]`}
        onClick={() => {
          router.push('/zk-proof')
        }}
      >ZK Proof</div>
      <div
        className={`${page === 'dashboard' ? 'text-[30px] text-r-medium' : 'text-[20px] text-r-regular'} mb-4 cursor-pointer hover:text-[30px]`}
        onClick={() => {
          router.push('/dashboard')
        }}
      >Dashboard</div>
    </div>
  )
}

export default SideNav