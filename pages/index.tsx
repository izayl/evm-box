import {
  Divider,
  Grid,
  Page,
  Input,
} from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import { GetStaticProps } from 'next'
import { ChainItem } from '../common/components/ChainItem'

interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  return (
    <div className="chainlist">
      <Page>
        <Page.Header>
          <h2>Add Network</h2>
        </Page.Header>
        <Input width="100%" icon={<Search />} placeholder="Search Network" />
        <Divider />

        <Grid.Container gap={2} className="network__container">
          {chains.map((chain: Chain) => (
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
