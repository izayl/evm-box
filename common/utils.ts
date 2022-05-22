export const mergeNetworkConfig = (
  initial: Chain[],
  custom: Array<AtLeastOne<Chain, 'chainId'>>,
): Chain[] => {
  return initial.map(item => {
    const customItem = custom.find(c => c.chainId === item.chainId)

    if (customItem) return Object.assign({}, item, customItem)

    return item
  })
}

const hexToRgb = (color: string): [number, number, number] => {
  const fullReg = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const full = color.replace(fullReg, (_, r, g, b) => `${r}${r}${g}${g}${b}${b}`)
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(full)
  if (!values) {
    throw new Error(`Geist UI: Unsupported ${color} color.`)
  }
  return [
    Number.parseInt(values[1], 16),
    Number.parseInt(values[2], 16),
    Number.parseInt(values[3], 16),
  ]
}

export const colorToRgbValues = (color: string) => {
  if (color.charAt(0) === '#') return hexToRgb(color)

  const safeColor = color.replace(/ /g, '')
  const colorType = color.substr(0, 4)

  const regArray = safeColor.match(/\((.+)\)/)
  if (!colorType.startsWith('rgb') || !regArray) {
    console.log(color)
    throw new Error('Geist UI: Only support ["RGB", "RGBA", "HEX"] color.')
  }

  return regArray[1].split(',').map(str => Number.parseFloat(str))
}

export const addColorAlpha = (color: string, alpha: number) => {
  if (!/^#|rgb|RGB/.test(color)) return color
  const [r, g, b] = colorToRgbValues(color)
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}

/**
 * ETH Address Truncate
 * @param address string ETH Address
 * @param reserve number truncate reserve on both left and right
 *
 * @example
 * const addr = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
 * const truncatedAddr = truncateAddress(addr)
 * // 0xd8da...6045
 */
export const truncateAddress = (address: string | undefined, reserve = 4): string => {
  if (!address) return ''
  const left = address.substring(0, 2 + reserve)
  const right = address.substring(address.length - reserve)

  return `${left}...${right}`
}
