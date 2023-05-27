import React, { FC } from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import words from '../../translation/data_words.json'

interface IEmptyStateProps {
    show: boolean,
    iconName: string,
    emptyText: string
}

const EmptyState: FC<IEmptyStateProps> = ({ show, iconName, emptyText }) => {
    return (
        show ? (<div className="text-center empty-cart">
        <Icon classList={`bi bi-${iconName}`} />
        <p>{emptyText}</p>
        <p>{words.goTo}<Link to='/'>{words.home}</Link></p>
      </div>)
    : null
    );
}

export default EmptyState;