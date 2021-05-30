import { Divider, Grid, Page, Input } from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import { GetStaticProps } from 'next'
import { FormEventHandler, useState } from 'react'
import debounce from 'lodash/debounce'
import { GithubCorner, ChainItem, SearchRecommend } from '../common/components'

interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  const [filter, setFilter] = useState<Chain[]>(chains)
  const [searchFocused, setSearchFocused] = useState(false)

  const searchNetwork: FormEventHandler<HTMLInputElement> = e => {
    const searchContent = (e.target as HTMLInputElement).value.trim()
    console.log(searchContent, 's')
    if (!searchContent) {
      setFilter(chains)
    } else {
      const searchResult = filter.filter(chain => {
        const { name, shortName, chain: chainText, network, networkId } = chain
        return [name, shortName, chainText, network, networkId.toString()]
          .map(item => item.toLowerCase())
          .some(item => item.indexOf(searchContent.toLowerCase()) > -1)
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
            <h2>EVM Box</h2>
            <p>Use Your favorite EVM Compatible Network</p>
          </Page.Header>
          <Input
            width="100%"
            placeholder="Search Network by name, symbol or chainId"
            icon={<Search />}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={onSearch}
            clearable
          />
          {!searchFocused && <SearchRecommend chains={chains} />}
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
    const chains = await fetch('https://chainid.network/chains.json').then(
      resp => resp.json(),
    )

    return {
      props: {
        chains,
      },
    }
  } catch (error) {
    return {
      props: {
        chains: [],
      },
    }
  }
}
