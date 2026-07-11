const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const mensagem = await response.text();
    throw new Error(mensagem || `Erro ${response.status}`);
  }

  if (response.status === 204) return undefined as T;

  return response.json();
}

export default request;
