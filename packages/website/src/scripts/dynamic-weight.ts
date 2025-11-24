import { throttle } from 'utils/helpers'

function getPointerProximity(
  pointerCoords: { x: number; y: number },
  elementRect: DOMRect
) {
  const elementCenter = {
    x: elementRect.x + elementRect.width / 2,
    y: elementRect.y + elementRect.height / 2,
  }
  return Math.hypot(pointerCoords.x - elementCenter.x, pointerCoords.y - elementCenter.y)
}

function rangeMap(
  value: number,
  sourceRange: [number, number],
  targetRange: [number, number]
) {
  const sourceLength = sourceRange[1] - sourceRange[0]
  const targetLength = targetRange[1] - targetRange[0]
  const percentage = (value - sourceRange[0]) / sourceLength

  return percentage * targetLength + targetRange[0]
}

export const applyDynamicWeight = (elements: HTMLElement[]) => {
  if (elements) {
    const tracedElements = [...elements].map(
      (element) => [element, element.getBoundingClientRect()] as const
    )
    const updateLinksWeight = (pointer: { x: number; y: number }) => {
      tracedElements.forEach(([element, elementRect]) => {
        const proximity = getPointerProximity(pointer, elementRect)
        const weight =
          proximity <= 100 ? Math.floor(rangeMap(proximity, [0, 100], [800, 400])) : 400

        element.style.setProperty('--wght', `${weight}`)
      })
    }

    document.addEventListener('mousemove', throttle(updateLinksWeight, 60))
  }
}
