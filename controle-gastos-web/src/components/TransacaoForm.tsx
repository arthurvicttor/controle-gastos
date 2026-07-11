import { useState } from "react";
import type { FormEvent } from "react";
import type { Pessoa } from "../types";
import { TipoTransacao } from "../types";
import { transacaoService } from "../services/transacaoService";

interface Props {
  pessoas: Pessoa[];
  onTransacaoCriada: () => void;
}

export function TransacaoForm({ pessoas, onTransacaoCriada }: Props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const pessoaSelecionada = pessoas.find((p) => p.id === pessoaId);
  const ehMenorDeIdade = pessoaSelecionada
    ? pessoaSelecionada.idade < 18
    : false;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");

    if (!descricao.trim()) {
      setErro("Informe a descrição.");
      return;
    }

    const valorNumero = Number(valor);
    if (!valor || valorNumero <= 0) {
      setErro("Informe um valor válido, maior que zero.");
      return;
    }

    if (!pessoaId) {
      setErro("Selecione uma pessoa.");
      return;
    }

    setCarregando(true);
    try {
      await transacaoService.criar({
        descricao: descricao.trim(),
        valor: valorNumero,
        tipo,
        pessoaId,
      });
      setDescricao("");
      setValor("");
      setTipo(TipoTransacao.Despesa);
      onTransacaoCriada();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar transação.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar transação</h3>

      <div>
        <label>Pessoa</label>
        <select value={pessoaId} onChange={(e) => setPessoaId(e.target.value)}>
          <option value="">Selecione...</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.idade} anos)
            </option>
          ))}
        </select>
      </div>

      {ehMenorDeIdade && (
        <p style={{ color: "darkorange" }}>
          Pessoa menor de idade: apenas despesas podem ser cadastradas.
        </p>
      )}

      <div>
        <label>Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Supermercado, Salário..."
        />
      </div>

      <div>
        <label>Valor</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0,00"
          min={0.01}
        />
      </div>

      <div>
        <label>Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
        >
          <option value={TipoTransacao.Despesa}>Despesa</option>
          <option value={TipoTransacao.Receita} disabled={ehMenorDeIdade}>
            Receita
          </option>
        </select>
      </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
