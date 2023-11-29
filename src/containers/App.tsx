import React, { FC, Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from 'components/Layout';
import words from 'translation/data_words.json'
import './app.scss'

const Movies = lazy(() => import('../components/Movies'));
const Starred = lazy(() => import('./starred'));
const WatchLater = lazy(() => import('./watch-later'));

const routeConfig = [
  { path: "/", component: Movies },
  { path: "/starred", component: Starred },
  { path: "/watch-later", component: WatchLater },
  { path: "*", component: () => <h1 className="not-found">{words.pageNotFound}</h1> }
];

const App: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<div className='loading-spinner'>{words.loading}</div>}>
        <Routes>
          {routeConfig.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App