import {
  Button,
  Col,
  Divider,
  Fieldset,
  Grid,
  Page,
  Row,
  Tag,
} from '@geist-ui/react'
import { GetStaticProps } from 'next'
import React from 'react'

interface HomeProps {
  chains: Chain[]
}

export const Home: React.FC<HomeProps> = ({ chains }) => {
  return (
    <>
      <div className="chainlist">
        <Page>
          <Page.Header translate>
            <h1>ChainList</h1>
          </Page.Header>
          <Divider translate />
          {/* <pre>{JSON.stringify(chains, null, 2)}</pre> */}
          <Grid.Container gap={2} className="network__container">
            {chains.map((chain: Chain) => (
              <Grid sm={12} xs={24}>
                <Fieldset className="network">
                  <Fieldset.Title translate className="network-title">
                    {chain.nativeCurrency?.symbol ?? ''}
                    <Tag type="lite" translate className="network-tag">
                      {chain.network}
                    </Tag>
                  </Fieldset.Title>
                  <Fieldset.Subtitle translate>
                    <Row translate>
                      <Col translate>
                        <p>{chain.name}</p>
                      </Col>

                      <Col translate>
                        <p>chainId: {chain.chainId}</p>
                      </Col>
                    </Row>
                  </Fieldset.Subtitle>
                  <Fieldset.Footer>
                    <Fieldset.Footer.Status translate>
                      <a
                        href={chain.infoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Site
                      </a>
                    </Fieldset.Footer.Status>
                    <Fieldset.Footer.Actions translate>
                      <Button auto size="mini">
                        Connect
                      </Button>
                    </Fieldset.Footer.Actions>
                  </Fieldset.Footer>
                </Fieldset>
              </Grid>
            ))}
          </Grid.Container>
        </Page>
      </div>
      <div className="test">
        <span>123</span>
      </div>
      <style jsx>
        {`
          .chainlist :global(.network) {
            width: 100%;
          }
          .chainlist :global(.network-title) {
            display: flex;
          }
          .chainlist :global(.network-tag) {
            margin-left: auto;
          }
        `}
      </style>
    </>
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
