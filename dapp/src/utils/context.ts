import { createContext } from 'react'

interface BaseData {
  minaAddress?: string,
  setMinaAddress?: (v: string) => void,
  EVMAddress?: string,
  setEVMAddress?: (v: string) => void,
  deployMinaAddress?: string,
  setDeployMinaAddress?: (v: string) => void,
}

const initialState: BaseData = {
  minaAddress: '',
  EVMAddress: '',
  deployMinaAddress: '',
}


const BaseCtx = createContext(initialState);

export default BaseCtx;
