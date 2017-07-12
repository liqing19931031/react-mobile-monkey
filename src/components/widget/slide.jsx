import React from 'react';

class Slide extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      index: 1
    }
  }

  componentWillMount () {
    console.log(this)
  }

  render() {
    return (
      <div className='silide-group' style={{height: this.props.data.height}}>
      </div>
    )
  }
}

export default Slide;
