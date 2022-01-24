import { Divider, Grid, Page, Input } from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import { GetStaticProps } from 'next'
import { FormEventHandler, useState } from 'react'
import debounce from 'lodash/debounce'
import { orderBy } from 'lodash'
import { GithubCorner, ChainItem } from '../common/components'
import { getNetworkRecords, getOriginChains } from '../common/services'
import { CUSTOM_NETWORKS } from '../common/custom-networks'
import { mergeNetworkConfig } from '../common/utils'
import { useLocale } from '../common/hooks/useLocale'
interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  const [filter, setFilter] = useState<Chain[]>(chains)
  const t = useLocale()

  const searchNetwork: FormEventHandler<HTMLInputElement> = e => {
    const searchContent = (e.target as HTMLInputElement).value.trim()

    if (!searchContent) {
      setFilter(chains)
    } else {
      const searchResult = chains.filter(chain => {
        const { name, shortName, chain: chainText, network, networkId } = chain
        return [name, shortName, chainText, network, networkId.toString()]
          .filter(Boolean)
          .map(item => item.toLowerCase())
          .some(item => item.includes(searchContent.toLowerCase()))
      })
      setFilter(searchResult)
    }
  }

  const debouncedSearch = debounce(searchNetwork, 500)

  const onSearch: FormEventHandler<HTMLInputElement> = e => {
    if (e.persist) {
      e.persist()
      debouncedSearch(e)
    } else {
      setFilter(chains)
    }
  }

  return (
    <>
      <GithubCorner />
      <div className="chainlist">
        <Page>
          <Page.Header>
            <h2>{t('AppName')}</h2>
            <p>{t('AppDesc')}</p>
          </Page.Header>
          <Input
            width="100%"
            placeholder={t('SearchPlaceholder')}
            icon={<Search />}
            onChange={onSearch}
            clearable
          />
          <Divider />

          <Grid.Container gap={2} className="network__container">
            {filter.map((chain: Chain) => (
              <Grid sm={12} xs={24} key={chain.chainId}>
                <ChainItem chain={chain} />
              </Grid>
            ))}
          </Grid.Container>
        </Page>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async() => {
  try {
    const [originChains, counts] = await Promise.all([
      getOriginChains(),
      getNetworkRecords(),
    ])

    const chains = mergeNetworkConfig(originChains, CUSTOM_NETWORKS)

    chains.forEach((chain: Chain) => {
      if (counts[chain.chainId]) chain.selectCounts = counts[chain.chainId]
    })

    return {
      props: {
        chains: orderBy(chains, ['selectCounts']),
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in 1 day
      revalidate: 1 * 60 * 60 * 24,
    }
  } catch (error) {
    console.error('getStaticProps failed', error)
    return {
      props: {
        chains: [],
      },
    }
  }
}
