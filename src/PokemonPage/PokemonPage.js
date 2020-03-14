import React from 'react';
import PokemonImage from './PokemonImage';
import Stats from './Stats';
import Moves from './Moves';
import config from '../config';
import { capitalize } from '../helpers';
import Bold from '../helper-components/Bold';
import Loading from '../helper-components/Loading';


class PokemonPage extends React.Component {
  state = {
    loaded: false,
    base_experience: undefined,
    height: undefined,
    stats: [],
    moves: [],
    name: this.props.name,
    sprites: {
      front_default: undefined
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    const url = config.API_BASE_URL + '/pokemon/' + id;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          ...data,
          loaded: true
      })
    });
  }

  render () {
    if (!this.state.loaded) {
      return <Loading/>;
    }

    const {
      name, base_experience, height,
      stats, sprites, moves
    } = this.state;

    return (
      <>
        <PokemonImage src={sprites.front_default}/>
        <h2>{capitalize(name)}</h2>
        <div>
          <Bold>Base Experience:</Bold> {base_experience}
        </div>
        <div>
          <Bold>Height:</Bold> {height}
        </div>
        <br/>
        <Stats stats={stats}/>
        <br/>
        <Moves moves={moves}/>
      </>
    )
  }
}

export default PokemonPage;
