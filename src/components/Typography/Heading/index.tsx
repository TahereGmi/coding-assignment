import React, { ReactNode, FC } from 'react';
import './heading.scss';

type THeadingProps = {
	id?: string;
	className?: string;
	size?: 'h1' | 'h2' | 'h3' | 'h4';
	children: ReactNode;
};

const Heading: FC<THeadingProps> = ({
	id,
	size,
    className,
	children,
}) => {
	switch (size) {
		case 'h4':
			return (
				<h4 id={id} className={className}>
					{children}
				</h4>
			);
        case 'h3':
            return (
                <h3 id={id} className={className}>
                    {children}
                </h3>
            );
        case 'h2':
			return (
				<h2 id={id} className={className}>
					{children}
				</h2>
			);
		case 'h1':
		default:
			return (
				<h1 id={id} className={className}>
					{children}
				</h1>
			);
	}
};

Heading.defaultProps = {
	size: 'h1',
};

export default Heading;
