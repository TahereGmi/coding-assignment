import React, { FC, ReactNode, lazy } from 'react';

interface ILayoutProps {
    children: ReactNode
}

const Header = lazy(() => import('../components/Header'))

const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <div className="App">
            <Header />
            <div className="container">{children}</div>
        </div>
    );
}

export default Layout;