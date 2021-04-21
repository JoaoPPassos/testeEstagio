import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/Produto.css';

export default class Produto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enderecos: [{ id: 1, endereco: "R. Antônio Braune, 222" }, { id: 2, endereco: "R. Antônio Braune, 273" }],
      infos: null
    }
  }

  componentDidMount() {
    fetch("https://6077803e1ed0ae0017d6aea4.mockapi.io/test-frontend/products", {})
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          infos: result,
        })
      })
      .catch(err => {
        console.log(err)
      })
  };

  render() {
    return (
      <div className="background">
        <Header enderecos={this.state.enderecos} />
        {this.state.infos === null ? null :
          <main className="p-produto">
            <div className="p-produto__oferta">
              <img src={this.state.infos[0].url_image} />
              <h1>
                {this.state.infos[0].nm_product}
              </h1>
              <p className="p-produto__descricao">
                {this.state.infos[0].description}
              </p>

              <div className="p-produto__precos">
                <p className="p-produto__precoAtual">
                  R$ {this.state.infos[0].vl_price}
                </p>
                <p className="p-produto__disconto">
                  R$ {this.state.infos[0].vl_discount}
                </p>
              </div>
            </div>
            <div className="p-produto__adicionais">

            </div>
          </main>
        }
      </div>
    );
  };
}