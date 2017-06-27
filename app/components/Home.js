import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<div className="home-container">
				<h1>Github Battle</h1>

				<span className="subtitle">Demo of ReactJS application to find popular repos on Github by the language and to define among two Github accounts the one with the biggest score</span>

				<Link className="button" to='/battle'>
					Battle
				</Link>
			</div>
		)
	}
}

export default Home;