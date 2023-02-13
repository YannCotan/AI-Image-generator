import React from 'react'
import {BrowserRouter, Link, Routes , Route} from 'react-router-dom'

import {logo} from './assets'
import {Home , CreatePoste} from './pages'

const App = () => {
  return (
      <BrowserRouter>
        <header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b[#e6ebf4]'>
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 object-contain"/>
          </Link>
          <nav>
            <Link to="/create_post"
            className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
              <button type="button">Créer</button>
            </Link>
          </nav>  
        </header>
        <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create_post" element={<CreatePoste/>}/>
          </Routes>
        </main>
      </BrowserRouter>
  )
}

export default App