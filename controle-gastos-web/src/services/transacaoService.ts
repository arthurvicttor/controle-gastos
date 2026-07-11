import request from "./api";
import type { Transacao, CriarTransacaoDto } from "../types";

export const transacaoService = {
  listar: () => request<Transacao[]>("/transacoes"),

  criar: (dto: CriarTransacaoDto) =>
    request<Transacao>("/transacoes", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
};
