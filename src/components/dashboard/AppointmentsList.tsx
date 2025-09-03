import { Clock, User, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appointments = [
  {
    id: "1",
    patient: "Maria Silva",
    time: "09:00",
    type: "Primeira Consulta",
    status: "confirmed",
    phone: "(11) 98765-4321",
  },
  {
    id: "2",
    patient: "João Santos",
    time: "10:30",
    type: "Retorno",
    status: "scheduled",
    phone: "(11) 91234-5678",
  },
  {
    id: "3",
    patient: "Ana Costa",
    time: "14:00",
    type: "Bioimpedância",
    status: "confirmed",
    phone: "(11) 95555-5555",
  },
  {
    id: "4",
    patient: "Pedro Oliveira",
    time: "15:30",
    type: "Retorno",
    status: "scheduled",
    phone: "(11) 94444-4444",
  },
];

const statusColors = {
  scheduled: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function AppointmentsList() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Consultas de Hoje</CardTitle>
        <Button variant="outline" size="sm">
          Ver Agenda Completa
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="group relative flex items-center gap-4 rounded-lg border p-3 transition-all hover:bg-card-hover hover:shadow-sm"
            >
              {/* Time Badge */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{appointment.patient}</p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      statusColors[appointment.status as keyof typeof statusColors]
                    )}
                  >
                    {appointment.status === "confirmed"
                      ? "Confirmado"
                      : "Agendado"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {appointment.time}
                  </span>
                  <span>{appointment.type}</span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {appointment.phone}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="sm" variant="ghost">
                  Iniciar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}