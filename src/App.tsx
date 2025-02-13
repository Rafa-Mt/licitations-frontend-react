import { RouterProvider } from '@tanstack/react-router'
import { router } from './services/router'

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
