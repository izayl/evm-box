import { Fieldset, Tag, Row, Col, Button } from '@geist-ui/react'
import classnames from 'classnames'
import { useChain } from '../hooks/useChain'
import { useDApp } from '../hooks/useDApp'
import { useLocale } from '../hooks/useLocale'

interface IChainItemProps {
  chain: Chain
}

export const ChainItem: React.FC<IChainItemProps> = ({ chain }) => {
  const enable = useDApp()
  const [currentChainId, switchEthChain] = useChain()
  const t = useLocale()
  const networkLabel =
    chain.faucets && chain.faucets.length ? 'Testnet' : 'Mainnet'

  return (
    <>
      <Fieldset
        className={classnames('chain', {
          current: currentChainId === chain.chainId,
        })}
      >
        <Fieldset.Title className="chain-title">
          {/* {chain.nativeCurrency?.symbol ?? ''} */}
          {chain.chain}
          <Tag type="lite" className="chain-tag">
            {networkLabel}
          </Tag>
        </Fieldset.Title>
        <Fieldset.Subtitle>
          <Row>
            <Col>
              <p style={{ whiteSpace: 'nowrap' }}>{chain.name}</p>
            </Col>

            <Col>
              <p style={{ textAlign: 'right' }}>chainId: {chain.chainId}</p>
            </Col>
          </Row>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            <a href={chain.infoURL} target="_blank" rel="noopener noreferrer">
              {t('OfficialSite')}
            </a>
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            {currentChainId === chain.chainId
              ? 'current network'
              : enable && (
                <Button
                  type="secondary"
                  ghost
                  size="mini"
                  onClick={() => switchEthChain(chain)}
                >
                  {t('Switch')}
                </Button>
              )}
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
