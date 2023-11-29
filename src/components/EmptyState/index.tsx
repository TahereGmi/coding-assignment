import React, { FC } from 'react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';
import words from 'translation/data_words.json'

type TEmptyStateProps = {
    show: boolean,
    icon: string,
    emptyText: string
}

const EmptyState: FC<TEmptyStateProps> = ({ show, icon, emptyText }) => {
    return (
        show ? (<div className="text-center empty-cart" data-testid="empty-state">
        <Icon classList={`bi bi-${icon}`} />
        <p>{emptyText}</p>
        <p>{words.goTo}<Link to='/'>{words.home}</Link></p>
      </div>)
    : null
    );
}

export default EmptyState;