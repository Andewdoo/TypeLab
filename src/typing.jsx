import { useState, useEffect, useRef } from 'react'
import './typing.css'
import { ModeSelector, generateSample } from './modes.jsx'
import { TA } from './ta.jsx'
import { WORD_LIST } from './wordList.js'

export default function TypingCard() {
  const [sample, setSample] = useState(generateSample('poems'))
  const [gameMode, setGameMode] = useState('poems')
  const [value, setValue] = useState('')
  const [wordQueue, setWordQueue] = useState([])
  const [displayOffset, setDisplayOffset] = useState(0)

  const inputRef = useRef(null)
  const displayRef = useRef(null)

  // build sample when mode changes
  useEffect(() => {
    if (gameMode === 'words') {
      // Initialize word queue with enough words for 3+ lines
      const initialWords = []
      for (let i = 0; i < 60; i++) {
        initialWords.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)])
      }
      setWordQueue(initialWords)
      setSample(initialWords.join(' '))
    } else {
      setSample(generateSample(gameMode))
      setWordQueue([])
    }
    setValue('')
    setDisplayOffset(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode])

  // Handle Ctrl+R for reset
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault()
        setValue('')
        setDisplayOffset(0)
        
        // Regenerate words for words mode
        if (gameMode === 'words') {
          const newWords = []
          for (let i = 0; i < 60; i++) {
            newWords.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)])
          }
          setWordQueue(newWords)
          setSample(newWords.join(' '))
        } else {
          setSample(generateSample(gameMode))
        }
        
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode])

  useEffect(() => {
    if (gameMode !== 'words' || !displayRef.current) return
    
    const display = displayRef.current
    const charSpans = Array.from(display.querySelectorAll('.char'))
    if (charSpans.length === 0) return

    const lines = []
    let currentLine = []
    let prevTop = null
    
    charSpans.forEach((span, i) => {
      const rect = span.getBoundingClientRect()
      const displayRect = display.getBoundingClientRect()
      const relativeTop = rect.top - displayRect.top
      
      if (prevTop !== null && Math.abs(relativeTop - prevTop) > 20) {
        lines.push(currentLine)
        currentLine = [i]
      } else {
        currentLine.push(i)
      }
      prevTop = relativeTop
    })
    if (currentLine.length > 0) lines.push(currentLine)
    
    // Check if user completed 2nd line (index 1)
    if (lines.length >= 2 && value.length > 0) {
      const secondLineEnd = lines[1][lines[1].length - 1]
      const typedCount = value.length
      
      // If we've typed past the end of line 2, shift display
      if (typedCount > secondLineEnd + 1) {
        const firstLineEnd = lines[0][lines[0].length - 1]
        const charsToRemove = firstLineEnd + 1
        
        // Remove first line from sample
        const newSample = sample.slice(charsToRemove)
        
        // Add new words to the end
        const newWords = []
        for (let i = 0; i < 10; i++) {
          newWords.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)])
        }
        
        setSample(newSample + ' ' + newWords.join(' '))
        setValue(value.slice(charsToRemove))
        setDisplayOffset(displayOffset + charsToRemove)
      }
    }
  }, [value, sample, gameMode, displayOffset])

  // render words (existing logic relies on SAMPLE -> use sample)
  const typed = Array.from(value)

  // Update tracker position based on current character
  useEffect(() => {
    if (!displayRef.current) return
    
    const trackerEl = displayRef.current.querySelector('.tracker')
    if (!trackerEl) return
    
    const currentCharEl = displayRef.current.querySelector('.char.current')
    
    if (currentCharEl) {
      const charRect = currentCharEl.getBoundingClientRect()
      const displayRect = displayRef.current.getBoundingClientRect()
      const left = charRect.left - displayRect.left + displayRef.current.scrollLeft
      const top = charRect.top - displayRect.top + displayRef.current.scrollTop
      trackerEl.style.left = `${left}px`
      trackerEl.style.top = `${top}px`
      trackerEl.style.opacity = '1'
    } else if (typed.length === 0) {
      // Position at start if nothing typed
      const firstChar = displayRef.current.querySelector('.char')
      if (firstChar) {
        const charRect = firstChar.getBoundingClientRect()
        const displayRect = displayRef.current.getBoundingClientRect()
        const left = charRect.left - displayRect.left + displayRef.current.scrollLeft
        const top = charRect.top - displayRect.top + displayRef.current.scrollTop
        trackerEl.style.left = `${left}px`
        trackerEl.style.top = `${top}px`
        trackerEl.style.opacity = '1'
      }
    } else if (typed.length >= sample.length) {
      // Hide only when completely finished
      trackerEl.style.opacity = '0'
    }
    // Otherwise keep tracker visible at its last position
  }, [value, sample, typed.length])

  function handleChange(e) {
    setValue(e.target.value)
  }

  const lastIndex = Math.max(typed.length - 1, -1)

  return (
    <section className="typing-card" aria-labelledby="typing-title">
      <header className="typing-header">
        <div>
          <h3 id="typing-title" className="title">Typing practice</h3>
          <p className="subtitle">Short drills to build speed and accuracy</p>
        </div>

        <div className="stats-and-controls">
          <ModeSelector gameMode={gameMode} onChange={setGameMode} />
        </div>
      </header>

      <div
        className="typing-wrapper"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="typing-display" ref={displayRef} aria-hidden="true">
          <span className="tracker" />
          {Array.from(sample).map((ch, i) => {
            const typedChar = typed[i]
            let cls = 'char'
            if (typeof typedChar !== 'undefined') {
              const correct = typedChar === sample[i]
              cls += correct ? ' correct' : ' incorrect'
              if (i === lastIndex) cls += ' recent'
            } else if (i === typed.length) {
              cls += ' current'
            }
            return (
              <span key={'c-' + displayOffset + i} className={cls}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            )
          })}

          {typed.slice(sample.length).length > 0 && (
            <span className="word extra">
              {typed.slice(sample.length).map((ch, i) => {
                const idx = sample.length + i
                const cls = 'char incorrect' + (idx === lastIndex ? ' recent' : '')
                return (
                  <span key={'extra-' + displayOffset + i} className={cls}>
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                )
              })}
            </span>
          )}
        </div>

        <textarea
          ref={inputRef}
          className="typing-input-overlay"
          value={value}
          onChange={handleChange}
          onScroll={() => {
            if (inputRef.current && displayRef.current) {
              displayRef.current.scrollTop = inputRef.current.scrollTop
              displayRef.current.scrollLeft = inputRef.current.scrollLeft
            }
          }}
          spellCheck={false}
          aria-label="Typing input"
        />
      </div>

      <div className="controls">
        <TA value={value} sample={sample} onStart={() => inputRef.current?.focus()} onFinish={() => inputRef.current?.blur()} onReset={() => {}} />
      </div>
    </section>
  )
}