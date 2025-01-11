import { getBookmarkSvg } from './get-bookmark-svg';

export const inactiveBookmarkButtonView = (pageNumber: number) => {
  const button = document.querySelector(`#bookmark-button-${pageNumber}`);

  if (button) button.innerHTML = getBookmarkSvg(false);
};
