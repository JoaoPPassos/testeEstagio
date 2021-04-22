import React, { useState, useEffect } from 'react';
import Adicionar from '../images/Adicionar.png'
import Subtrair from '../images/Subtrair.png'
import { useAuth } from '../provider/auth';

import "../styles/Quantidade.css";

export default function Quantidade(props) {
  const [ativo, setAtivo] = useState(false);
  const quantidadeMaxima = props.quantidadeSuportada ?? 0;
  const [value, setValue] = props.ondeAdicionar ?? [];
  const [medidor, setMedidor] = props.contador ?? 0;
  const key = props.chave ?? 0;

  const changeAdicao = (estado) => setAtivo(estado);


  useEffect(() => {
    if ((value[key - 1].qt === 1 && !ativo) || (value[key - 1].qt === 0 && ativo))
      changeAdicao(!ativo);
  }, [value[key - 1].qt, ativo]);

  const colocarQtNo = (estado, value) => {
    let array = estado;
    array[key - 1] = { ...array[key - 1], qt: value }

    setValue(array);
  }

  return (
    <div className={`${props.class}`}>
      {
        !ativo ?
          <div className="c-adicao__quantidadeAdicao">
            <button className="c-adicao__adicionar" onClick={() => {
              if (medidor < quantidadeMaxima) {
                setMedidor(medidor + 1)
                colocarQtNo(value, value[key - 1].qt + 1)
              }
            }}>
              <img src={Adicionar} alt="adicionar" />
            </button>
          </div>
          :
          <div className="c-adicao__quantidadeAdicao--active">
            <button className="c-adicao__diminuir" onClick={() => {
              if (medidor > 0) {
                setMedidor(medidor - 1)
                colocarQtNo(value, value[key - 1].qt - 1)
              }
            }}>
              <img src={Subtrair} alt="subtrair" />
            </button>
            <p>
              {value[key - 1].qt}
            </p>
            <button className="c-adicao__adicionar" onClick={() => {
              if (medidor < quantidadeMaxima) {
                setMedidor(medidor + 1)
                colocarQtNo(value, value[key - 1].qt + 1)
              }
            }}>
              <img src={Adicionar} alt="adicionar" />
            </button>
          </div>
      }
    </div>
  );
}