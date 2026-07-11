import { useEffect, useState } from "react";
import type { ConsultaTotais } from "../types";
import { totaisService } from "../services/totaisService";

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function TotaisPage() {
  const [totais, setTotais] = useState<ConsultaTotais | null>(null);
  const [carregando, setCarregando] = useState(true);

  async function carregarTotais() {
    setCarregando(true);
    try {
      const dados = await totaisService.consultar();
      setTotais(dados);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarTotais();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (!totais) return <p>Erro ao carregar totais.</p>;

  return (
    <div>
      <h2>Totais</h2>

      <button onClick={carregarTotais}>Atualizar</button>

      <table>
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {totais.pessoas.map((p) => (
            <tr key={p.pessoaId}>
              <td>{p.pessoaNome}</td>
              <td style={{ color: "green" }}>
                {formatarMoeda(p.totalReceitas)}
              </td>
              <td style={{ color: "crimson" }}>
                {formatarMoeda(p.totalDespesas)}
              </td>
              <td style={{ color: p.saldo >= 0 ? "green" : "crimson" }}>
                {formatarMoeda(p.saldo)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Total geral</strong>
            </td>
            <td style={{ color: "green" }}>
              <strong>{formatarMoeda(totais.totalGeralReceitas)}</strong>
            </td>
            <td style={{ color: "crimson" }}>
              <strong>{formatarMoeda(totais.totalGeralDespesas)}</strong>
            </td>
            <td style={{ color: totais.saldoGeral >= 0 ? "green" : "crimson" }}>
              <strong>{formatarMoeda(totais.saldoGeral)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
