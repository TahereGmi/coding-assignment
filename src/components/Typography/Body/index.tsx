import React, { ReactNode, FC } from 'react';
import './body.scss';

type TBodyProps = {
	id?: string;
    className?: string;
	children: ReactNode;
	size?: '1' | '2' | '3';
};

const Body: FC<TBodyProps> = ({ id, children, size, className }) => {
    return (
        <span className={`${className} body${size}`} id={id}>
            {children}
        </span>
    );
};

Body.defaultProps = {
	size: '1',
};

export default Body;
