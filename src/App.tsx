import React, { FC, Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
import './app.scss'

const Header = lazy(() => import('./components/Header'))
const Movies = lazy(() => import('./components/Movies'));
const Starred = lazy(() => import('./components/Starred'));
const WatchLater = lazy(() => import('./components/WatchLater'));

const App: FC = () => {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Movies/>} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App