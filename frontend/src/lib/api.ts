const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorBody.message || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export const api = {
  getHealth: () => request<{ status: string; mode: string }>(' /health'.replace(' /', '/')),
  getProjects: () => request<{ data: any[] } >('/projects'),
  getSkills: () => request<{ data: any[] }>('/skills'),
  getBrands: () => request<{ data: any[] }>('/brands'),
  getExperience: () => request<{ data: any[] }>('/experience'),
  getAiModels: () => request<{ data: any[] }>('/ai-models'),
  submitContact: (payload: Record<string, string>) => request<{ message: string; data?: any }>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  loginAdmin: (payload: { email: string; password: string }) => request<{ token: string; user: { email: string } }>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getAdminDashboard: (token: string) => request<{ data: { stats: Record<string, number> } }>('/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  }),
};
