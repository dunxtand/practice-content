import React from 'react';
import './PokemonMove.css';
import config from '../config';
import { capitalize, deslugify } from '../helpers';
import Bold from '../helper-components/Bold';
import Loading from '../helper-components/Loading';
import Error from '../helper-components/Error';


class PokemonMove extends React.Component {
  state = {
    error: null,
    loaded: this.props.loaded || false,
    name: this.props.name,
    accuracy: this.props.accuracy || 'N/A',
    effect_entries: this.props.effect_entries,
    effect_chance: this.props.effect_chance,
    type: this.props.type,
    power: this.props.power,
    pp: this.props.pp
  }

  componentDidMount () {
    // if the data is already saved,
    // use the inherited props.
    if (this.state.loaded) {
      return false;
    }

    // otherwise, fetch the data.
    const { id } = this.props.match.params;
    const url = config.API_BASE_URL + '/move/' + id;

    fetch(url) // i.e. https://pokeapi.co/api/v2/move/1/
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`GET ${url} failed: ${res.statusText}`);
      })
      .then(data => {
        this.props.saveMoveResults(data);
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
      name, accuracy,
      effect_entries, effect_chance,
      type, power, pp
    } = this.state;

    let [{ effect } = {}] = effect_entries;
    if (effect) {
      // replace '$effect_chance' with the actual value from the data.
      effect = effect.replace(/\$effect_chance/g, effect_chance);
    }

    return (
      <>
        <h3>{deslugify(name)}</h3>
        <div id="pokemon-move-effect">
          {effect}
        </div>
        <br/>
        <div>
          <Bold>Type:</Bold> {capitalize(type.name)}
        </div>
        <br/>
        <div>
          <Bold>Power:</Bold> {power}
        </div>
        <br/>
        <div>
          <Bold>PP:</Bold> {pp}
        </div>
        <br/>
        <div>
          <Bold>Accuracy:</Bold> {accuracy}
        </div>
        <br/>
        <button onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </>
    );
  }
}

export default PokemonMove;
