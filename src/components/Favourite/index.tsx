import React, { FC } from 'react';
import Icon from 'components/Icon'

type TProps = {
    onClick: () => void,
    icon?: string,
    text?: string,
    className?: string,
}

const Star: FC<TProps> = ({ onClick, icon, text, className }) => {
    return (
        <button 
            type="button" 
            data-testid="remove-watch-later" 
            className={`movie-btn btn btn-light btn-watch-later ${className}`}
            onClick={onClick}
        >
            {icon && <Icon classList={`bi ${icon}`} />}
            {text}
        </button>
    );
}

export default Star;