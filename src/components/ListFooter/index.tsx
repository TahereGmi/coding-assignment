import React, { FC } from 'react'

import Button from 'components/Button'
import './listFooter.scss'

type TListFooterProps = {
    onClick: () => void,
    buttonText: string
}

const ListFooter: FC<TListFooterProps> = ({ onClick, buttonText }) => {
    return (
        <footer className="list-footer text-center">
            <Button
                classList='btn btn-primary'
                text={buttonText}
                onClick={onClick}
            />
        </footer>
    );
}

export default ListFooter;