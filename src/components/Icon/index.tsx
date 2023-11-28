import React, { FC } from 'react';

type TIconProps ={
    classList: string
}

const Icon: FC<TIconProps> = ({ classList }) => {
    return (
        <i className={classList}></i>
    );
}

export default Icon;