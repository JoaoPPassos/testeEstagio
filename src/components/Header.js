import React, { useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import Logo1 from '../images/Logo1.png';
import Logo2 from '../images/Logo2.png';
import Account from '../images/account.png';
import Cart from '../images/cart.png';
import Arrow from '../images/arrowDown.png';
import "../styles/Header.css";

import { useAuth } from '../provider/auth';

export default function Header(props) {
  const appContext = useAuth();
  var produto = appContext.detalhesProduto;
  var ingredientes = appContext.detalhesIngredientes;

  useEffect(() => {
    setTimeout(() => {
      appContext.setDetalhesProduto(null);
      appContext.setDetalhesIngredientes(null);
    }, 4000);
  }, [produto, ingredientes]);

  return (
    <header className="c-header">
      <img className="c-header__back" src={Arrow} alt="back_arrow" />
      <div className="c-header__logoArea">
        <img className="c-header__logo--One" src={Logo1} alt="logo1" />
        <img className="c-header__logo--Two" src={Logo2} alt="logo2" />
      </div>

      <Dropdown enderecos={props.enderecos} />
      <Input />

      <div className="c-header__account">
        <img src={Account} alt="account" />
        <p className="c-header__account--text">Entrar</p>
      </div>

      <div className="c-header__cart">
        <img src={Cart} alt="cart" />
        <div className="c-header__cartIndicator">
          <p>
            {appContext.qtPedidos}
          </p>
        </div>
        <p className="c-header__cart--text">Carrinho</p>

        {produto !== null && ingredientes !== null ?
          <div className="c-header__confirmacaoAdicao">
            <div className="c-header__indicador"></div>
            <div className="c-header__titleConfirmacao">
              <p>
                Adicionado com Sucesso
              </p>
            </div>
            <div className="c-header__produtoConfirmado">
              <div className="c-header__nomeProduto">
                <p>
                  {produto.qt} {produto.nome}
                </p>
              </div>
              <p className="c-header__ingredientesTitle">
                Ingredientes:
            </p>
              <div className="c-header__ingredientes">
                {
                  ingredientes.map((pedido) => {
                    if (pedido.qt > 0) {
                      return <li>
                        {pedido.qt} {pedido.nome}
                      </li>
                    }
                    return null
                  }
                  )
                }
              </div>
            </div>
          </div>
          : null
        }
      </div>
    </header >
  );
}