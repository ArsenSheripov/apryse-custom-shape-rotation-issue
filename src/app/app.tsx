import { ReduxProvider } from './providers/redux-provider';
import { PDFNetInitializer } from './providers/pdf-net-Initializer/pdf-net-initializer';
import {  RouterProvider } from 'react-router-dom';
import { browserRouter } from './providers/routers';

function App() {

  return (
    <ReduxProvider>
      <PDFNetInitializer>
        <RouterProvider router={browserRouter} />
      </PDFNetInitializer>
    </ReduxProvider>
  )
}

export default App
