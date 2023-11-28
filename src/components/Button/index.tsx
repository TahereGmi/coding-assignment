import Icon from 'components/Icon';
import React, { FC } from 'react';

type TButtonProps = {
    onClick?: () => void,
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    icon?: string,
    classList: string,
    text?: string,
}

const Button: FC<TButtonProps> = ({ classList, onClick, icon, text, onClose }) => {
    return (
        <button 
            type="button" 
            className={classList}
            onClick={onClick || onClose}
        >
            {icon && <Icon classList={`bi ${icon}`} />}
            {text}
        </button>
    );
}

export default Button;