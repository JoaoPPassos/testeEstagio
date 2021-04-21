import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Adicao from '../components/Adicao';
import Quantidade from '../components/Quantidade';
import '../styles/Produto.css';
import { useAuth } from '../provider/auth';

export default function Produto() {
  const appContext = useAuth();
  const [comTalher, setComTalher] = useState(false);
  const [qtProdutos, setQtProdutos] = useState(0);

  useEffect(() => {
    fetch("https://6077803e1ed0ae0017d6aea4.mockapi.io/test-frontend/products", {})
      .then(res => res.json())
      .then(result => {
        appContext.setInfos(result);
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <div className="background">
      <Header enderecos={appContext.enderecos} />
      {appContext.infos === null ? null :
        <main className="p-produto">
          <div className="p-produto__oferta">
            <img src={appContext.infos[0].url_image} alt="produto" />
            <h1>
              {appContext.infos[0].nm_product}
            </h1>
            <p className="p-produto__descricao">
              {appContext.infos[0].description}
            </p>

            <div className="p-produto__precos">
              <p className="p-produto__precoAtual">
                R$ {appContext.infos[0].vl_price}
              </p>
              <p className="p-produto__disconto">
                R$ {appContext.infos[0].vl_discount}
              </p>
            </div>
          </div>

          <div className="p-produto__adicionais">
            <div className="p-produto__opcoes p-produto__opcoes--scroll">
              <div className="p-produto__detalhes">
                <p className="p-produto__detalhesTitulo">
                  Adicionar Ingredientes
              </p>
                <p className="p-produto__detalhesDescricao">
                  Até 8 ingredientes
              </p>
              </div>
              {
                appContext.infos[0].ingredients[0].itens.map((ingrediente) =>
                  <Adicao nome={ingrediente.nm_item}
                    preco={ingrediente.vl_item}
                    key={ingrediente.id}
                  />
                )
              }
              <div className="p-produto__detalhes">
                <p className="p-produto__detalhesTitulo">
                  Precisa Talher?
                </p>
              </div>
              <div className="p-produto__talherCheck">
                <div className="p-produto__talherSim">
                  <p>Sim</p>
                  <label className="p-produto__check">
                    <input type="checkbox" onClick={() => setComTalher(!comTalher)} checked={comTalher} />
                    <span className="p-produto__mark"></span>
                  </label>
                </div>
                <div className="p-produto__talherNao">
                  <p>Não</p>
                  <label className="p-produto__check" >
                    <input type="checkbox" onClick={() => setComTalher(!comTalher)} checked={!comTalher} />
                    <span className="p-produto__mark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-produto__confirmacao">
              <Quantidade
                class="c-quantidade__Produto"
                quantidadeSuportada={appContext.infos[0].ingredients[1].max_itens}
                quantidade={[qtProdutos, setQtProdutos]}
                ondeAdicionar={[appContext.qtProduto, appContext.setQtProduto]} />
              <button className="p-produto__button">
                <p>
                  Adicionar
                </p>
              </button>
            </div>
          </div>
        </main>
      }
    </div>
  );
}