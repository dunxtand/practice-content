import React from 'react';
import './PokemonSearch.css';
import config from '../config';
import Loading from '../helper-components/Loading';


class PokemonSearch extends React.Component {
  state = {
    searchName: '',
    errorMessage: '',
    loading: false
  }

  updateSearchName = (e) => {
    this.setState({
      searchName: e.target.value,
      errorMessage: ''
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.searchName) {
      return this.setState({
        errorMessage: 'You didn\'t enter a name!'
      });
    }

    this.setState({ errorMessage: '' });

    const { searchName } = this.state;
    const url = config.API_BASE_URL + '/pokemon/' + searchName.toLowerCase();

    this.setState({ loading: true });

    fetch(url) // i.e. https://pokeapi.co/api/v2/pokemon/bulbasaur
      .then(res => {
        this.setState({ loading: false });
        if (res.ok) {
          return res.json();
        }
        throw new Error(`GET ${url} failed: ${res.statusText}`);
      })
      .then(data => {
        this.props.history.push(`/pokemon/${data.id}`);
      })
      .catch(err => {
        this.setState({
          errorMessage: `Couldn't find pokemon with name: ${searchName}`
        });
      })
  }

  render () {
    const { loading, errorMessage } = this.state;

    return (
      <>
        <h3>
          Search by Name
        </h3>
        <form id="pokemon-search" onSubmit={e => this.onSubmit(e)}>
          <input
            placeholder={'enter a name here'}
            onChange={this.updateSearchName}
          />
          <button type="submit">
            Search
          </button>
        </form>
        <div id="pokemon-search-error">
          {loading ? <Loading text="Searching"/> : errorMessage}
        </div>
      </>
    );
  }
}

export default PokemonSearch;
