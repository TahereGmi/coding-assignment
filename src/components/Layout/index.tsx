import React, { FC, ReactNode } from 'react'
import Header from 'components/Header'

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
