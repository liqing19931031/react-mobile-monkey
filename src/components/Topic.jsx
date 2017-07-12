import React from 'react';
class Index extends React.Component{
	constructor(props) {
		super(props); 	// 继承父类的构造函数
		this.state = {date: new Date()};
		this.user = 'psgn'
	}
	componentWillUnmount() {
	    clearInterval(this.timerID);
	}
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(), 1000
		);
	}
	tick() {
		this.setState({
			date: new Date()
		});
	}
	render() {
		return (
			<div className='topic'>
				<header className='clearfix'>
					<img src='/images/logo.png' className='pull-left'></img>
					<div className='search-input pull-left text-center'>
						<i className='glyphicon-search glyphicon'></i> 寻找宝贝店铺
					</div>
				</header>
			</div>
		)
	}
}
export default Index;
