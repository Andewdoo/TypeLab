export function getInitialTheme() {
  try {
    return localStorage.getItem('theme') || 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(mode) {
  const m = mode === 'dark' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', m)
  
  // Update body background color
  const backgroundColor = m === 'light' ? '#f9fafb' : '#1e293b'
  document.body.style.backgroundColor = backgroundColor
  
  try {
    localStorage.setItem('theme', m)
  } catch {}
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light'
  const next = current === 'light' ? 'dark' : 'light'
  applyTheme(next)
  return next
}

// Initialize theme on load
export function initTheme() {
  const theme = getInitialTheme()
  applyTheme(theme)
  return theme
}
