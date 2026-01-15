import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './dl.css'
import Background from './background.jsx'
import TypingCard from './typing.jsx'
import TopBar from './topbar.jsx'
import SubBar from './subbar.jsx'
import Signin from './signin.jsx'
import SignUp from './signup.jsx'
import Ranked from './ranked.jsx'

function Root() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isSignin = hash === '#/signin'
  const isSignup = hash === '#/signup'
  const isRanked = hash === '#/ranked'

  return (
    <StrictMode>
      {isSignin ? (
        <>
          <TopBar />
          <Background />
          <Signin />
        </>
      ) : isSignup ? (
        <>
          <TopBar />
          <Background />
          <SignUp />
        </>
      ) : isRanked ? (
        <Ranked />
      ) : (
        <>
          <TopBar />
          <Background />
          <TypingCard />
          <SubBar />
        </>
      )}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
