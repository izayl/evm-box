import { format, isValid, subDays } from 'date-fns'
import { groupBy, reduce, sumBy } from 'lodash'

import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../common/database/client'

const getDailyRecord = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  let { date } = req.query

  if (Array.isArray(date)) date = date[0]

  if (!isValid(new Date(date))) return res.status(400).json({ data: null, error: 'bad date format' })

  const threeDayAge = format(subDays(new Date(date), 3), 'yyyy-MM-dd')

  const { data, error } = await supabase.from('network_select').select('*').gt('date', threeDayAge)

  if (error) return res.status(400).json({ data, error })

  console.log({ data })

  const group = groupBy(data, 'network_id')

  const result = reduce(group, (prev, current, key) => ({ ...prev, [key]: sumBy(current, 'count') }), {})

  return res.status(200).json({ data: result, error: null })
}

export default getDailyRecord
