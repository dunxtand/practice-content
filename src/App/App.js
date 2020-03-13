import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import config from '../config';
import { formatQueryParams } from '../helpers';
import PokemonList from '../PokemonList/PokemonList';
import PokemonPage from '../PokemonPage/PokemonPage';


class App extends React.Component {
  state = {
    pokemon: []
  }

  componentDidMount () {
    this.getNextPokemon();
  }

  renderMainRoutes () {
    return (
      <>
        <Route
          exact
          path={'/'}
          render={routeProps => {
            const nextPageOffset = this.state.pokemon.length;

            return <PokemonList
              {...routeProps}
              pokemon={this.state.pokemon}
              getNextPokemon={() => this.getNextPokemon(nextPageOffset)}
              shortenList={this.shortenList}
            />
          }}
        />

        <Route
          exact
          path={'/pokemon/:index'}
          render={routeProps => {
            const index = parseInt(routeProps.match.params.index);
            const monster = this.state.pokemon[index];
            return <PokemonPage
              {...routeProps}
              {...monster}
            />;
          }}
        />
      </>
    );
  }

  getNextPokemon = (offset = 0) => {
    const queryString = formatQueryParams({ offset, limit: 10 });
    const url = `${config.API_BASE_URL}/pokemon?${queryString}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pokemon: [...this.state.pokemon, ...data.results]
        });
      });
  }

  shortenList = () => {
    const newLength = this.state.pokemon.length - 10;
    const newPokemon = this.state.pokemon.slice(0, newLength);
    this.setState({
      pokemon: newPokemon
    })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            Pokemon Navigator
          </Link>
        </header>
        {this.renderMainRoutes()}
      </div>
    );
  }
}

export default App;
