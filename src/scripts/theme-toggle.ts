const storageKey = 'theme-preference'

const getColorPreference = () =>
  localStorage.getItem(storageKey) ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const setColorPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  renderPreferredTheme()
}

const renderPreferredTheme = () => {
  document.firstElementChild?.setAttribute('data-theme', theme.value)
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value)
}

const theme = {
  value: getColorPreference(),
}
console.log(theme)

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'

  setColorPreference()
}

// set early so no page flashes / CSS is made aware
renderPreferredTheme()

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  renderPreferredTheme()
  document.querySelector('#theme-toggle')?.addEventListener('click', onClick)
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light'
    setColorPreference()
  })
