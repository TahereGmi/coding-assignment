import React, { FC } from 'react';
import Icon from 'components/Icon'

type TProps = {
    onClick: () => void,
    icon: string
}

const Star: FC<TProps> = ({ onClick, icon }) => {
    return (
        <span 
            className="btn-star" 
            onClick={onClick}
        >
            <Icon classList={`bi ${icon}`} />
        </span>
    );
}

export default Star;