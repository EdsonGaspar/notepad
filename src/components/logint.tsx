import React, { useState } from "react";

interface Props {
  onLoginSuccess: (name: string) => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = localStorage.getItem(email);
    if (!user) {
      alert("Usuário não encontrado!");
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.password !== password) {
      alert("Senha incorreta!");
      return;
    }

    alert("Login bem-sucedido!");
    onLoginSuccess(parsedUser.name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
