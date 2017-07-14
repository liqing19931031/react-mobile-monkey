import React from 'react';

class Slide extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      groupLeft: -document.documentElement.getBoundingClientRect().width, // 轮播组左偏移距离
      startX: 0, // 触摸开始时的位置
      endX: 0,
      index: 1,
      allWidth: document.documentElement.getBoundingClientRect().width,
      lastTouchmove: 0, // touchMove 过程中的位置（用于计算偏移量）
      slideSecond: 0.3, // 轮播过渡动画时间
      slideImgs: [] // 图片数组缓存
    }
  }
  componentWillMount() {
    this.setState({'slideImgs': this.props.data.slideData})
  }

  componentWillReceiveProps(nextProps) { //图片数组做二次处理
    nextProps.data.slideData.unshift(nextProps.data.slideData[nextProps.data.slideData.length - 1]);
    nextProps.data.slideData.push(nextProps.data.slideData[1]);
  }

  handleStart (event) { // touch 事件开始
    this.setState({'slideSecond': 0})
    this.setState({'startX': event.touches[0].pageX})
  }

  handleMove (event) { // tocuh Move 触发
    var pianyi = this.state.lastTouchmove === 0 ? 0 : event.touches[0].pageX - this.state.lastTouchmove
    this.setState({'groupLeft': pianyi + this.state.groupLeft})
    this.setState({'lastTouchmove': event.touches[0].pageX})
    this.setState({'endX': event.touches[0].pageX})
  }

  handleEnd (event) { // touch时间结束
    this.setState({'slideSecond': 0.3})
    this.state.lastTouchmove !== 0 && this.endSlide()
    this.setState({'lastTouchmove': 0})
  }

  endSlide () {
    if (Math.abs(this.state.startX - this.state.endX) > (this.state.allWidth / 3)){ // 拖动距离大于整体宽度三分之一时 执行滑动动作
      let number = this.state.startX > this.state.endX ? parseInt(this.state.groupLeft / this.state.allWidth) - 1 : parseInt(this.state.groupLeft / this.state.allWidth)
      this.setState({'groupLeft': number * this.state.allWidth})
      if (number === 0 || number === -(this.props.data.slideData.length - 1)) {
        setTimeout(() => {
          this.setState({'slideSecond': 0})
          if (number === 0) {
            this.setState({'groupLeft': -(this.props.data.slideData.length - 2) * this.state.allWidth})
          } else {
            this.setState({'groupLeft': -this.state.allWidth})
          }
        }, 300)
      }
      this.setDot(number)
      // this.setState({'index': number === this.props.data.slideData.length - 2 ? 1 : number})
    } else { // 拖动距离小于三分之一时 回到当前位置
      let number = this.state.startX > this.state.endX ? parseInt(this.state.groupLeft / this.state.allWidth) : parseInt(this.state.groupLeft / this.state.allWidth) - 1
      this.setState({'groupLeft': number * this.state.allWidth})
      this.setDot(number)
    }
  }

  setDot (num) { // 圆点设置方法
    if (num === 0 || num === -(this.props.data.slideData.length - 1)) {
      this.setState({'index': num === 0 ? this.props.data.slideData.length - 2 : 1})
    } else {
      this.setState({'index': -num})
    }
  }

  render() {
    var _this = this
    return (
      <div className='slide-group' style={{height: this.props.data.height}}>
        <div className='slide-box' style={{
          width: this.props.data.slideData.length * 25 + 'rem',
          height: this.props.data.height,
          transition: `all ease ${this.state.slideSecond}s`,
        left: this.state.groupLeft + 'px'}}>
          {this.props.data.slideData.map((item, i) => ( // 胖箭头写法
            <div className='slide-one' key={i}
              onTouchMove={_this.handleMove.bind(_this)}
              onTouchStart={_this.handleStart.bind(_this)}
              onTouchEnd={_this.handleEnd.bind(_this)}>
              <a>
                <img src={`http://127.0.92.29:3000/images/${item.pic}`} />
              </a>
            </div>
          ))}
        </div>
        <div className='slide-dots'>
          {this.props.data.slideData.map((item, i) => {
            if (i >= 1 && i < _this.props.data.slideData.length - 1) {
              return <div className={`slide-dot ${i === this.state.index && 'dot-active'}`} data-index={i} key={i}></div>
            }
          })}
        </div>
      </div>
    )
  }
}

export default Slide;
