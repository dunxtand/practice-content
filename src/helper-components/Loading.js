import React from 'react';


class Loading extends React.Component {
  state = {
    dots: 3,
    minDots: 3,
    maxDots: 6
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      let { dots, minDots, maxDots } = this.state;
      dots = (dots + 1) > maxDots ? minDots : (dots + 1);
      this.setState({ dots });
    }, 200);
  }
  
  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    const dots = [...Array(this.state.dots)]
      .map(() => '.')
      .join(' ')

    return (
      <div>
        {"Loading " + dots}
      </div>
    );
  }
}

export default Loading;
