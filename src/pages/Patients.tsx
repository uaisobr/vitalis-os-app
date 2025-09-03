import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientCard } from "@/components/patients/PatientCard";

const mockPatients = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    birthDate: "1990-05-15",
    objective: "Emagrecimento",
    lastAppointment: "15/01/2024",
    nextAppointment: "29/01/2024",
    progress: 65,
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 91234-5678",
    birthDate: "1985-08-22",
    objective: "Ganho de Massa",
    lastAppointment: "10/01/2024",
    nextAppointment: "24/01/2024",
    progress: 40,
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 95555-5555",
    birthDate: "1995-03-10",
    objective: "Reeducação Alimentar",
    lastAppointment: "18/01/2024",
    progress: 80,
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 94444-4444",
    birthDate: "1988-11-30",
    objective: "Performance Esportiva",
    lastAppointment: "12/01/2024",
    nextAppointment: "26/01/2024",
    progress: 55,
  },
];

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Pacientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus {mockPatients.length} pacientes cadastrados
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Paciente
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
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

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos ({mockPatients.length})</TabsTrigger>
          <TabsTrigger value="active">Ativos (98)</TabsTrigger>
          <TabsTrigger value="inactive">Inativos (26)</TabsTrigger>
          <TabsTrigger value="new">Novos (12)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSelect={() => console.log("Selected:", patient.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4">
            {filteredPatients
              .filter((p) => p.nextAppointment)
              .map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onSelect={() => console.log("Selected:", patient.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <div className="grid gap-4">
            {filteredPatients
              .filter((p) => !p.nextAppointment)
              .map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onSelect={() => console.log("Selected:", patient.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <div className="grid gap-4">
            {filteredPatients.slice(0, 2).map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onSelect={() => console.log("Selected:", patient.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}