import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import Logo1 from '../images/Logo1.png';
import Logo2 from '../images/Logo2.png';
import Account from '../images/account.png';
import Cart from '../images/cart.png';
import "../styles/Header.css";

export default function Header(props) {
  return (
    <header className="c-header">
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
        <p className="c-header__cart--text">Carrinho</p>
      </div>
      <div className="c-header__quantidade">
        <p>1</p>
      </div>
    </header >
  );
}