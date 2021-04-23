import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Adicao from '../components/Adicao';
import Quantidade from '../components/Quantidade';
import '../styles/Produto.css';
import { useAuth } from '../provider/auth';

export default function Produto() {
  const appContext = useAuth();
  const [comTalher, setComTalher] = useState(false);
  const [temProduto, setTemProduto] = useState(true);

  useEffect(() => {
    fetch("https://6077803e1ed0ae0017d6aea4.mockapi.io/test-frontend/products", {})
      .then(res => res.json())
      .then(result => {
        appContext.setInfos(result);
        console.log(result);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (appContext.infos !== null) {
      let arrayAdicao = [];
      let produto = [];
      let apiInfos = appContext.infos[0];

      produto.push({ nome: apiInfos.nm_product, descricao: apiInfos.description, image: apiInfos.url_image, valor: apiInfos.vl_price, valor_disconto: apiInfos.vl_discount, qt: 0 });

      apiInfos.ingredients[0].itens.map((obj) => {
        return arrayAdicao.push({ nome: obj.nm_item, qt: 0, valor: obj.vl_item, key: obj.id });
      })

      appContext.setIngredientes(arrayAdicao);
      appContext.setPedido(produto);
    }

  }, [appContext.infos])

  const adicionarAoCarrinho = (ingredientes, pedido) => {
    let arrayIngrediente = ingredientes;
    let pedidoConfirmado = pedido[0];

    if (pedidoConfirmado.qt > 0) {
      appContext.setDetalhesProduto(pedidoConfirmado)
      appContext.setDetalhesIngredientes(arrayIngrediente)
      appContext.setQtPedidos(appContext.qtPedidos + pedidoConfirmado.qt)

      setTemProduto(true);

    } else {
      setTemProduto(false);
    }
  }

  return (
    <div className="background">
      <Header enderecos={appContext.enderecos} />
      {appContext.pedido === null ? null :
        <main className="p-produto">
          <div className="p-produto__oferta">
            <img src={appContext.pedido[0].image} alt="produto" />
            <h1>
              {appContext.pedido[0].nome}
            </h1>
            <p className="p-produto__descricao">
              {appContext.pedido[0].descricao}
            </p>

            <div className="p-produto__precos">
              <p className="p-produto__precoAtual">
                R$ {appContext.pedido[0].valor_disconto}
              </p>
              <p className="p-produto__disconto">
                R$ {appContext.pedido[0].valor}
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
                appContext.ingredientes.map((ingrediente) => {
                  return <Adicao
                    chave={ingrediente.key}
                    key={ingrediente.key}
                  />
                })
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
                    <input type="checkbox" onClick={() => setComTalher(!comTalher)} checked={comTalher} readOnly={true} />
                    <span className="p-produto__mark"></span>
                  </label>
                </div>
                <div className="p-produto__talherNao">
                  <p>Não</p>
                  <label className="p-produto__check" >
                    <input type="checkbox" onClick={() => setComTalher(!comTalher)} checked={!comTalher} readOnly={true} />
                    <span className="p-produto__mark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-produto__confirmacao">
              <Quantidade
                class="c-quantidade__Produto"
                quantidadeSuportada={appContext.infos[0].ingredients[1].max_itens}
                ondeAdicionar={[appContext.pedido, appContext.setPedido]}
                contador={[appContext.contadorPedido, appContext.setContadorPedido]}
                chave={1}
              />
              <button className="p-produto__button" onClick={() => adicionarAoCarrinho(appContext.ingredientes, appContext.pedido)}>
                <p>
                  Adicionar
                </p>
              </button>
            </div>
          </div>
        </main>
      }

      {!temProduto ?
        <div className="p-produto__notificacao">
          <p>
            Precisa adicionar um produto
          </p>
        </div>
        : null
      }

    </div>
  );
}