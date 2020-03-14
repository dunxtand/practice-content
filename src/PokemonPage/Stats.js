import React from 'react';
import { deslugify } from '../helpers';
import { Bold } from '../helper-components';


function Stats (props) {
  return (
    <>
      <div>
        <Bold>STATS</Bold>
      </div>
      {props.stats.map((statObj, index) => {
        const name = statObj.stat.name;
        const amount = statObj.base_stat;

        return (
          <div key={index}>
            <Bold>{deslugify(name)}:</Bold> {amount}
          </div>
        );
      })}
    </>
  );
}

export default Stats;
