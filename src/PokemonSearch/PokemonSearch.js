import React from 'react';
import config from '../config';


class PokemonSearch extends React.Component {
  state = {
    searchName: ''
  }

  updateSearchName = (e) => {
    this.setState({
      searchName: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { searchName } = this.state;
    const url = config.API_BASE_URL + '/pokemon/' + searchName.toLowerCase();

    fetch(url) // i.e. https://pokeapi.co/api/v2/pokemon/bulbasaur
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`GET ${url} failed: ${res.statusText}`);
      })
      .then(data => {
        this.props.history.push(`/pokemon/${data.id}`);
      })
      .catch(err => {
        alert(`Couldn't find pokemon with name: ${searchName}`);
        console.error(err);
      })
  }

  render () {
    return (
      <>
        <h3>
          Search by Name
        </h3>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            placeholder={'search by pokemon name'}
            value={this.state.searchName}
            onChange={this.updateSearchName}
          />
        </form>
      </>
    );
  }
}

export default PokemonSearch;
