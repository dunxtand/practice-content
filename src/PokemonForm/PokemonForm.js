import React from 'react';


class PokemonForm extends React.Component {
  state = {}

  componentDidMount () {
    fetch(this.props.url)
      .then(res => res.json())
      .then(data => this.setState({ ...data }))
  }

  render () {
    if (!this.state.sprites) {
      return null;
    }
    
    return (
      <>
        <img src={this.state.sprites.front_default}/>
      </>
    );
  }
}

export default PokemonForm;
