import { Fieldset, Grid, Button } from '@geist-ui/react'
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

  return (
    <>
      <Fieldset
        className={classnames('chain', {
          current: currentChainId === chain.chainId,
        })}
      >
        <Fieldset.Title className="chain-title">
          {/* {chain.nativeCurrency?.symbol ?? ''} */}
          {chain.name}
        </Fieldset.Title>
        <Fieldset.Subtitle>
          <Grid.Container justify="space-between">
            <Grid>
              <p style={{ whiteSpace: 'nowrap' }}>{chain.chain}</p>
            </Grid>

            <Grid>
              <p style={{ textAlign: 'right' }}>chainId: {chain.chainId}</p>
            </Grid>
          </Grid.Container>
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <div className="status">
            <Grid.Container gap={2}>
              <Grid>
                <a href={chain.infoURL} target="_blank" rel="noopener noreferrer">
                  {t('OfficialSite')}
                </a>
              </Grid>
              {
                chain.faucets.slice(0, 2).map((faucet) => <Grid key={faucet}><a href={faucet} target="_blank" rel="noopener noreferrer"> {t('Faucet')} </a></Grid>)
              }
            </Grid.Container>
          </div>
          <div className="actions">
            {currentChainId === chain.chainId
              ? t('CurrentNetwork')
              : enable && (
                <Button
                  type="secondary"
                  ghost
                  scale={0.35}
                  onClick={() => switchEthChain(chain)}
                >
                  {t('Switch')}
                </Button>
              )}
          </div>
        </Fieldset.Footer>
      </Fieldset>
      <style jsx>
        {`
          :global(.chain) {
            display: block;
            width: 100% !important;
          }

          :global(.chain:hover) {
            box-shadow: 0 5px 10px rgb(0 0 0 / 12%);
          }

          :global(.current .content) {
            background: antiquewhite;
            color: #000;
          }
          :global(.chain-title) {
            display: flex !important;
          }
          :global(.chain-tag) {
            margin-left: auto;
          }
          .status {
            font-size: 0.875rem;
            line-height: 1.2;
            margin: 0;
            display: inline-flex;
            word-break: break-word;
          }
          .status > :global(p) {
            margin: 0;
          }
          .actions {
            display: flex;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  )
}
