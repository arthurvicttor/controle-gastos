import request from "./api";
import type { ConsultaTotais } from "../types";

export const totaisService = {
  consultar: () => request<ConsultaTotais>("/totais"),
};
