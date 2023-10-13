export const formatAddress = (address: string | undefined | null): string => {
  if (!address) {
    return ''
  }
  const str_1 = address.substring(0, 5)
  const str_2 = address.substring(address.length - 6)
  return `${ str_1 }......${ str_2 }`
}