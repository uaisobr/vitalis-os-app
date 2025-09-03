import { useState } from "react";
import { Plus, X, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

interface Meal {
  name: string;
  time: string;
  foods: FoodItem[];
  substitutions: FoodItem[][];
}

interface CreateMealPlanProps {
  onClose: () => void;
}

const foodDatabase = [
  {
    id: "1",
    name: "Arroz Integral Cozido",
    unit: "g",
    caloriesPer100: 123,
    proteinsPer100: 2.7,
    carbsPer100: 25.8,
    fatsPer100: 1.0,
  },
  {
    id: "2",
    name: "Frango Grelhado",
    unit: "g",
    caloriesPer100: 165,
    proteinsPer100: 31,
    carbsPer100: 0,
    fatsPer100: 3.6,
  },
  {
    id: "3",
    name: "Batata Doce Cozida",
    unit: "g",
    caloriesPer100: 86,
    proteinsPer100: 1.6,
    carbsPer100: 20,
    fatsPer100: 0.1,
  },
  {
    id: "4",
    name: "Ovo Cozido",
    unit: "unidade",
    caloriesPer100: 155,
    proteinsPer100: 13,
    carbsPer100: 1.1,
    fatsPer100: 11,
  },
  {
    id: "5",
    name: "Banana",
    unit: "unidade",
    caloriesPer100: 89,
    proteinsPer100: 1.1,
    carbsPer100: 23,
    fatsPer100: 0.3,
  },
  {
    id: "6",
    name: "Aveia em Flocos",
    unit: "g",
    caloriesPer100: 389,
    proteinsPer100: 17,
    carbsPer100: 66,
    fatsPer100: 7,
  },
  {
    id: "7",
    name: "Leite Desnatado",
    unit: "ml",
    caloriesPer100: 34,
    proteinsPer100: 3.4,
    carbsPer100: 4.9,
    fatsPer100: 0.1,
  },
  {
    id: "8",
    name: "Pão Integral",
    unit: "fatia",
    caloriesPer100: 247,
    proteinsPer100: 13,
    carbsPer100: 41,
    fatsPer100: 3.4,
  },
];

export function CreateMealPlan({ onClose }: CreateMealPlanProps) {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [planName, setPlanName] = useState("");
  const [meals, setMeals] = useState<Meal[]>([
    { name: "Café da Manhã", time: "07:00", foods: [], substitutions: [] },
    { name: "Lanche da Manhã", time: "10:00", foods: [], substitutions: [] },
    { name: "Almoço", time: "13:00", foods: [], substitutions: [] },
    { name: "Lanche da Tarde", time: "16:00", foods: [], substitutions: [] },
    { name: "Jantar", time: "19:00", foods: [], substitutions: [] },
    { name: "Ceia", time: "22:00", foods: [], substitutions: [] },
  ]);
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);
  const [searchFood, setSearchFood] = useState("");

  const filteredFoods = foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(searchFood.toLowerCase())
  );

  const addFoodToMeal = (foodId: string, quantity: number) => {
    const food = foodDatabase.find((f) => f.id === foodId);
    if (!food) return;

    const newFood: FoodItem = {
      id: Math.random().toString(),
      name: food.name,
      quantity,
      unit: food.unit,
      calories: (food.caloriesPer100 * quantity) / 100,
      proteins: (food.proteinsPer100 * quantity) / 100,
      carbs: (food.carbsPer100 * quantity) / 100,
      fats: (food.fatsPer100 * quantity) / 100,
    };

    const updatedMeals = [...meals];
    updatedMeals[selectedMealIndex].foods.push(newFood);
    setMeals(updatedMeals);
  };

  const removeFoodFromMeal = (foodIndex: number) => {
    const updatedMeals = [...meals];
    updatedMeals[selectedMealIndex].foods.splice(foodIndex, 1);
    setMeals(updatedMeals);
  };

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        totalCalories += food.calories;
        totalProteins += food.proteins;
        totalCarbs += food.carbs;
        totalFats += food.fats;
      });
    });

    return {
      calories: totalCalories.toFixed(0),
      proteins: totalProteins.toFixed(1),
      carbs: totalCarbs.toFixed(1),
      fats: totalFats.toFixed(1),
    };
  };

  const totals = calculateTotals();

  const handleSave = () => {
    if (!selectedPatient || !planName) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um paciente e dê um nome ao plano",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Plano criado com sucesso!",
      description: `O plano "${planName}" foi salvo.`,
    });
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patient">Paciente</Label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger id="patient">
              <SelectValue placeholder="Selecione o paciente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Maria Silva</SelectItem>
              <SelectItem value="2">João Santos</SelectItem>
              <SelectItem value="3">Ana Costa</SelectItem>
              <SelectItem value="4">Pedro Oliveira</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="planName">Nome do Plano</Label>
          <Input
            id="planName"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Ex: Plano Emagrecimento Janeiro"
          />
        </div>
      </div>

      {/* Meal Builder */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Meals List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Refeições</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedMealIndex.toString()} onValueChange={(v) => setSelectedMealIndex(parseInt(v))}>
                <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                  {meals.map((meal, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      {meal.name.split(" ")[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {meals.map((meal, index) => (
                  <TabsContent key={index} value={index.toString()} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        value={meal.time}
                        onChange={(e) => {
                          const updatedMeals = [...meals];
                          updatedMeals[index].time = e.target.value;
                          setMeals(updatedMeals);
                        }}
                        className="w-24"
                        placeholder="00:00"
                      />
                      <span className="text-sm text-muted-foreground">Horário</span>
                    </div>

                    {/* Foods in Meal */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Alimentos:</p>
                      {meal.foods.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Nenhum alimento adicionado
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {meal.foods.map((food, foodIndex) => (
                            <div
                              key={food.id}
                              className="flex items-center justify-between rounded-lg border p-2"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {food.name} - {food.quantity}{food.unit}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {food.calories} kcal | P: {food.proteins}g | C: {food.carbs}g | G: {food.fats}g
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFoodFromMeal(foodIndex)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Food Database */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Banco de Alimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar alimento..."
                    value={searchFood}
                    onChange={(e) => setSearchFood(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {filteredFoods.map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center justify-between rounded-lg border p-2 hover:bg-muted/50"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{food.name}</p>
                          <p className="text-xs text-muted-foreground">
                            100{food.unit}: {food.caloriesPer100} kcal
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            const quantity = prompt(`Quantidade em ${food.unit}:`);
                            if (quantity) {
                              addFoodToMeal(food.id, parseFloat(quantity));
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Totais do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Calorias</span>
                  <span className="font-medium">{totals.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Proteínas</span>
                  <span className="font-medium">{totals.proteins}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Carboidratos</span>
                  <span className="font-medium">{totals.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Gorduras</span>
                  <span className="font-medium">{totals.fats}g</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Salvar Plano</Button>
      </div>
    </div>
  );
}