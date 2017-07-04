import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import UserPolls from './components/UserPolls.jsx';

ReactDOM.render(<App />, document.getElementById('createPoll'));
ReactDOM.render(<UserPolls />, document.getElementById('userPolls'));
