import { format, subDays } from 'date-fns'
import fetch from 'isomorphic-fetch'
import { groupBy, reduce, sumBy } from 'lodash'
import { supabase } from './database/client'

const fetchAPI = async(input: RequestInfo) => {
  try {
    const resp = await fetch(input)
    return resp.json()
  } catch (error) {
    console.error(error)
  }
}

export const getOriginChains = async() => await fetchAPI('https://chainid.network/chains.json')

export const getNetworkRecords = async(): Promise<Record<number, number>> => {
  const date = format(new Date(new Date().toUTCString()), 'yyyy-MM-dd')

  const threeDayAge = format(subDays(new Date(date), 3), 'yyyy-MM-dd')

  const { data, error } = await supabase.from('network_select').select('*').gt('date', threeDayAge)

  if (error) return {}

  const group = groupBy(data, 'chain_id')

  const result = reduce(group, (prev, current, key) => ({ ...prev, [key]: sumBy(current, 'count') }), {})

  return result
}

export const updateNetworkRecord = async(chainId: number | string) => await fetchAPI(`/api/updateNetworkRecord?chainId=${chainId}`).then(resp => resp.data)
