import { format } from 'date-fns'

import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../common/database/client'

const updateNetworkRecord = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { networkId } = req.query

  const date = format(new Date(new Date().toUTCString()), 'yyyy-MM-dd')

  const { data, error } = await supabase.from('network_select').select('*').eq('network_id', networkId).eq('date', date)

  if (error) return res.status(400).json({ data, error })
  console.log({ data, error })

  const count = data?.reduce((prev, current) => prev + current.count, 0)

  const result = await supabase.from('network_select').update({ count: count + 1 }).eq('network_id', networkId).eq('date', date)

  if (result.error) return res.status(400).json({ ...result })

  return res.status(200).json({ data: 'success', error: null })
}

export default updateNetworkRecord
