import React from "react";

interface Props {
  name: string;
  onLogout: () => void;
}

const ProtectedPage: React.FC<Props> = ({ name, onLogout }) => {
  return (
    <div>
      <h2>Bem-vindo, {name}!</h2>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
};

export default ProtectedPage;
