import React from 'react';
import PokemonForm from '../PokemonForm/PokemonForm';


class PokemonPage extends React.Component {
  state = {
    stats: []
  }

  componentDidMount () {
    fetch(this.props.url)
      .then(res => res.json())
      .then(data => {
        this.setState({ ...data })
      })
  }

  render () {
    return (
      <>
        {this.state.forms && <PokemonForm {...this.state.forms[0]}/>}
        <h2>
          {this.props.name}
        </h2>
        <div>
          Base Experience: {this.state.base_experience}
        </div>
        <div>
          Height: {this.state.height}
        </div>
        {this.state.stats.map((statObj, index) => {
          const name = statObj.stat.name;
          const amount = statObj.base_stat;
          return (
            <div key={index}>
              {name}: {amount}
            </div>
          );
        })}
      </>
    )
  }
}

export default PokemonPage;
