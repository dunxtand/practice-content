import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import config from '../config';
import { formatQueryParams, extractId } from '../helpers';
import PokemonList from '../PokemonList/PokemonList';
import PokemonPage from '../PokemonPage/PokemonPage';
import PokemonMove from '../PokemonMove/PokemonMove';


class App extends React.Component {

  // store Pokemon in state: https://pokeapi.co/docs/v2.html#pokemon-section
  // store Moves in state: https://pokeapi.co/docs/v2.html#moves-section
  state = {
    pokemon: [],
    moves: []
  }


  componentDidMount = () => this.getNextPokemon();


  renderMainRoutes = () => {
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
          path={'/pokemon/:id'}
          render={routeProps => {
            const id = parseInt(routeProps.match.params.id);
            const monster = this.state.pokemon.find(monst => monst.id === id);

            return <PokemonPage
              {...routeProps}
              {...monster}
              savePokemonResults={this.savePokemonResults}
            />;
          }}
        />

        <Route
          exact
          path={'/move/:id'}
          render={routeProps => {
            const id = parseInt(routeProps.match.params.id);
            const move = this.state.moves.find(move => move.id === id);

            return <PokemonMove
              {...routeProps}
              {...move}
              saveMoveResults={this.saveMoveResults}
            />
          }}
        />
      </>
    );
  }


  getNextPokemon = (offset = 0) => {
    // the Pokemon endpoint offers two optional parameters: offset and limit.
    // offset controls where in the total list you start your results.
    // limit controls how many results are returned.
    const queryString = formatQueryParams({ offset, limit: 10 });
    const url = config.API_BASE_URL + '/pokemon?' + queryString;

    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`GET ${url} failed: ${res.statusText}`);
      })
      .then(data => {
        const pokemon = [...this.state.pokemon, ...data.results]
          .map((monster, index) => {
            return {
              id: extractId(monster.url),
              ...monster
            }
          });

        this.setState({ pokemon });
      });
  }


  shortenList = () => {
    const newLength = this.state.pokemon.length - 10;
    const pokemon = this.state.pokemon.slice(0, newLength);
    this.setState({ pokemon });
  }


  // if a user views an individual Pokemon page,
  // save the data here, so we don't have to fetch it again.
  savePokemonResults = (data) => {
    const pokemon = this.state.pokemon.map(monster => {
      if (monster.id !== data.id) {
        return monster;
      }
      return { ...monster, ...data, loaded: true };
    });

    this.setState({ pokemon });
  }


  // if a user views an individual Move page,
  // save the data here, so we don't have to fetch it again.
  saveMoveResults = (data) => {
    if (this.state.moves.find(move => move.id === data.id)) {
      return false;
    }
    const moves = [...this.state.moves, { ...data, loaded: true}];

    this.setState({ moves });
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
