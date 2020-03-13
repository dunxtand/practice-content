import React from 'react';

class PokemonListItem extends React.Component {
  viewPage = e => {
    e.preventDefault();
    this.props.history.push(`/pokemon/${this.props.index}`);
  }

  render () {
    return (
      <div>
        <a href="#" onClick={this.viewPage}>
          {this.props.name}
        </a>
      </div>
    );
  }
}

export default PokemonListItem;
