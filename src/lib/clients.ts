/**
 * Client type and localStorage helpers for admin / contact submissions.
 */

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  message: string;
  createdAt: string; // ISO date string
}

const STORAGE_KEY = "nextmind_clients";

export function getClients(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Client[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveClients(clients: Client[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function addClient(client: Omit<Client, "id" | "createdAt">): Client {
  const clients = getClients();
  const newClient: Client = {
    ...client,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  clients.push(newClient);
  saveClients(clients);
  return newClient;
}

export function deleteClient(id: string): void {
  const clients = getClients().filter((c) => c.id !== id);
  saveClients(clients);
}

export function replaceClients(clients: Client[]): void {
  saveClients(clients);
}

/** Stats: count clients by date range */
export function getClientStats(clients: Client[]) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const isAfter = (dateStr: string, threshold: Date) =>
    new Date(dateStr).getTime() >= threshold.getTime();

  return {
    today: clients.filter((c) => isAfter(c.createdAt, todayStart)).length,
    thisWeek: clients.filter((c) => isAfter(c.createdAt, weekStart)).length,
    thisMonth: clients.filter((c) => isAfter(c.createdAt, monthStart)).length,
    thisYear: clients.filter((c) => isAfter(c.createdAt, yearStart)).length,
    total: clients.length,
  };
}
