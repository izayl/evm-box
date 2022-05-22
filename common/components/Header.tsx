import { Button, ButtonDropdown, Link, Loading, Spacer, useTheme, useToasts } from '@geist-ui/react'
import { Moon, Sun } from '@geist-ui/react-icons'
import NextLink from 'next/link'
import { useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'

import { useLocale } from '../hooks/useLocale'
import { useThemeSwitch } from '../hooks/useThemeContext'
import { addColorAlpha, truncateAddress } from '../utils'

const Profile: React.FC = () => {
  const { data: account } = useAccount()
  const t = useLocale()
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  const [, setToast] = useToasts()
  const wc = connectors?.find(connector => connector.name === 'WalletConnect')

  useEffect(() => {
    if (error) {
      setToast({ type: 'error', text: error.message })
    }
  }, [error])

  if (account) {
    return (
      <ButtonDropdown type="secondary" scale={0.5}>
        <ButtonDropdown.Item main>{ensName || truncateAddress(account.address)}</ButtonDropdown.Item>
        <ButtonDropdown.Item onClick={() => disconnect()} type="secondary">{t('disconnect')}</ButtonDropdown.Item>
      </ButtonDropdown>
    )
  }

  if (!wc) return null

  return (
    <Button
      auto
      disabled={!wc.ready}
      type="secondary-light"
      onClick={() => connect(wc)}
      scale={0.5}
    >
      {wc.name}
      {!wc.ready && ' (unsupported)'}
      {isConnecting &&
            wc.id === pendingConnector?.id &&
            <Loading />}
    </Button>
  )
}

const Header: React.FC = () => {
  const t = useLocale()
  const theme = useTheme()
  const { switchTheme, themeType } = useThemeSwitch()
  return (
    <header>
      <div className="header">
        <NextLink href="/">
          <div className="logo">
            <img src="/images/logo.svg" />
            <span>{t('AppName')}</span>
          </div>
        </NextLink>
        <nav>
          <Link
            href="https://faucet.paradigm.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            color={false}
            block
          >
            Faucet
          </Link>
          <Spacer w={2}/>
          <Link
            href="https://github.com/izayl/evm-box"
            target="_blank"
            rel="noopener noreferrer"
            color={false}
            block
          >
            GitHub
          </Link>
          <Spacer w={2}/>
          <Link block href="#">
            {themeType === 'dark'
              ? <Moon
                size={18}
                onClick={() => switchTheme('light')}
                color={theme.palette.foreground}
              />
              : <Sun
                size={18}
                onClick={() => switchTheme('dark')}
                color={theme.palette.foreground}
              />
            }
          </Link>
          <Spacer w={2} />
          <Profile />
        </nav>
      </div>
      <style jsx>{`
        header {
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${addColorAlpha(theme.palette.background, 0.8)};
          box-shadow: ${theme.type === 'dark' ? '0 0 0 1px #333' : '0 0 15px 0 rgba(0, 0, 0, 0.1)'};
          width: 100%;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 12;
        }
        .header {
          max-width: 1000px;
          width: 100%;
          padding: 0 16pt;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: auto;
        }

        nav a {
          color: ${theme.palette.foreground};
          cursor: pointer;
        }

        :global(.header .link) {
          color: ${theme.palette.foreground} !important;
        }

        .logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .logo img {
          width: 32px;
          height: 32px;
        }

        .logo span {
          font-size: 1.125rem;
          font-weight: 500;
          margin-left: 1em;
        }

         @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
            nav {
              display: none;
            }
          }
      `}</style>
    </header>
  )
}

export default Header
