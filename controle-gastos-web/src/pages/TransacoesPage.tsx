import { useEffect, useState } from "react";
import type { Pessoa, Transacao } from "../types";
import { pessoaService } from "../services/pessoaService";
import { transacaoService } from "../services/transacaoService";
import { TransacaoForm } from "../components/TransacaoForm";
import { TransacaoList } from "../components/TransacaoList";

export function TransacoesPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    setCarregando(true);
    try {
      const [pessoasData, transacoesData] = await Promise.all([
        pessoaService.listar(),
        transacaoService.listar(),
      ]);
      setPessoas(pessoasData);
      setTransacoes(transacoesData);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarDados();
  }, []);

  return (
    <div>
      <h2>Transações</h2>
      <TransacaoForm pessoas={pessoas} onTransacaoCriada={carregarDados} />
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <TransacaoList transacoes={transacoes} />
      )}
    </div>
  );
}
