import React, { useState } from "react";

interface Props {
  onLoginSuccess: (name: string) => void;
  onNavigateToRegister: () => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  //   const validate = () => {
  //     let isValid = true;
  //     const newErrors = { email: "", password: "" };

  //     if (!email) {
  //       newErrors.email = "Por favor, insira seu email!";
  //       isValid = false;
  //     } else if (!/\S+@\S+\.\S+/.test(email)) {
  //       newErrors.email = "O email informado não é válido!";
  //       isValid = false;
  //     }

  //     if (!password) {
  //       newErrors.password = "Por favor, insira sua senha!";
  //       isValid = false;
  //     }

  //     setErrors(newErrors);
  //     return isValid;
  //   };

  //     const handleSubmit = (e: React.FormEvent) => {
  //       e.preventDefault();
  //       if (validate()) {
  //         alert("Login enviado!");
  //       }
  //     };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();

  //     const user = localStorage.getItem(email);
  //     if (!user) {
  //       alert("Usuário não encontrado!");
  //       return;
  //     }

  //     const parsedUser = JSON.parse(user);
  //     if (parsedUser.password !== password) {
  //       alert("Senha incorreta!");
  //       return;
  //     }

  //     alert("Login bem-sucedido!");
  //     onLoginSuccess(parsedUser.name); // Chama a função que leva à página protegida
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return alert("Por favor, insira um email válido!");
    }

    if (!password) {
      return alert("Por favor, insira sua senha!");
    }

    const user = localStorage.getItem(email);
    if (!user) {
      return alert("Usuário não encontrado!");
    }

    const { password: storedPassword, name } = JSON.parse(user);
    if (storedPassword !== password) {
      return alert("Senha incorreta!");
    }

    alert("Login bem-sucedido!");
    onLoginSuccess(name);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Entrar</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
          <div>
            <label
              className="block text-slate-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-slate-700 font-medium mb-1"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-slate-600 mt-4">
          Não tem uma conta?{" "}
          <button
            onClick={onNavigateToRegister}
            className="text-slate-800 font-medium hover:underline"
          >
            Clique aqui para se cadastrar
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
