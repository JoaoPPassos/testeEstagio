import React, { useState, useEffect } from 'react';
import Adicionar from '../images/Adicionar.png'
import Subtrair from '../images/Subtrair.png'

import "../styles/Quantidade.css";

export default function Quantidade(props) {
  const [ativo, setAtivo] = useState(false);
  const [quantidade, setQuantidade] = props.quantidade ?? 0;
  const quantidadeMaxima = props.quantidadeSuportada ?? 0;
  const [value, setValue] = props.ondeAdicionar ?? 0;

  const changeAdicao = (estado) => setAtivo(estado);

  useEffect(() => {
    if ((quantidade === 1 && !ativo) || (quantidade === 0 && ativo))
      changeAdicao(!ativo);

  }, [quantidade, ativo]);

  return (
    <div className={`${props.class}`}>
      {
        !ativo ?
          <div className="c-adicao__quantidadeAdicao">
            <button className="c-adicao__adicionar" onClick={() => {
              if (value < quantidadeMaxima) {
                setValue(value + 1)
                setQuantidade(quantidade + 1)
              }
            }}>
              <img src={Adicionar} alt="adicionar" />
            </button>
          </div>
          :
          <div className="c-adicao__quantidadeAdicao--active">
            <button className="c-adicao__diminuir" onClick={() => {
              if (value > 0) {
                setValue(value - 1)
                setQuantidade(quantidade - 1)
              }
            }}>
              <img src={Subtrair} alt="subtrair" />
            </button>
            <p>
              {quantidade}
            </p>
            <button className="c-adicao__adicionar" onClick={() => {
              if (value < quantidadeMaxima) {
                setValue(value + 1)
                setQuantidade(quantidade + 1)
              }
            }}>
              <img src={Adicionar} alt="adicionar" />
            </button>
          </div>
      }
    </div>
  );
}