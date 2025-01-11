import { addBookmarkButton } from 'shared/libs/apryse/helpers/bookmark/add-bookmark-button';

export const onAddBookmarks = (isAuthorized?: boolean) => {
  return () => {
    const pageSections = document.querySelectorAll('[id^="pageContainer"]');

    pageSections.forEach(pageSection => {
      const existingButton = pageSection?.querySelector('.bookmark-button');
      if (existingButton) return;

      const pageNumber = parseInt(pageSection.id.replace('pageContainer', ''), 10);
      if (!Number.isNaN(pageNumber)) {
        addBookmarkButton({ pageSection, pageNumber, isAuthorized });
      }
    });
  };
};
