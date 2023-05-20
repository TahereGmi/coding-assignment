import React, { FC } from 'react';

interface IIconProps {
    classList: string
}

const Icon: FC<IIconProps> = ({ classList }) => {
    return (
        <i className={classList}></i>
    );
}

export default Icon;