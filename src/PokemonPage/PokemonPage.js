import React from 'react';
import './PokemonPage.css';
import PokemonImage from './PokemonImage';
import Stats from './Stats';
import Moves from './Moves';
import config from '../config';
import { capitalize } from '../helpers';
import Bold from '../helper-components/Bold';
import Loading from '../helper-components/Loading';
import Error from '../helper-components/Error';


class PokemonPage extends React.Component {
  state = {
    error: null,
    loaded: this.props.loaded || false,
    name: this.props.name,
    base_experience: this.props.base_experience,
    height: this.props.height,
    stats: this.props.stats,
    sprites: this.props.sprites,
    moves: this.props.moves
  }

  componentDidMount () {
    // if the data is already saved,
    // use the inherited props.
    if (this.state.loaded) {
      return false;
    }

    // otherwise, fetch the data.
    const { id } = this.props.match.params;
    const url = config.API_BASE_URL + '/pokemon/' + id;

    fetch(url) // i.e. https://pokeapi.co/api/v2/pokemon/1/
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`GET ${url} failed: ${res.statusText}`);
      })
      .then(data => {
        this.props.savePokemonResults(data);
        this.setState({
          ...data,
          loaded: true
        });
      })
      .catch(error => this.setState({ error }));
  }

  render () {
    if (this.state.error) {
      return <Error goBack={this.props.history.goBack}/>
    }

    if (!this.state.loaded) {
      return <Loading/>;
    }

    const {
      name, base_experience, height,
      stats, sprites, moves
    } = this.state;

    return (
      <>
        <PokemonImage src={sprites.front_default} name={name}/>
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
