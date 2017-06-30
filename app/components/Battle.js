import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';


class PlayerInput extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let value = event.target.value;

		this.setState(() => {
			return {
				username: value
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(
			this.props.id,
			this.state.username
		)
	}

	render() {
		return (
			<form action="" className="column" onSubmit={this.handleSubmit}>
				<label htmlFor="username" className="header">
					{this.props.label}
				</label>

				<input 
					type="text" 
					id='username'
					placeholder='github username'
					autoComplete='off' 
					value={this.state.username} 
					onChange={this.handleChange} 
				/>

				<button 
					className="button"
					type='submit'
					disabled={!this.state.username}>
						Submit
				</button>
			</form>
		)
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImg: null,
			playerTwoImg: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(() => {
			let newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Img'] = `https://github.com/${username}.png?size=200`;
			return newState;
		});
	}

	handleReset(id) {
		this.setState(() => {
			let newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Img'] = null;
			return newState;
		});
	}

	render() {
		let match = this.props.match;
		let playerOneName = this.state.playerOneName;
		let playerTwoName = this.state.playerTwoName;
		let playerOneImg = this.state.playerOneImg;
		let playerTwoImg = this.state.playerTwoImg;

		return (
			<div>
				<div className="row">
					{!playerOneName && 
						<PlayerInput 
							id='playerOne'
							label='Player One'
							onSubmit={this.handleSubmit} 
						/>}

					{playerOneImg !== null &&
						<div className="column">
							<PlayerPreview 
								avatar={playerOneImg}
								username={playerOneName}>

								<button
									className='reset'
									onClick={this.handleReset.bind(null, 'playerOne')}>
										Reset
								</button>
							</PlayerPreview>
						</div>
						
					}

					{!playerTwoName && 
						<PlayerInput 
							id='playerTwo'
							label='Player Two'
							onSubmit={this.handleSubmit} 
						/>}

					{playerTwoImg !== null &&
						<div className="column">
							<PlayerPreview 
								avatar={playerTwoImg}
								username={playerTwoName}>

								<button
									className='reset'
									onClick={this.handleReset.bind(null, 'playerTwo')}>
										Reset
								</button>
							</PlayerPreview>
						</div>
					}
				</div>

				{playerOneImg && playerTwoImg && 
					<div className="btn-holder">
						<Link
							className='button'
							to={{
								pathname: match.url + '/results',
								search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
							}}>
								Battle
						</Link>
					</div>
					}
			</div>
		)
	}
}

export default Battle;