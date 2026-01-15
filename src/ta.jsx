import { useState, useEffect, useRef } from 'react'
import './ta.css'

export function TA({ value, sample, onStart, onFinish, onReset }) {
  const [start, setStart] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timeLimit, setTimeLimit] = useState(null)

  const intervalRef = useRef(null)
  const endTimeoutRef = useRef(null)

  // Auto-start timer when user begins typing
  useEffect(() => {
    if (value.length > 0 && !start && !finished) {
      setStart(Date.now())
      onStart?.()
    } else if (value.length === 0 && start) {
      // Reset timer when input is cleared
      setStart(null)
      setElapsed(0)
      setFinished(false)
    }
  }, [value.length, start, finished, onStart])

  // elapsed timer
  useEffect(() => {
    clearInterval(intervalRef.current)
    if (start && !finished) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - start)
      }, 200)
    } else {
      setElapsed(0)
    }
    return () => clearInterval(intervalRef.current)
  }, [start, finished])

  // auto-stop when timeLimit reached
  useEffect(() => {
    clearTimeout(endTimeoutRef.current)
    if (start && timeLimit) {
      const remaining = timeLimit * 1000 - (Date.now() - start)
      if (remaining <= 0) {
        finishSessionInternal()
      } else {
        endTimeoutRef.current = setTimeout(() => {
          finishSessionInternal()
        }, remaining + 10)
      }
    }
    return () => clearTimeout(endTimeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, timeLimit])

  // stats calculations
  const correctChars = Array.from(value).filter((c, i) => c === sample[i]).length
  const minutes = elapsed / 60000
  const wpm = elapsed >= 1000 ? Math.round((correctChars / 5) / minutes) : 0
  const accuracy = value.length ? Math.max(0, Math.round((correctChars / value.length) * 100)) : 100

  // Broadcast stats so other components can consume them
  useEffect(() => {
    try {
      const ev = new CustomEvent('typing:stats', { detail: { wpm: isFinite(wpm) ? wpm : 0, accuracy } })
      window.dispatchEvent(ev)
    } catch (err) {
      // ignore
    }
  }, [wpm, accuracy])

  function finishSessionInternal() {
    setFinished(true)
    setStart(null)
    onFinish?.()
  }

  function resetSessionInternal() {
    setStart(null)
    setElapsed(0)
    setFinished(false)
    clearInterval(intervalRef.current)
    clearTimeout(endTimeoutRef.current)
    onReset?.()
  }

  function startSessionInternal() {
    if (finished) {
      resetSessionInternal()
    }
    setStart(Date.now())
    setFinished(false)
    onStart?.()
  }

  const showTimer = Boolean(timeLimit && start && !finished)
  const remainingSeconds = showTimer ? Math.max(0, Math.ceil((timeLimit * 1000 - elapsed) / 1000)) : 0

  return (
    <div className="ta">
      <div className="time-controls" role="toolbar" aria-label="Time limit">
        {[15,30,60].map(s => (
          <button key={s} className={`seg ${timeLimit === s ? 'active' : ''}`} onClick={() => setTimeLimit(timeLimit === s ? null : s)} type="button">
            {s}s
          </button>
        ))}
        <button className={`seg ${timeLimit === null ? 'active' : ''}`} onClick={() => setTimeLimit(null)} type="button">∞</button>
      </div>

      {showTimer && (
        <div className="timer" aria-live="polite">{remainingSeconds}s</div>
      )}
    </div>
  )
}
