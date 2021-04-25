import React, { Suspense } from 'react'
import Detail from './pages/Detail'
import Home from './pages/Home'
import SearchResult from './pages/SearchResults/index'
import './App.css'
import StaticContext from './context/StaticContext'

import { Link, Route } from 'wouter'
import { GifsContextProvider } from './context/GifsContext'

const HomePage = React.lazy(() => import('./pages/Home/index'))

export default function App() {
  return (
    <StaticContext.Provider value={
      {
        name: 'midudev',
        suscribeteAlCanal: true
      }
    }>
      <div className='App'>
        <Suspense fallback={null}>
          <section className='App-content'>
            <Link to='/' ><h1>Giffy</h1></Link>
              <GifsContextProvider>
                <Route
                  component={HomePage}
                  path='/'
                  />
                <Route
                  component={SearchResult}
                  path='/search/:keyword'
                  />
                <Route
                  component={Detail}
                  path='/gif/:id'
                  />
                  <Route
                  component={() => <h1>404 ERROR :(</h1>}
                  path='/404'
                  />
              </GifsContextProvider>
          </section>
        </Suspense>
      </div>
    </StaticContext.Provider>
  )
}