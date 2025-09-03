import { useState } from "react";
import { ArrowLeft, Edit, Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BodyVisualization } from "@/components/anthropometry/BodyVisualization";
import { Progress } from "@/components/ui/progress";

interface MeasurementsData {
  neck?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  rightArm?: number;
  leftArm?: number;
  rightThigh?: number;
  leftThigh?: number;
  rightCalf?: number;
  leftCalf?: number;
}

export default function PatientDetail() {
  const [measurements, setMeasurements] = useState<MeasurementsData>({
    neck: 38,
    chest: 95,
    waist: 82,
    hip: 98,
    rightArm: 32,
    leftArm: 31,
    rightThigh: 58,
    leftThigh: 57,
    rightCalf: 38,
    leftCalf: 37,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Maria Silva" />
            <AvatarFallback className="bg-gradient-primary text-white text-lg">
              MS
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold font-display">Maria Silva</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>34 anos</span>
              <span>•</span>
              <span>Paciente há 6 meses</span>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                Emagrecimento
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mensagem
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="anamnesis">Anamnese</TabsTrigger>
          <TabsTrigger value="anthropometry">Antropometria</TabsTrigger>
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">maria.silva@email.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telefone</p>
                  <p className="font-medium">(11) 98765-4321</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data de Nascimento</p>
                  <p className="font-medium">15/05/1990</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Profissão</p>
                  <p className="font-medium">Advogada</p>
                </div>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso do Objetivo</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Peso Inicial</p>
                    <p className="text-xl font-bold">78.5 kg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Peso Atual</p>
                    <p className="text-xl font-bold text-success">72.3 kg</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Meta</p>
                  <p className="font-medium">68 kg até Março/2024</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Diário Alimentar</p>
                  <p className="text-muted-foreground">Preenchido hoje às 14:30</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Última Consulta</p>
                  <p className="text-muted-foreground">15/01/2024</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Próxima Consulta</p>
                  <p className="text-primary font-medium">29/01/2024 às 10:00</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Adesão ao Plano</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={87} className="h-2 flex-1" />
                    <span className="font-medium text-success">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">-6.2 kg</p>
                  <p className="text-sm text-muted-foreground">Perda Total</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">23.8</p>
                  <p className="text-sm text-muted-foreground">IMC Atual</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">28%</p>
                  <p className="text-sm text-muted-foreground">Gordura Corporal</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Consultas Realizadas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Anthropometry Tab */}
        <TabsContent value="anthropometry" className="mt-6">
          <BodyVisualization
            gender="female"
            measurements={measurements}
            onMeasurementChange={setMeasurements}
          />
        </TabsContent>

        {/* Other tabs... */}
        <TabsContent value="anamnesis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Anamnese Completa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Formulário de anamnese será implementado aqui...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Planos Alimentares</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Lista de planos alimentares será implementada aqui...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gráficos de Evolução</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gráficos de evolução serão implementados aqui...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
