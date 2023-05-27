import React, { FC, ReactNode } from 'react'
import Header from '../Header'

interface ILayoutProps {
    children: ReactNode
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <div className="App">
            <Header />
            <div className="container">{children}</div>
        </div>
    );
}

export default Layout;
