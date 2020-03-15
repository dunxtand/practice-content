import React from 'react';
import Bold from './Bold';


class Loading extends React.Component {
  state = {
    animationStarted: false,
    dots: 3,
    minDots: 3,
    maxDots: 6
  }

  componentDidMount () {
    setTimeout(() => this.startAnimation(), 200);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  startAnimation () {
    this.setState({ animationStarted: true });
    this.interval = setInterval(() => {
      let { dots, minDots, maxDots } = this.state;
      dots = (dots + 1) > maxDots ? minDots : (dots + 1);
      this.setState({ dots });
    }, 200);
  }

  render () {
    if (!this.state.animationStarted) {
      return null;
    }

    const message = (this.props.text || 'Loading') + ' ';
    const dots = [...Array(this.state.dots)]
      .map(() => '.')
      .join(' ')

    return (
      <div id="loading-section">
        <Bold>{message + dots}</Bold>
      </div>
    );
  }
}

export default Loading;
