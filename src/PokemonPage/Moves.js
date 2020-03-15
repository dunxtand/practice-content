import React from 'react';
import { Link } from 'react-router-dom';
import { deslugify, extractId } from '../helpers';
import Bold from '../helper-components/Bold';


function Moves (props) {
  return (
    <>
      <div>
        <Bold>MOVES</Bold>
      </div>
      {props.moves.map((move, index) => {
        const { name, url } = move.move;
        const id = extractId(url);

        return (
          <div key={index}>
            <Link to={`/move/${id}`}>
              {deslugify(name)}
            </Link>
          </div>
        );
      })}
    </>
  )
}

export default Moves;
