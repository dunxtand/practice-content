import React from 'react';
import config from '../config';
import { capitalize, deslugify } from '../helpers';
import Bold from '../helper-components/Bold';
import Loading from '../helper-components/Loading';


class PokemonMove extends React.Component {
  state = {
    loaded: false,
    name: undefined,
    accuracy: undefined,
    type: undefined,
    power: undefined,
    pp: undefined,
    effect_entries: [],
    type: {}
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    const url = config.API_BASE_URL + '/move/' + id;

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
      name, accuracy = 'N/A',
      effect_entries, effect_chance,
      type, power, pp
    } = this.state;

    let [{ effect } = {}] = effect_entries;
    if (effect) {
      effect = effect.replace('$effect_chance', effect_chance);
    }

    return (
      <>
        <h3>{deslugify(name)}</h3>
        <div>
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
