import {
  Divider,
  Grid,
  Page,
  Input,
} from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import { GetStaticProps } from 'next'
import { FormEventHandler, useState } from 'react'
import debounce from 'lodash/debounce'
import { ChainItem } from '../common/components/ChainItem'

interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  const [filter, setFilter] = useState<Chain[]>(chains)

  const searchNetwork: FormEventHandler<HTMLInputElement> = (e) => {
    const searchContent = (e.target as HTMLInputElement).value.trim()
    console.log(searchContent, 's')
    if (!searchContent) {
      setFilter(chains)
    } else {
      const searchResult = filter.filter(chain => {
        const { name, shortName, chain: chainText, network } = chain
        return [name, shortName, chainText, network].map(item => item.toLowerCase()).some(item => item.indexOf(searchContent.toLowerCase()) > -1)
      })
      setFilter(searchResult)
    }
  }

  const debouncedSearch = debounce(searchNetwork, 500)

  const onSearch: FormEventHandler<HTMLInputElement> = (e) => {
    if (e.persist) {
      e.persist()
      debouncedSearch(e)
    } else {
      setFilter(chains)
    }
  }

  return (
    <div className="chainlist">
      <Page>
        <Page.Header>
          <h2>EVM Box</h2>
          <p>Use Your favorite EVM Compatible Network</p>
        </Page.Header>
        <Input width="100%" icon={<Search />} placeholder="Search Network" onChange={onSearch} clearable />
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
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async() => {
  try {
    const chains = await fetch(
      'https://chainid.network/chains.json',
    ).then(resp => resp.json())

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
