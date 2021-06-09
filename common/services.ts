import { format } from 'date-fns'
import fetch from 'isomorphic-fetch'

const API_PREFIX = process.env.NODE_ENV === 'production' ? 'https://networks.tokenlon.info' : 'http://localhost:3000'

const fetchAPI = async(input: RequestInfo) => {
  try {
    const resp = await fetch(input)
    return resp.json()
  } catch (error) {
    console.error(error)
  }
}

export const getOriginChains = async() => await fetchAPI('https://chainid.network/chains.json')

export const getNetworkRecords = async() => await fetchAPI(`${API_PREFIX}/api/getDailyRecord?date=${format(new Date(new Date().toUTCString()), 'yyyy-MM-dd')}`).then(resp => resp.data)

export const updateNetworkRecord = async(chainId: number | string) => await fetchAPI(`${API_PREFIX}/api/updateNetworkRecord?chainId=${chainId}`).then(resp => resp.data)
