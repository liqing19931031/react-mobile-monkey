require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import Router from '../route/router';
import Topic from './Topic';

class AppComponent extends React.Component {
  	render() {
    	return (
      		<div className="index">
      			<Topic />
      			<Router />
      		</div>
		);
  	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
