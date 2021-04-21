import React, { useState } from 'react';

import KeyDown from '../images/arrowDown.png';
import "../styles/Dropdown.css";

export default function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const [labelEndereco, setLabel] = useState("Escolha Endereço")
  const clicado = (action) => setOpen(action);

  const handleOnClick = (item) => {
    setLabel(item.endereco);
    clicado(!open)
  }

  return (
    <div className="c-dropdown"
      tabIndex={0}
    >
      <div className="c-dropdown__title">
        <p className="c-dropdown__title--red">Entrega:</p>
      </div>
      <div className="c-dropdown__status">
        <p className="c-dropdown__status--conf">{labelEndereco}</p>
      </div>
      <div className="c-dropdown__arrowdown" role="button" onClick={() => clicado(!open)}>
        <img src={KeyDown} />
      </div>
      {open && (
        <ul className="c-dropdown__list">
          {props.enderecos.map((end) => (
            <li className="c-dropdown__items" key={end.id}>
              <button className="c-dropdown__items--button" type="button" onClick={() => handleOnClick(end)} >
                <span>
                  {end.endereco}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )
      }
    </div>
  );
}