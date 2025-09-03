import { useState } from "react";
import { DollarSign, TrendingUp, Calendar, CheckCircle, Clock, AlertCircle, FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const mockTransactions = [
  {
    id: "1",
    date: "2024-01-22",
    patient: "Maria Silva",
    type: "consultation",
    description: "Consulta de Retorno",
    amount: 250,
    status: "paid",
    paymentMethod: "PIX",
  },
  {
    id: "2",
    date: "2024-01-20",
    patient: "João Santos",
    type: "consultation",
    description: "Primeira Consulta",
    amount: 350,
    status: "paid",
    paymentMethod: "Cartão Crédito",
  },
  {
    id: "3",
    date: "2024-01-18",
    patient: "Ana Costa",
    type: "bioimpedance",
    description: "Bioimpedância",
    amount: 150,
    status: "pending",
    paymentMethod: "-",
  },
  {
    id: "4",
    date: "2024-01-15",
    patient: "Pedro Oliveira",
    type: "consultation",
    description: "Consulta de Retorno",
    amount: 250,
    status: "paid",
    paymentMethod: "Dinheiro",
  },
  {
    id: "5",
    date: "2024-01-12",
    patient: "Lucas Mendes",
    type: "consultation",
    description: "Primeira Consulta",
    amount: 350,
    status: "overdue",
    paymentMethod: "-",
  },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 12500, consultations: 45 },
  { month: "Fev", revenue: 14200, consultations: 52 },
  { month: "Mar", revenue: 13800, consultations: 48 },
  { month: "Abr", revenue: 15600, consultations: 56 },
  { month: "Mai", revenue: 16200, consultations: 58 },
  { month: "Jun", revenue: 18500, consultations: 65 },
];

export default function Financial() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "overdue":
        return "Vencido";
      default:
        return status;
    }
  };

  const totalRevenue = mockTransactions
    .filter((t) => t.status === "paid")
    .reduce((acc, t) => acc + t.amount, 0);

  const pendingRevenue = mockTransactions
    .filter((t) => t.status === "pending" || t.status === "overdue")
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredTransactions = selectedStatus === "all" 
    ? mockTransactions 
    : mockTransactions.filter((t) => t.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Financeiro</h1>
          <p className="text-muted-foreground">
            Acompanhe o faturamento e pagamentos do consultório
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              +12% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {pendingRevenue.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              {mockTransactions.filter((t) => t.status === "pending").length} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Realizadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 285</div>
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              +5% vs mês anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Faturamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenue.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{month.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      {month.consultations} consultas
                    </span>
                    <span className="font-medium">
                      R$ {month.revenue.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(month.revenue / 20000) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações Recentes</CardTitle>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="paid">Pagas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="overdue">Vencidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Forma de Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="font-medium">{transaction.patient}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(transaction.status)}>
                      {getStatusLabel(transaction.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {transaction.amount.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.status === "pending" && (
                      <Button size="sm" variant="ghost" className="text-success">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {transaction.status === "overdue" && (
                      <Button size="sm" variant="ghost" className="text-warning">
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Methods Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">PIX</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">R$ 8.500</div>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-muted-foreground">45% do total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cartão de Crédito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">R$ 6.800</div>
              <Progress value={36} className="h-2" />
              <p className="text-xs text-muted-foreground">36% do total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dinheiro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">R$ 3.200</div>
              <Progress value={19} className="h-2" />
              <p className="text-xs text-muted-foreground">19% do total</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}