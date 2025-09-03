import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Measurements {
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

interface BodyVisualizationProps {
  gender: "male" | "female";
  measurements: Measurements;
  onMeasurementChange: (measurements: Measurements) => void;
}

export function BodyVisualization({
  gender,
  measurements,
  onMeasurementChange,
}: BodyVisualizationProps) {
  const [selectedPart, setSelectedPart] = useState<keyof Measurements | null>(null);

  const bodyParts: Array<{
    key: keyof Measurements;
    label: string;
    position: { top: string; left: string };
  }> = [
    { key: "neck", label: "Pescoço", position: { top: "15%", left: "50%" } },
    { key: "chest", label: "Peito", position: { top: "28%", left: "50%" } },
    { key: "waist", label: "Cintura", position: { top: "45%", left: "50%" } },
    { key: "hip", label: "Quadril", position: { top: "55%", left: "50%" } },
    { key: "rightArm", label: "Braço D", position: { top: "35%", left: "25%" } },
    { key: "leftArm", label: "Braço E", position: { top: "35%", left: "75%" } },
    { key: "rightThigh", label: "Coxa D", position: { top: "65%", left: "35%" } },
    { key: "leftThigh", label: "Coxa E", position: { top: "65%", left: "65%" } },
    { key: "rightCalf", label: "Panturrilha D", position: { top: "80%", left: "35%" } },
    { key: "leftCalf", label: "Panturrilha E", position: { top: "80%", left: "65%" } },
  ];

  const handleMeasurementUpdate = (key: keyof Measurements, value: string) => {
    const numValue = parseFloat(value);
    onMeasurementChange({
      ...measurements,
      [key]: isNaN(numValue) ? undefined : numValue,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliação Antropométrica Visual</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visual">Visualização</TabsTrigger>
            <TabsTrigger value="list">Lista de Medidas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="mt-6">
            <div className="flex gap-8">
              {/* Body Silhouette */}
              <div className="relative h-[500px] w-[300px] rounded-lg bg-gradient-wellness p-4">
                {/* SVG Silhouette */}
                <svg
                  viewBox="0 0 200 400"
                  className="h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {gender === "male" ? (
                    <path
                      d="M100 40 C100 40, 85 45, 85 60 L85 100 C70 105, 60 110, 60 130 L60 180 C60 190, 65 195, 70 200 L70 300 C70 310, 75 320, 80 330 L80 380 L90 380 L90 330 L110 330 L110 380 L120 380 L120 330 C125 320, 130 310, 130 300 L130 200 C135 195, 140 190, 140 180 L140 130 C140 110, 130 105, 115 100 L115 60 C115 45, 100 40, 100 40 Z"
                      fill="currentColor"
                      className="fill-primary/20 stroke-primary/40"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M100 40 C100 40, 85 45, 85 60 L85 100 C70 105, 60 110, 60 130 L60 170 C60 180, 65 185, 70 190 L75 280 C75 290, 80 300, 85 310 L85 380 L95 380 L95 310 L105 310 L105 380 L115 380 L115 310 C120 300, 125 290, 125 280 L130 190 C135 185, 140 180, 140 170 L140 130 C140 110, 130 105, 115 100 L115 60 C115 45, 100 40, 100 40 Z"
                      fill="currentColor"
                      className="fill-primary/20 stroke-primary/40"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}
                </svg>

                {/* Interactive Points */}
                {bodyParts.map((part) => (
                  <button
                    key={part.key}
                    onClick={() => setSelectedPart(part.key)}
                    className={cn(
                      "absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all",
                      selectedPart === part.key
                        ? "border-primary bg-primary shadow-wellness scale-110"
                        : "border-primary/50 bg-white hover:bg-primary/20 hover:scale-105",
                      measurements[part.key] && "bg-success/20 border-success"
                    )}
                    style={{
                      top: part.position.top,
                      left: part.position.left,
                    }}
                    title={`${part.label}: ${measurements[part.key] || "Não medido"} cm`}
                  >
                    <span className="text-xs font-bold">
                      {measurements[part.key] ? "✓" : "+"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Measurement Input */}
              <div className="flex-1 space-y-4">
                {selectedPart ? (
                  <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="font-semibold">
                      {bodyParts.find((p) => p.key === selectedPart)?.label}
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor={selectedPart}>Circunferência (cm)</Label>
                      <Input
                        id={selectedPart}
                        type="number"
                        step="0.1"
                        value={measurements[selectedPart] || ""}
                        onChange={(e) =>
                          handleMeasurementUpdate(selectedPart, e.target.value)
                        }
                        placeholder="Digite a medida"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPart(null)}
                    >
                      Fechar
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      Clique em um ponto do corpo para adicionar medida
                    </p>
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                  <h4 className="text-sm font-semibold">Medidas Registradas</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {bodyParts.map((part) => (
                      <div
                        key={part.key}
                        className={cn(
                          "flex justify-between",
                          !measurements[part.key] && "opacity-50"
                        )}
                      >
                        <span>{part.label}:</span>
                        <span className="font-medium">
                          {measurements[part.key]
                            ? `${measurements[part.key]} cm`
                            : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {bodyParts.map((part) => (
                <div key={part.key} className="space-y-2">
                  <Label htmlFor={`list-${part.key}`}>{part.label} (cm)</Label>
                  <Input
                    id={`list-${part.key}`}
                    type="number"
                    step="0.1"
                    value={measurements[part.key] || ""}
                    onChange={(e) =>
                      handleMeasurementUpdate(part.key, e.target.value)
                    }
                    placeholder="0.0"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}