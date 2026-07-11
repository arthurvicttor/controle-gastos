import type { Transacao } from "../types";
import { TipoTransacao } from "../types";

interface Props {
  transacoes: Transacao[];
}

export function TransacaoList({ transacoes }: Props) {
  if (transacoes.length === 0) {
    return <p>Nenhuma transação cadastrada.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Pessoa</th>
        </tr>
      </thead>
      <tbody>
        {transacoes.map((t) => (
          <tr key={t.id}>
            <td>{t.descricao}</td>
            <td>
              {t.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td
              style={{
                color: t.tipo === TipoTransacao.Receita ? "green" : "crimson",
              }}
            >
              {t.tipo === TipoTransacao.Receita ? "Receita" : "Despesa"}
            </td>
            <td>{t.pessoaNome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
