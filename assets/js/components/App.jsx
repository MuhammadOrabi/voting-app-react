import React from 'react';
import _ from 'underscore';
import axios from 'axios';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			poll: '',
			options: [{name: ''}, {name: ''}]
		};
		this.handlePoll = this.handlePoll.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.moreOptions = this.moreOptions.bind(this);
		this.creatPoll = this.creatPoll.bind(this);
	}
	handleChange(e) {
		let options = this.state.options;
		options[e.target.id].name = e.target.value;
		this.setState({options: options});
	}
	handlePoll(e) {
		this.setState({poll: e.target.value});
	}
	moreOptions() {
		let options = this.state.options;
		options.push({name: ''});
		this.setState({
      		options: options
    	});
	}
	creatPoll() {
		if (this.state.poll.trim().length === 0 
			|| this.state.options[0].name.trim().length === 0 
			|| this.state.options[1].name.trim().length === 0) {
	 		return;
		}

		axios.post('/polls', {poll: this.state.poll, options: this.state.options})
		.then((res) => {
			this.setState({
				poll: '',
				options: [{name: ''}, {name: ''}]
			})
		})
		.catch((err) => console.log(err))
	}
	render() {
		
		const options = this.state.options.map((val, index) =>
			<div className="push-2 col-5" key={index}>
				<input id={index} type="text" className="form-control" placeholder={'Option ' + (index + 1)}
					value={this.state.options[index].name} onChange={this.handleChange} />
				<br/>
			</div>
		);
		return (
			<div>
				<div className="form-group row">
					<label className="col-2 col-form-label">Poll</label>
					<div className="col-9">
						<input className="form-control" type="text" placeholder="which is your favorite?"
							value={this.state.poll} onChange={this.handlePoll} />
					</div>
				</div>
				<label className="col-form-label">Options</label>
				{ options }
				<div className="form-inline mr-auto">
					<button className="btn btn-link nav-link mr-5" onClick={this.moreOptions} >More options</button>
					<button className="btn btn-primary mr-auto" onClick={this.creatPoll} >Create</button>
				</div>
			</div>
		);
	}
}
