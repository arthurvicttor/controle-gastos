import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { PessoasPage } from "./pages/PessoasPage";
import { TransacoesPage } from "./pages/TransacoesPage";
import { TotaisPage } from "./pages/TotaisPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
        <h1>Controle de Gastos Residenciais</h1>
        <p style={{ color: "var(--cor-texto-suave)", marginTop: 0 }}>
          Cadastre pessoas, registre transações e acompanhe os totais.
        </p>

        <nav style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <NavLink to="/" end>
            Pessoas
          </NavLink>
          <NavLink to="/transacoes">Transações</NavLink>
          <NavLink to="/totais">Totais</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<PessoasPage />} />
          <Route path="/transacoes" element={<TransacoesPage />} />
          <Route path="/totais" element={<TotaisPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
