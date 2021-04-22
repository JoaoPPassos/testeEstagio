import React, { useState } from 'react';

export const AuthContext = React.createContext({})

export function AuthProvider(props) {
  const [enderecos, setEnderecos] = useState([
    { id: 1, endereco: "R. Antônio Braune, 222" }, { id: 2, endereco: "R. Antônio Braune, 273" }
  ]);
  const [infos, setInfos] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [pedido, setPedido] = useState(null);
  const [contadorIngredientes, setContadorIngredientes] = useState(0);
  const [contadorPedido, setContadorPedido] = useState(0);

  return (
    <AuthContext.Provider value={{ enderecos, setEnderecos, infos, setInfos, ingredientes, setIngredientes, contadorIngredientes, setContadorIngredientes, pedido, setPedido, contadorPedido, setContadorPedido }}>
      {props.children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => React.useContext(AuthContext);