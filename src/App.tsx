import './App.css'
import { Routes,Route } from 'react-router-dom'
import AdminNavigator from './modules/admins/routes'
import { TooltipProvider } from '@radix-ui/react-tooltip';

function App() {
  return (
    <>
    <TooltipProvider>
      <Routes>
        <Route path='admin/*' element={<AdminNavigator />} />
        {/* <Route path='teacher/*' element={<AdminNavigator />} /> */}
      </Routes>
    </TooltipProvider>
    </>
  )
}

export default App
