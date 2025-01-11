
import { createBrowserRouter } from 'react-router-dom';
import { DocumentPage } from 'pages/document-page/document-page';
import { RootPage } from 'pages/root-page/root-page';

export const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <RootPage />,
    },
    {
      path: '/viewer',
      element: <DocumentPage />,
    },
  ])
