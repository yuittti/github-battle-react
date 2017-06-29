import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage(props) {
	const langs = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className='languages'>
			{langs.map( lang => {
				return (
					<li 
						style={lang === props.selectedLang ? { color: '#d00210' } : null}
						onClick={ props.onSelect.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				)
			})} 
		</ul>
	)
}

const RepoGrid = (props) => {
	return (
		<ul className="popular-list">
			{props.repos.map((repo, index) => {
				return (
					<li key={repo.name} className="popular-item">
						<div className="popular-rank">#{index + 1}</div>

						<ul className="space-list-items">
							<li>
								<img 
									className='avatar' 
									src={repo.owner.avatar_url} 
									alt={`Avatar for ${repo.owner.login}`}
								/>
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
	selectedLang: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedLang: 'All',
			repos: null 
		};

		// 'this' could lost context (in array's functions for example)
		this.updateLang = this.updateLang.bind(this);
	}

	componentDidMount() {
		this.updateLang(this.state.selectedLang);
	}

	updateLang(lang) {
		this.setState(() => {
			return {
				selectedLang: lang,
				repos: null
			}
		});

		fetchPopularRepos(lang)
			.then(repos => {
				this.setState(() => {
					return {
						repos: repos
					}
				})
			})

			// if use es5 function, callback function should be binded to 'this'
			// ...
				// .then(function(repos) {
				// 	this.setState(function(){
				// 		return {
				// 			repos: repos
				// 		}
				// 	})
				// }.bind(this))
	}

	render() {
		return (
			<div>
				<SelectLanguage 
					selectedLang={this.state.selectedLang} 
					onSelect={this.updateLang} />

				{!this.state.repos
					? <Loading />
					: <RepoGrid repos={this.state.repos} />
				}	
				
			</div>

		);
	}
};

export default Popular;