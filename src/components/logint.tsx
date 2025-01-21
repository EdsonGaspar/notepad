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
    <div className=" flex items-center justify-center min-h-screen bg-slate-100 w-screen h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="password"
            placeholder="Insira a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
