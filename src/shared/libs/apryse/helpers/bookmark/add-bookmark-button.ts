import { store } from 'app/providers/redux-provider/store';

import { getBookmarkSvg } from './get-bookmark-svg';
import { handleBookmark } from './handle-bookmark';

interface Params {
  pageSection: Element;
  pageNumber: number;
  isAuthorized?: boolean;
}

export const addBookmarkButton = ({ pageSection, pageNumber, isAuthorized }: Params) => {
  const button = document.createElement('button');

  const state = store.getState();
  const { bookmarks } = state.viewer;

  button.classList.add('bookmark-button');
  button.id = `bookmark-button-${pageNumber}`;

  button.style.position = 'absolute';
  button.style.top = '-10px';
  button.style.right = '10px';
  button.style.width = '4%';
  button.style.height = '4%';
  button.style.zIndex = '50';

  button.innerHTML = getBookmarkSvg(!!bookmarks[pageNumber]);

  button.onclick = () => handleBookmark({ pageNumber, isAuthorized });

  pageSection.appendChild(button);
};
