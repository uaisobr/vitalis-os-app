import { Phone, Mail, Calendar, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    objective: string;
    lastAppointment: string;
    nextAppointment?: string;
    progress: number;
    avatar?: string;
  };
  onSelect?: () => void;
}

export function PatientCard({ patient, onSelect }: PatientCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="group cursor-pointer transition-all hover:shadow-wellness">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* Patient Info */}
          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {getAge(patient.birthDate)} anos
                </p>
              </div>
              
              {/* Contact */}
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {patient.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {patient.phone}
                </span>
              </div>

              {/* Objective */}
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <Badge variant="outline" className="text-xs">
                  {patient.objective}
                </Badge>
              </div>

              {/* Appointments */}
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium">Última consulta:</span>{" "}
                  {patient.lastAppointment}
                </p>
                {patient.nextAppointment && (
                  <p className="flex items-center gap-1 text-primary">
                    <Calendar className="h-3 w-3" />
                    Próxima: {patient.nextAppointment}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-sm font-medium text-success">
              <TrendingUp className="h-4 w-4" />
              {patient.progress}% do objetivo
            </div>
            <Button size="sm" variant="outline" onClick={onSelect}>
              Ver Prontuário
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}