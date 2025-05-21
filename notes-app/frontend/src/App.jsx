import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewNote from './components/NewNote';
import Home from './components/Home'

const router = createBrowserRouter([
  { path: '/', element: <Home />},
  { path: '/new', element: <NewNote /> }
])

function App() {
  
  return (
      <RouterProvider router={router} />
  );
}

export default App;
