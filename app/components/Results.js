import React from 'react';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const Profile = (props) => {
	const info = props.info;
	return (
		<PlayerPreview 
			avatar={info.avatar_url}
			username={info.login}>

			<ul className="space-list-items">
				{info.name && <li>{info.name}</li>}
				{!!info.followers && <li>Followers: {info.followers}</li>}
				{!!info.following && <li>Following: {info.following}</li>}
				{!!info.public_repos && <li>Repos: {info.public_repos}</li>}
			</ul>
		</PlayerPreview>
	)
}

Profile.propTypes = {
	info: PropTypes.object.isRequired
}

const Player = (props) => {
	return (
		<div className="column">
			<h1 className="header">{props.label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
			<Profile info={props.profile} />
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount() {
		let players = queryString.parse(this.props.location.search);

		battle([
			players.playerOneName,
			players.playerTwoName
		]).then( (results) => {
			if (results === null) {
				return this.setState(() => {
					return {
						error: 'Error! Check if users exists on Github',
						loading: false
					}
				})
			}

			this.setState(() => {
				return {
					error: null,
					winner: results[0],
					loser: results[1],
					loading: false
				}
			})
		});
	}

	render() {
		let error = this.state.error;
		let winner = this.state.winner;
		let loser = this.state.loser;
		let loading = this.state.loading;

		if (loading === true) {
			return (
				<Loading />
			)
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to="/battle">Reset</Link>
				</div>
			)
		}

		return (
			<div className="row">
				<Player 
					label='Winner'
					score={winner.score}
					profile={winner.profile}
				/>
				<Player 
					label='Loser'
					score={loser.score}
					profile={loser.profile}
				/>
			</div>
		)
	}
}

export default Results;