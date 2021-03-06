import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../helpers';


function PokemonListItem (props) {
  const { name, id } = props;

  return (
    <div className="pokemon-list-item">
      <Link to={`/pokemon/${id}`}>
        {capitalize(name)}
      </Link>
    </div>
  );
}

export default PokemonListItem;
