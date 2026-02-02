import { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getClients,
  getClientStats,
  replaceClients,
  type Client,
} from "@/lib/clients";
import { Mail, MessageSquare, FileDown, FileUp, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const { toast } = useToast();

  const loadClients = useCallback(() => {
    setClients(getClients());
  }, []);

  useEffect(() => {
    loadClients();
    const onStorage = () => loadClients();
    const onClientsUpdated = () => loadClients();
    window.addEventListener("storage", onStorage);
    window.addEventListener("clients-updated", onClientsUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("clients-updated", onClientsUpdated);
    };
  }, [loadClients]);

  const stats = getClientStats(clients);

  const handleExportExcel = () => {
    if (clients.length === 0) {
      toast({ title: "No clients to export", variant: "destructive" });
      return;
    }
    const rows = clients.map((c) => ({
      Name: c.name,
      Email: c.email,
      Phone: c.phone,
      Company: c.company,
      Services: Array.isArray(c.services) ? c.services.join(", ") : c.services,
      Budget: c.budget,
      Message: c.message,
      "Created At": c.createdAt,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");
    XLSX.writeFile(wb, "nextmind-clients.xlsx");
    toast({ title: "Exported to nextmind-clients.xlsx" });
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = ev.target?.result;
        if (!data || typeof data !== "object") return;
        const wb = XLSX.read(data, { type: "array" });
        const firstSheet = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet);
        const imported: Client[] = raw.map((row, i) => ({
          id: crypto.randomUUID(),
          name: String(row.Name ?? row.name ?? ""),
          email: String(row.Email ?? row.email ?? ""),
          phone: String(row.Phone ?? row.phone ?? ""),
          company: String(row.Company ?? row.company ?? ""),
          services: Array.isArray(row.Services)
            ? row.Services
            : typeof row.Services === "string"
              ? (row.Services as string).split(",").map((s) => s.trim())
              : [],
          budget: String(row.Budget ?? row.budget ?? ""),
          message: String(row.Message ?? row.message ?? ""),
          createdAt: String(row["Created At"] ?? row.createdAt ?? new Date().toISOString()),
        }));
        const existing = getClients();
        const merged = [...existing];
        const existingEmails = new Set(existing.map((c) => c.email.toLowerCase()));
        for (const c of imported) {
          if (c.email && !existingEmails.has(c.email.toLowerCase())) {
            merged.push(c);
            existingEmails.add(c.email.toLowerCase());
          }
        }
        replaceClients(merged);
        setClients(merged);
        toast({ title: `Imported ${imported.length} row(s). Total clients: ${merged.length}` });
      } catch (err) {
        toast({ title: "Import failed", description: String(err), variant: "destructive" });
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const handleSendEmail = () => {
    const withEmail = clients.filter((c) => c.email?.trim());
    if (withEmail.length === 0) {
      toast({ title: "No clients with email", variant: "destructive" });
      return;
    }
    toast({
      title: "Bulk email (backend required)",
      description: `Would send to ${withEmail.length} clients. Add a backend + email provider (e.g. SendGrid/Resend) to enable.`,
    });
  };

  const handleSendSms = () => {
    const withPhone = clients.filter((c) => c.phone?.trim());
    if (withPhone.length === 0) {
      toast({ title: "No clients with phone", variant: "destructive" });
      return;
    }
    toast({
      title: "Bulk SMS (backend required)",
      description: `Would send to ${withPhone.length} clients. Add a backend + SMS provider (e.g. Twilio) to enable.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        <h1 className="font-hero text-3xl md:text-4xl font-bold uppercase mb-8 text-foreground">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">{stats.today}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">{stats.thisWeek}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">{stats.thisMonth}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Year</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">{stats.thisYear}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">{stats.total}</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline" onClick={handleSendEmail} className="gap-2">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
          <Button variant="outline" onClick={handleSendSms} className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Send SMS
          </Button>
          <Button variant="outline" onClick={handleExportExcel} className="gap-2">
            <FileDown className="h-4 w-4" />
            Export Excel
          </Button>
          <label className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-10 px-4 py-2 cursor-pointer">
            <FileUp className="h-4 w-4" />
            Import Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleImportExcel}
            />
          </label>
        </div>

        {/* Client list */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clients ({clients.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clients.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">
                No clients yet. Submit the contact form or import an Excel file.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.phone}</TableCell>
                      <TableCell>{c.company}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
