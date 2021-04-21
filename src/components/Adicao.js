import React, { useState } from 'react';
import Quantidade from './Quantidade';
import { useAuth } from '../provider/auth';

import "../styles/Adicao.css";


export default function Adicao(props) {
  const appContext = useAuth();
  const [qtAtual, setQtAtual] = useState(0);

  return (
    <div className="c-adicao">
      <p className="c-adicao__nomeAdicao">
        {props.nome}
      </p>
      <Quantidade
        class="c-quantidade__Adicao"
        quantidadeSuportada={appContext.infos[0].ingredients[0].max_itens}
        quantidade={[qtAtual, setQtAtual]}
        ondeAdicionar={[appContext.qtIngredientes, appContext.setQtIngredientes]} />
      <p className="c-adicao__precoAdicao">
        + R$ {(props.preco).toFixed(2).toString().replace(".", ",")}
      </p>
    </div>
  );
}