import React from 'react';
import $ajax from '../../asyncAjax.js';
// import {
// 	Route,
// 	Link
// } from 'react-router-dom'
import Slide from '../widget/slide'

// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={props => (
//     <route.component {...props} routes={route.routes}/>
//   )}/>
// )

// const Home = ({ routes }) => (
// 	<div>
// 		<div className='left-nav'>
// 			<div className="content">
// 				<div className="nav-par">
// 					<div className='nav-par-header'>交易前</div>
// 					<Link to="/index/receipt">进货单</Link>
// 					<Link to="/index/favorites">收藏夹</Link>
// 				</div>
// 			</div>
// 		</div>
// 		<div className='main'>
// 			{routes.map((route, i) => (
// 				<RouteWithSubRoutes key={i} {...route}/>
// 			))}
// 		</div>
// 	</div>
// )

class Home extends React.Component{
	constructor (props) {
		super(props);
		this.state = {
        slide:{
					height: '11.2rem',
					slideData: []
				}
    }
	}

	componentWillMount () {
		$ajax('get', 'slides')
		.then((data) => {
			this.setState({'slide.slideData': data.result})
		})
	}

	render() {
		return (
			<div>
				<Slide data={this.state.slide} />
			</div>
		)
	}
}
export default Home;
