import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/Produto.css';

export default class Produto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enderecos: [{ id: 1, endereco: "R. Antônio Braune, 222" }, { id: 2, endereco: "R. Antônio Braune, 273" }]
    }
  }

  render() {
    return (
      <div className="background">
        <Header enderecos={this.state.enderecos} />
      </div>
    );
  };
}