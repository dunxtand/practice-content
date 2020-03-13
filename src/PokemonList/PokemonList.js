import React from 'react';
import './PokemonList.css';
import PokemonListItem from '../PokemonListItem/PokemonListItem';


function PokemonList (props) {
  return (
    <div>
      {props.pokemon.map((monster, index) => {
        return <PokemonListItem
          key={index}
          index={index}
          name={monster.name}
          history={props.history}
        />;
      })}
      <button onClick={props.getNextPokemon}>
        See More
      </button>
      {props.pokemon.length > 10 &&
        <button onClick={props.shortenList}>
          See Fewer
        </button>
      }
    </div>
  )
}

export default PokemonList;
