import { Button } from '@geist-ui/react'
import { ArrowUp } from '@geist-ui/react-icons'
import debounce from 'lodash/debounce'
import { useCallback, useLayoutEffect, useState } from 'react'

const BackToTop = () => {
  const [show, setShow] = useState(false)
  const update = debounce(val => {
    setShow(val)
  }, 300)
  const handleScroll = useCallback(() => {
    let top = 0
    try {
      top = document.scrollingElement?.scrollTop || 0
    } catch (error) {
      console.error(error)
    }
    update(top > 200)
  }, [])

  const backToTop = () => {
    try {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error(error)
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return <>
    <div className={`to-top ${show ? 'show' : 'hide'}`}>
      <Button type="secondary" icon={<ArrowUp />} auto onClick={backToTop}>Top</Button>
    </div>
    <style jsx>{`
      .to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #fff;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
        border-radius: 20px;
      }
      .to-top.show {
        opacity: 1;
      }
    `}</style>
  </>
}

export default BackToTop
