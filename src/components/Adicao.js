import React from 'react';
import Quantidade from './Quantidade';
import { useAuth } from '../provider/auth';

import "../styles/Adicao.css";


export default function Adicao(props) {
  const appContext = useAuth();
  const key = props.chave;
  const [contador, setContador] = [appContext.contadorIngredientes, appContext.setContadorIngredientes];

  return (
    <div className="c-adicao">
      <p className="c-adicao__nomeAdicao">
        {appContext.ingredientes[key - 1].nome}
      </p>
      <Quantidade
        class="c-quantidade__Adicao"
        quantidadeSuportada={appContext.infos[0].ingredients[0].max_itens}
        ondeAdicionar={[appContext.ingredientes, appContext.setIngredientes]}
        contador={[contador, setContador]}
        chave={key}
      />
      <p className="c-adicao__precoAdicao">
        + R$ {(appContext.ingredientes[key - 1].valor).toFixed(2).toString().replace(".", ",")}
      </p>
    </div>
  );
}