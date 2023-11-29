import Icon from 'components/Icon';
import React, { FC } from 'react';

type TButtonProps = {
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    icon?: string,
    classList: string,
    text?: string,
}

const Button: FC<TButtonProps> = ({ classList, onClick, icon, text }) => {
    return (
        <button 
            type="button" 
            className={classList}
            onClick={onClick}
        >
            {icon && <Icon classList={`bi ${icon}`} />}
            {text}
        </button>
    );
}

export default Button;