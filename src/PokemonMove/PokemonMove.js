import React from 'react';
import config from '../config';
import { deslugify } from '../helpers';


class PokemonMove extends React.Component {
  state = {
    name: undefined,
    accuracy: undefined,
    effect_entries: []
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    const url = config.API_BASE_URL + '/move/' + id;

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ ...data }));
  }

  render () {
    const { name, accuracy, effect_entries } = this.state;

    return (
      <>
        <h3>{deslugify(name)}</h3>
        <div>
          Accuracy: {accuracy || 'N/A'}
        </div>
        <br/>
        <div>
          {effect_entries.length > 0 &&
            <div>
              {effect_entries[0].effect}
            </div>
          }
        </div>
      </>
    );
  }
}

export default PokemonMove;
