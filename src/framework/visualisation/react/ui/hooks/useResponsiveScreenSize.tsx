import { useEffect } from 'react'

// somehow, taking the full height/width sometimes causes overflows.
// subtracing 1 seems to work, but I can't explain why
const darkmass = 1

export default function useResponsiveScreen (): void {
  useEffect(() => {
    // Listen for changes to screen size and orientation
    window.addEventListener('resize', updateSize)
    if (window?.screen?.orientation !== undefined) { window.screen.orientation?.addEventListener('change', updateSize) }

    return () => {
      window.removeEventListener('resize', updateSize)
      if (window?.screen?.orientation !== undefined) { window.screen.orientation.removeEventListener('change', updateSize) }
    }
  }, [])

  useEffect(() => {
    // set initial size
    updateSize()

    // listening for orientation and size changes doesn't always work and on some devices
    // size isn't properly set on mount. Therefore also just check the size repeatedly.
    // Shouldn't be too expensive, since it only updates on change
    const interval = setInterval(updateSize, 1000)
    return () => clearInterval(interval)
  }, [])
}

function updateSize (): void {
  const height = `${window.innerHeight - darkmass}px`
  const width = `${document.documentElement.clientWidth - darkmass}px`

  if (height !== document.documentElement.style.getPropertyValue('--screen-height')) { document.documentElement.style.setProperty('--screen-height', height) }

  if (width !== document.documentElement.style.getPropertyValue('--screen-width')) { document.documentElement.style.setProperty('--screen-width', width) }
}
