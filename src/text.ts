export const capitalize = (s: string) =>
    `${s[0].toUpperCase()}${s.slice(1)}`

export const isEthereumAddress = (s: string) => 
    /^0x[a-fA-F0-9]{40}$/.test(s)

export const isBigNumber = (s: string) => 
    /^[-+]?[1-9]\d*$/.test(s)