// HTMLElement.hidePopover() is part of the Popover API spec.
// This cast can be removed once TypeScript adds native support.
export function hidePopover(el: HTMLElement | null) {
  (el as HTMLElement & { hidePopover: () => void })?.hidePopover();
}
