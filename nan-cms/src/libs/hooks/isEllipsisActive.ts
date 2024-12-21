export function isEllipsisActive(element: HTMLElement): boolean {
  return element.offsetWidth < element.scrollWidth
}
