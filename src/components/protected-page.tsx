import React, { useState } from "react";
import { cn } from "../lib/utils"; // Helper para classes do shadcn/ui
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Start } from "./start";
import { DashboardCard } from "./dashboard";

interface ProtectedPageProps {
  name: string;
  onLogout: () => void;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ name, onLogout }) => {
  const [activePage, setActivePage] = useState<
    "dashboard" | "profile" | "settings"
  >("dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para controlar visibilidade da sidebar

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {isSidebarVisible && (
        <div className="w-64 bg-white shadow-md border-r border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-800">Olá, {name}!</h1>
          </div>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActivePage("dashboard")}
              className={cn(
                "w-full text-left px-4 py-2 rounded-md font-medium hover:bg-slate-100",
                activePage === "dashboard" && "bg-slate-100 text-slate-800"
              )}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActivePage("profile")}
              className={cn(
                "w-full text-left px-4 py-2 rounded-md font-medium hover:bg-slate-100",
                activePage === "profile" && "bg-slate-100 text-slate-800"
              )}
            >
              Perfil
            </button>
            <button
              onClick={() => setActivePage("settings")}
              className={cn(
                "w-full text-left px-4 py-2 rounded-md font-medium hover:bg-slate-100",
                activePage === "settings" && "bg-slate-100 text-slate-800"
              )}
            >
              Configurações
            </button>
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 rounded-md font-medium text-red-600 hover:bg-red-50"
            >
              Sair
            </button>
          </nav>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8 relative">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="mb-4 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 absolute top-4 left-2"
        >
          {isSidebarVisible ? <PanelLeftClose /> : <PanelRightClose />}
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

// Componentes das páginas individuais
const Dashboard: React.FC = () => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
    {/* <p className="mt-2 text-slate-600">Bem-vindo à sua área de trabalho!</p> */}
    <DashboardCard />
  </div>
);

const Profile: React.FC = () => (
  <div className="mt-8">
    {/* <h2 className="text-2xl font-bold text-slate-800">Perfil</h2>
    <p className="mt-2 text-slate-600">Aqui estão os detalhes do seu perfil.</p> */}
    <Start />
  </div>
);

const Settings: React.FC = () => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-slate-800">Configurações</h2>
    <p className="mt-2 text-slate-600">Ajuste suas preferências aqui.</p>
  </div>
);

export default ProtectedPage;
