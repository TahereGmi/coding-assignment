import React, { FC } from 'react'
import './listFooter.scss'

type TListFooterProps = {
    onClick: () => void,
    buttonText: string
}

const ListFooter: FC<TListFooterProps> = ({ onClick, buttonText }) => {
    return (
        <footer className="list-footer text-center">
          <button className="btn btn-primary" onClick={onClick}>{buttonText}</button>
        </footer>
    );
}

export default ListFooter;