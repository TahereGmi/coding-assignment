import React, { FC, Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import './app.scss'

const Movies = lazy(() => import('./components/Movies'));
const Starred = lazy(() => import('./components/Starred'));
const WatchLater = lazy(() => import('./components/WatchLater'));

const App: FC = () => {
  return (
    <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Movies/>} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/watch-later" element={<WatchLater />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
        </Suspense>
    </Layout>
  )
}

export default App