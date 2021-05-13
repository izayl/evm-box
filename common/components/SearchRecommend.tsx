import { Tag, Grid } from '@geist-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { EVM_BOX_PERSIST } from '../constants'
import { useChain } from '../hooks/useChain'

const ChainIdMap = {
  BSC: '56',
  HECO: '128',
  xDAI: '100',
  FTM: '250',
}
const DEFAULT_RECOMMEND = [
  ChainIdMap.BSC,
  ChainIdMap.FTM,
  ChainIdMap.HECO,
  // ChainIdMap.xDAI,
]

export const useRecommend = (chains: Chain[]): Chain[] => {
  const [recommends, setRecommends] = useState<Array<number | string>>(DEFAULT_RECOMMEND)
  const recommendChains = useMemo(() => {
    return recommends.map(item => chains.find(chain => String(chain.chainId) === item)).filter(Boolean)
  }, [recommends])

  useEffect(() => {
    const prevSelect = window.localStorage.getItem(EVM_BOX_PERSIST) || ''

    setRecommends([...prevSelect.split(','), ...DEFAULT_RECOMMEND])
  }, [])

  return recommendChains as Chain[]
}

export const SearchRecommend: React.FC<{ chains: Chain[] }> = ({ chains }) => {
  const recommends = useRecommend(chains)
  const [, addEthChain] = useChain()

  return (
    <div className="search-recommends">
      <Grid.Container gap={2}>
        <Grid>
          <span>{recommends.length > DEFAULT_RECOMMEND.length ? 'Recent' : 'HOT'}: </span>
        </Grid>
        {
          recommends.filter(Boolean).splice(0, 2).map((chain: Chain) => (
            <Grid key={chain.chainId}>
              <Tag type="success" onClick={() => addEthChain(chain)} >{chain.chain}({chain.network})</Tag>
            </Grid>),
          )
        }
      </Grid.Container>
      <style jsx>{`
        .search-recommends {
          margin-top: calc(15.25pt + 1px * 0);
        }
      `}</style>
    </div>
  )
}
