import { Fieldset, Tag, Row, Col, Button } from '@geist-ui/react'
import classnames from 'classnames'
import { useChain } from '../hooks/useChain'
import { useDApp } from '../hooks/useDApp'

interface IChainItemProps {
  chain: Chain
}

export const ChainItem: React.FC<IChainItemProps> = ({ chain }) => {
  const enable = useDApp()
  const [currentChainId, addEthChain] = useChain()
  return (
    <>
      <Fieldset className={classnames('chain', { current: currentChainId === chain.chainId })}>
        <Fieldset.Title className="chain-title">
          {/* {chain.nativeCurrency?.symbol ?? ''} */}
          {chain.chain}
          <Tag type="lite" className="chain-tag">
            {chain.network}
          </Tag>
        </Fieldset.Title>
        <Fieldset.Subtitle>
          <Row>
            <Col>
              <p>{chain.name}</p>
            </Col>

            <Col>
              <p>chainId: {chain.chainId}</p>
            </Col>
          </Row>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            <a
              href={chain.infoURL}
              target="_blank"
              rel="noopener noreferrer"
            >
            Official Site
            </a>
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            {
              currentChainId === chain.chainId
                ? 'current network'
                : enable && (
                  <Button type="secondary" ghost size="mini" onClick={() => addEthChain(chain)}>
                  Add
                  </Button>
                )
            }
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
      <style jsx>
        {`
          :global(.chain) {
            width: 100%;
          }

          :global(.current .content) {
            background: antiquewhite;
          }
          :global(.chain-title) {
            display: flex !important;
          }
          :global(.chain-tag) {
            margin-left: auto;
          }
        `}
      </style>
    </>
  )
}
