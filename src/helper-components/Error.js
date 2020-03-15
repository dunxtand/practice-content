import React from 'react';
import Bold from './Bold';


function Error ({ goBack = () => {} }) {
  return (
    <div>
      <Bold>
        There was an error displaying this page.
      </Bold>
      <br/><br/>
      <button onClick={goBack}>
        Back
      </button>
    </div>
  )
}

export default Error;
