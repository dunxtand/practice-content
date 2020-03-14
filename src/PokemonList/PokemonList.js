import React from 'react';
import './PokemonList.css';
import PokemonListItem from './PokemonListItem';


function PokemonList (props) {
  return (
    <div>
      {props.pokemon.map(monster => {
        return <PokemonListItem
          key={monster.id}
          id={monster.id}
          name={monster.name}
        />;
      })}
      <br/>
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
