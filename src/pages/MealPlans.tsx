import { useState } from "react";
import { Plus, Search, Filter, Clock, Apple, Calculator, FileText, Copy, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateMealPlan } from "@/components/meal-plans/CreateMealPlan";

const mockMealPlans = [
  {
    id: "1",
    name: "Plano Emagrecimento - Maria Silva",
    patientName: "Maria Silva",
    patientId: "1",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    dailyCalories: 1500,
    dailyProteins: 75,
    dailyCarbs: 150,
    dailyFats: 50,
    status: "active",
    adherence: 87,
    mealsCount: 6,
  },
  {
    id: "2",
    name: "Plano Ganho de Massa - João Santos",
    patientName: "João Santos",
    patientId: "2",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    dailyCalories: 2800,
    dailyProteins: 140,
    dailyCarbs: 350,
    dailyFats: 80,
    status: "active",
    adherence: 65,
    mealsCount: 6,
  },
  {
    id: "3",
    name: "Reeducação Alimentar - Ana Costa",
    patientName: "Ana Costa",
    patientId: "3",
    startDate: "2024-01-18",
    endDate: "2024-03-18",
    dailyCalories: 1800,
    dailyProteins: 90,
    dailyCarbs: 200,
    dailyFats: 60,
    status: "active",
    adherence: 92,
    mealsCount: 5,
  },
  {
    id: "4",
    name: "Performance Esportiva - Pedro Oliveira",
    patientName: "Pedro Oliveira",
    patientId: "4",
    startDate: "2023-12-01",
    endDate: "2024-01-01",
    dailyCalories: 2500,
    dailyProteins: 125,
    dailyCarbs: 300,
    dailyFats: 70,
    status: "expired",
    adherence: 45,
    mealsCount: 5,
  },
];

export default function MealPlans() {
  const [searchQuery, setSearchQuery] = useState("");
  const [createPlanOpen, setCreatePlanOpen] = useState(false);

  const filteredPlans = mockMealPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "expired":
        return "bg-muted text-muted-foreground";
      case "draft":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "";
    }
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 80) return "text-success";
    if (adherence >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Planos Alimentares</h1>
          <p className="text-muted-foreground">
            Gerencie e crie planos personalizados para seus pacientes
          </p>
        </div>
        <Dialog open={createPlanOpen} onOpenChange={setCreatePlanOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Plano Alimentar</DialogTitle>
              <DialogDescription>
                Monte um plano personalizado com cálculo automático de nutrientes
              </DialogDescription>
            </DialogHeader>
            <CreateMealPlan onClose={() => setCreatePlanOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar planos por nome ou paciente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Planos Ativos
                </p>
                <p className="text-2xl font-bold">
                  {mockMealPlans.filter((p) => p.status === "active").length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Adesão Média
                </p>
                <p className="text-2xl font-bold">72%</p>
              </div>
              <Apple className="h-8 w-8 text-success opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Vencendo em 7 dias
                </p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Clock className="h-8 w-8 text-warning opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total de Planos
                </p>
                <p className="text-2xl font-bold">{mockMealPlans.length}</p>
              </div>
              <Calculator className="h-8 w-8 text-secondary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos ({mockMealPlans.length})</TabsTrigger>
          <TabsTrigger value="active">
            Ativos ({mockMealPlans.filter((p) => p.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="expired">
            Vencidos ({mockMealPlans.filter((p) => p.status === "expired").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-wellness transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.patientName} • {plan.mealsCount} refeições/dia
                        </p>
                      </div>

                      {/* Macros */}
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">Calorias: </span>
                          <span className="font-medium">{plan.dailyCalories} kcal</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Proteínas: </span>
                          <span className="font-medium">{plan.dailyProteins}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Carboidratos: </span>
                          <span className="font-medium">{plan.dailyCarbs}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Gorduras: </span>
                          <span className="font-medium">{plan.dailyFats}g</span>
                        </div>
                      </div>

                      {/* Dates and Adherence */}
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={getStatusColor(plan.status)}>
                          {plan.status === "active" ? "Ativo" : "Vencido"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {plan.startDate} - {plan.endDate}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Adesão:</span>
                          <span
                            className={`text-sm font-medium ${getAdherenceColor(
                              plan.adherence
                            )}`}
                          >
                            {plan.adherence}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Visualizar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4">
            {filteredPlans
              .filter((p) => p.status === "active")
              .map((plan) => (
                <Card key={plan.id} className="hover:shadow-wellness transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {plan.patientName} • {plan.mealsCount} refeições/dia
                          </p>
                        </div>

                        {/* Macros */}
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Calorias: </span>
                            <span className="font-medium">{plan.dailyCalories} kcal</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Proteínas: </span>
                            <span className="font-medium">{plan.dailyProteins}g</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Carboidratos: </span>
                            <span className="font-medium">{plan.dailyCarbs}g</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Gorduras: </span>
                            <span className="font-medium">{plan.dailyFats}g</span>
                          </div>
                        </div>

                        {/* Dates and Adherence */}
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={getStatusColor(plan.status)}>
                            Ativo
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {plan.startDate} - {plan.endDate}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Adesão:</span>
                            <span
                              className={`text-sm font-medium ${getAdherenceColor(
                                plan.adherence
                              )}`}
                            >
                              {plan.adherence}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Visualizar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-6">
          <div className="grid gap-4">
            {filteredPlans
              .filter((p) => p.status === "expired")
              .map((plan) => (
                <Card key={plan.id} className="hover:shadow-wellness transition-all opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {plan.patientName} • {plan.mealsCount} refeições/dia
                          </p>
                        </div>

                        {/* Macros */}
                        <div className="flex gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">Calorias: </span>
                            <span className="font-medium">{plan.dailyCalories} kcal</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Proteínas: </span>
                            <span className="font-medium">{plan.dailyProteins}g</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Carboidratos: </span>
                            <span className="font-medium">{plan.dailyCarbs}g</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Gorduras: </span>
                            <span className="font-medium">{plan.dailyFats}g</span>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className={getStatusColor(plan.status)}>
                            Vencido
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {plan.startDate} - {plan.endDate}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Renovar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}