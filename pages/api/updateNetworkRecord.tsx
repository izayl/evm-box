import { format } from 'date-fns'

import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../common/database/client'

const updateNetworkRecord = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { chainId } = req.query

  const date = format(new Date(new Date().toUTCString()), 'yyyy-MM-dd')

  const { data, error } = await supabase.from('network_select').select('*').eq('chain_id', chainId).eq('date', date)

  if (error) return res.status(400).json({ data, error })

  const count = data?.reduce((prev, current) => prev + current.count, 0)
  if (!data?.length) {
    const newRecord = await supabase.from('network_select').insert([{
      chain_id: chainId, date, count: 0,
    }])

    if (newRecord.error) return res.status(500).json({ ...newRecord })
  }

  const result = await supabase.from('network_select').update({ count: count + 1 }).eq('chain_id', chainId).eq('date', date)

  if (result.error) return res.status(400).json({ ...result })

  return res.status(200).json({ data: 'success', error: null })
}

export default updateNetworkRecord
