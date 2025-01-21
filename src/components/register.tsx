import React, { useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC<{ onRegisterSuccess: () => void }> = ({
  onRegisterSuccess,
}) => {
  const [form, setForm] = useState<User>({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser = localStorage.getItem(form.email);
    if (existingUser) {
      alert("Usuário já registrado com esse email!");
      return;
    }

    localStorage.setItem(form.email, JSON.stringify(form));
    alert("Registro bem-sucedido! Faça login.");
    onRegisterSuccess();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Registrar</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
          <input
            type="text"
            name="name"
            placeholder="Insira seu nome"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Insira seu email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Inisra sua senha"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
