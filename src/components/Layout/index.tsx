import React, { FC, ReactNode } from 'react'
import Header from '../Header'

type TLayoutProps = {
    children: ReactNode
}

const Layout: FC<TLayoutProps> = ({ children }) => {
    return (
        <div className="App">
            <Header />
            <div className="container">{children}</div>
        </div>
    );
}

export default Layout;
