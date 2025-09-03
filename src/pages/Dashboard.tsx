import { Users, Calendar, TrendingUp, DollarSign, Apple, Activity, Plus, CalendarPlus, Utensils } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { AppointmentsList } from "@/components/dashboard/AppointmentsList";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display">
          Bom dia, Dra. Thais! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está o resumo da sua clínica hoje
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <button 
          onClick={() => navigate('/patients')}
          className="group relative overflow-hidden rounded-xl bg-gradient-card p-6 text-left shadow-md transition-all hover:shadow-wellness"
        >
          <div className="relative z-10">
            <Plus className="mb-3 h-8 w-8 text-primary" />
            <h3 className="font-semibold">Novo Paciente</h3>
            <p className="text-sm text-muted-foreground">
              Cadastre um novo paciente
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 transition-transform group-hover:scale-110" />
        </button>

        <button 
          onClick={() => navigate('/appointments')}
          className="group relative overflow-hidden rounded-xl bg-gradient-card p-6 text-left shadow-md transition-all hover:shadow-wellness"
        >
          <div className="relative z-10">
            <CalendarPlus className="mb-3 h-8 w-8 text-secondary" />
            <h3 className="font-semibold">Agendar Consulta</h3>
            <p className="text-sm text-muted-foreground">
              Marque uma nova consulta
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-secondary/10 transition-transform group-hover:scale-110" />
        </button>

        <button 
          onClick={() => navigate('/meal-plans')}
          className="group relative overflow-hidden rounded-xl bg-gradient-card p-6 text-left shadow-md transition-all hover:shadow-wellness"
        >
          <div className="relative z-10">
            <Utensils className="mb-3 h-8 w-8 text-accent" />
            <h3 className="font-semibold">Criar Plano</h3>
            <p className="text-sm text-muted-foreground">
              Monte um plano alimentar
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 transition-transform group-hover:scale-110" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Pacientes"
          value="124"
          description="12 novos este mês"
          icon={Users}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Consultas Hoje"
          value="8"
          description="2 primeiras consultas"
          icon={Calendar}
        />
        <StatsCard
          title="Taxa de Adesão"
          value="87%"
          description="Planos alimentares seguidos"
          icon={Apple}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Faturamento Mensal"
          value="R$ 18.5k"
          description="Meta: R$ 20k"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Appointments - Takes 2 columns */}
        <div className="lg:col-span-2">
          <AppointmentsList />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <button className="group relative overflow-hidden rounded-xl bg-gradient-card p-6 text-left shadow-md transition-all hover:shadow-wellness">
          <div className="relative z-10">
            <Users className="mb-3 h-8 w-8 text-primary" />
            <h3 className="font-semibold">Novo Paciente</h3>
            <p className="text-sm text-muted-foreground">
              Cadastre um novo paciente
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 transition-transform group-hover:scale-110" />
        </button>

        <button className="group relative overflow-hidden rounded-xl bg-gradient-card p-6 text-left shadow-md transition-all hover:shadow-wellness">
          <div className="relative z-10">
            <Calendar className="mb-3 h-8 w-8 text-secondary" />
            <h3 className="font-semibold">Agendar Consulta</h3>
            <p className="text-sm text-muted-foreground">
              Marque uma nova consulta
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-secondary/10 transition-transform group-hover:scale-110" />
        </button>

        <button className="group relative overflow-hidden rounded-xl bg-gradient-card p-6 text-left shadow-md transition-all hover:shadow-wellness">
          <div className="relative z-10">
            <Activity className="mb-3 h-8 w-8 text-accent" />
            <h3 className="font-semibold">Criar Plano</h3>
            <p className="text-sm text-muted-foreground">
              Monte um plano alimentar
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}