import React from 'react'
import './LoadingComponent.css'
import useWindowDimensions from '../Hooks/viewport';
import { CircularProgress } from '@material-ui/core';

function LoadingComponent() {
    const { height } = useWindowDimensions();
    return (
			<div className="LoadingBody" style={{ height: height }}>
				<CircularProgress
					size={300}
					style={{ color: '#F8BD69' }}
				></CircularProgress>
			</div>
		);
}

export default LoadingComponent
