import * as C from './constant'

export const formatAddress = (address: string | undefined | null): string => {
  if (!address) {
    return ''
  }
  const str_1 = address.substring(0, 5)
  const str_2 = address.substring(address.length - 6)
  return `${str_1}......${str_2}`
}

export const calculationSingleLevel = (score: number) => {
  if (score === 0) {
    return 0
  }
  return C.MIN_LEVEL.findIndex(v => score < v) + 1
}

export const calculationSinglePercent = (score: number) => {
  if (score === 0) {
    return 0;
  }

  const idx = C.MIN_LEVEL.findIndex((v, index) => score <= v || index === C.MIN_LEVEL.length - 1);
  const nextLevel = C.MIN_LEVEL[idx + 1] || C.MIN_LEVEL[0];

  return parseInt((C.MIN_LEVEL[idx] / nextLevel * 100) + '');
};