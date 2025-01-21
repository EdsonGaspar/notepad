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
    <form onSubmit={handleSubmit}>
      <h2>Registrar</h2>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
