import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Background from './background.jsx'
import TypingCard from './typing.jsx'
import TopBar from './topbar.jsx'
import SubBar from './subbar.jsx'
import Signin from './signin.jsx'
import SignUp from './signup.jsx'

function Root() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isSignin = hash === '#/signin'
  const isSignup = hash === '#/signup'

  return (
    <StrictMode>
      <TopBar />
      {isSignin ? (
        <>
          <Background />
          <Signin />
        </>
      ) : isSignup ? (
        <>
          <Background />
          <SignUp />
        </>
      ) : (
        <>
          <Background />
          <TypingCard />
          <SubBar />
        </>
      )}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
