import { useToasts } from '@geist-ui/react'
import { useEffect, useState } from 'react'

export const useDApp = () => {
  const [, setToast] = useToasts()
  const [enable, setEnable] = useState(false)
  useEffect(() => {
    if (!window.ethereum) {
      setEnable(false)
      const action = {
        name: 'download',
        handler: () => window.open('tbd'),
      }
      return setToast({
        text: 'Your current browser is not support dapp, trying use imToken or MetaMask',
        actions: [action],
        delay: 30000,
      })
    }
    setEnable(true)
  }, [])

  return enable
}
