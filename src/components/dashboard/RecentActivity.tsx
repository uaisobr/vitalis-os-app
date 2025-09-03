import { Activity, FileText, MessageSquare, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: "1",
    type: "diary",
    icon: FileText,
    title: "Maria Silva preencheu o diário alimentar",
    description: "Café da manhã e almoço registrados",
    time: "Há 5 minutos",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "2",
    type: "message",
    icon: MessageSquare,
    title: "Nova mensagem de João Santos",
    description: '"Posso substituir o frango por peixe?"',
    time: "Há 15 minutos",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "3",
    type: "weight",
    icon: Scale,
    title: "Ana Costa atualizou o peso",
    description: "65.5 kg → 64.8 kg (-0.7 kg)",
    time: "Há 1 hora",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "4",
    type: "diary",
    icon: FileText,
    title: "Pedro Oliveira preencheu o diário",
    description: "Jantar registrado com foto",
    time: "Há 2 horas",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "5",
    type: "activity",
    icon: Activity,
    title: "Lucas Mendes completou 7 dias seguidos",
    description: "Streak de diário alimentar",
    time: "Há 3 horas",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Atividade dos Pacientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${activity.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}