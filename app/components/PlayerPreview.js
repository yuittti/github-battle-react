import React from 'react';
import PropTypes from 'prop-types';


const PlayerPreview = (props) => {
	return (
		<div className="player">
			<div>
				<img 
					src={props.avatar} 
					alt={'Avatar for ' + props.username} 
					className="avatar"
				/>
				<h2 className="username">
					@{props.username}
				</h2>
			</div>
			{props.children}
		</div>
	)
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
}

export default PlayerPreview;