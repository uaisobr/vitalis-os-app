import { useState } from "react";
import { Search, Plus, BookOpen, Apple, FileText, Download, Edit, Trash, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockFoods = [
  {
    id: "1",
    name: "Arroz Integral Cozido",
    category: "Carboidratos",
    caloriesPer100: 123,
    proteinsPer100: 2.7,
    carbsPer100: 25.8,
    fatsPer100: 1.0,
    fiber: 1.8,
  },
  {
    id: "2",
    name: "Frango Grelhado",
    category: "Proteínas",
    caloriesPer100: 165,
    proteinsPer100: 31,
    carbsPer100: 0,
    fatsPer100: 3.6,
    fiber: 0,
  },
  {
    id: "3",
    name: "Batata Doce Cozida",
    category: "Carboidratos",
    caloriesPer100: 86,
    proteinsPer100: 1.6,
    carbsPer100: 20,
    fatsPer100: 0.1,
    fiber: 3.0,
  },
  {
    id: "4",
    name: "Ovo Cozido",
    category: "Proteínas",
    caloriesPer100: 155,
    proteinsPer100: 13,
    carbsPer100: 1.1,
    fatsPer100: 11,
    fiber: 0,
  },
  {
    id: "5",
    name: "Abacate",
    category: "Gorduras",
    caloriesPer100: 160,
    proteinsPer100: 2,
    carbsPer100: 9,
    fatsPer100: 15,
    fiber: 7,
  },
  {
    id: "6",
    name: "Quinoa Cozida",
    category: "Carboidratos",
    caloriesPer100: 120,
    proteinsPer100: 4.4,
    carbsPer100: 21,
    fatsPer100: 1.9,
    fiber: 2.8,
  },
];

const mockRecipes = [
  {
    id: "1",
    name: "Salada Caesar Light",
    category: "Saladas",
    calories: 250,
    servings: 2,
    prepTime: "15 min",
    ingredients: ["Alface romana", "Peito de frango", "Croutons integrais", "Molho caesar light"],
  },
  {
    id: "2",
    name: "Smoothie Proteico",
    category: "Bebidas",
    calories: 320,
    servings: 1,
    prepTime: "5 min",
    ingredients: ["Banana", "Leite desnatado", "Whey protein", "Aveia", "Canela"],
  },
  {
    id: "3",
    name: "Bowl de Quinoa",
    category: "Pratos Principais",
    calories: 450,
    servings: 1,
    prepTime: "25 min",
    ingredients: ["Quinoa", "Legumes assados", "Grão de bico", "Molho tahine"],
  },
];

const mockMaterials = [
  {
    id: "1",
    title: "Guia de Porções",
    type: "PDF",
    category: "Educativo",
    size: "2.5 MB",
    downloads: 45,
  },
  {
    id: "2",
    title: "Lista de Compras Semanal",
    type: "Template",
    category: "Prático",
    size: "1.2 MB",
    downloads: 67,
  },
  {
    id: "3",
    title: "Tabela de Substituições",
    type: "PDF",
    category: "Referência",
    size: "3.8 MB",
    downloads: 89,
  },
  {
    id: "4",
    title: "Diário Alimentar",
    type: "Template",
    category: "Acompanhamento",
    size: "0.8 MB",
    downloads: 34,
  },
];

export default function Library() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [addRecipeOpen, setAddRecipeOpen] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    category: "",
    caloriesPer100: "",
    proteinsPer100: "",
    carbsPer100: "",
    fatsPer100: "",
  });
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "",
    servings: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
  });

  const handleAddFood = () => {
    if (!newFood.name || !newFood.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Alimento adicionado!",
      description: `${newFood.name} foi adicionado à biblioteca.`,
    });
    setAddFoodOpen(false);
    setNewFood({
      name: "",
      category: "",
      caloriesPer100: "",
      proteinsPer100: "",
      carbsPer100: "",
      fatsPer100: "",
    });
  };

  const handleAddRecipe = () => {
    if (!newRecipe.name || !newRecipe.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Receita adicionada!",
      description: `${newRecipe.name} foi adicionada à biblioteca.`,
    });
    setAddRecipeOpen(false);
    setNewRecipe({
      name: "",
      category: "",
      servings: "",
      prepTime: "",
      ingredients: "",
      instructions: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display">Biblioteca</h1>
        <p className="text-muted-foreground">
          Gerencie alimentos, receitas e materiais educativos
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar em toda a biblioteca..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="foods" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="foods">Alimentos</TabsTrigger>
          <TabsTrigger value="recipes">Receitas</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
        </TabsList>

        {/* Foods Tab */}
        <TabsContent value="foods" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline">Total: {mockFoods.length} alimentos</Badge>
            </div>
            <Dialog open={addFoodOpen} onOpenChange={setAddFoodOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Alimento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Alimento</DialogTitle>
                  <DialogDescription>
                    Cadastre um novo alimento na biblioteca
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="food-name">Nome do Alimento*</Label>
                    <Input
                      id="food-name"
                      value={newFood.name}
                      onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                      placeholder="Ex: Arroz Integral Cozido"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="food-category">Categoria*</Label>
                    <Input
                      id="food-category"
                      value={newFood.category}
                      onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                      placeholder="Ex: Carboidratos"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calories">Calorias (100g)</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newFood.caloriesPer100}
                        onChange={(e) => setNewFood({ ...newFood, caloriesPer100: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proteins">Proteínas (g)</Label>
                      <Input
                        id="proteins"
                        type="number"
                        value={newFood.proteinsPer100}
                        onChange={(e) => setNewFood({ ...newFood, proteinsPer100: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carbs">Carboidratos (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={newFood.carbsPer100}
                        onChange={(e) => setNewFood({ ...newFood, carbsPer100: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fats">Gorduras (g)</Label>
                      <Input
                        id="fats"
                        type="number"
                        value={newFood.fatsPer100}
                        onChange={(e) => setNewFood({ ...newFood, fatsPer100: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setAddFoodOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddFood}>Adicionar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockFoods.map((food) => (
              <Card key={food.id} className="hover:shadow-wellness transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{food.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {food.category}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calorias (100g)</span>
                      <span className="font-medium">{food.caloriesPer100} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Proteínas</span>
                      <span className="font-medium">{food.proteinsPer100}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carboidratos</span>
                      <span className="font-medium">{food.carbsPer100}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gorduras</span>
                      <span className="font-medium">{food.fatsPer100}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fibras</span>
                      <span className="font-medium">{food.fiber}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recipes Tab */}
        <TabsContent value="recipes" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline">Total: {mockRecipes.length} receitas</Badge>
            </div>
            <Dialog open={addRecipeOpen} onOpenChange={setAddRecipeOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Receita
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Receita</DialogTitle>
                  <DialogDescription>
                    Cadastre uma nova receita na biblioteca
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipe-name">Nome da Receita*</Label>
                    <Input
                      id="recipe-name"
                      value={newRecipe.name}
                      onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                      placeholder="Ex: Salada Caesar Light"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipe-category">Categoria*</Label>
                      <Input
                        id="recipe-category"
                        value={newRecipe.category}
                        onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                        placeholder="Ex: Saladas"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="servings">Porções</Label>
                      <Input
                        id="servings"
                        type="number"
                        value={newRecipe.servings}
                        onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prep-time">Tempo de Preparo</Label>
                    <Input
                      id="prep-time"
                      value={newRecipe.prepTime}
                      onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
                      placeholder="Ex: 30 min"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ingredients">Ingredientes</Label>
                    <Textarea
                      id="ingredients"
                      value={newRecipe.ingredients}
                      onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                      placeholder="Liste os ingredientes, um por linha"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Modo de Preparo</Label>
                    <Textarea
                      id="instructions"
                      value={newRecipe.instructions}
                      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                      placeholder="Descreva o passo a passo"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setAddRecipeOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddRecipe}>Adicionar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-wellness transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{recipe.name}</CardTitle>
                      <CardDescription>{recipe.category}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Calorias:</span>
                        <span className="font-medium">{recipe.calories}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Porções:</span>
                        <span className="font-medium">{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Tempo:</span>
                        <span className="font-medium">{recipe.prepTime}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Ingredientes:</p>
                      <div className="text-sm text-muted-foreground">
                        {recipe.ingredients.slice(0, 3).join(", ")}...
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      Ver Receita Completa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline">Total: {mockMaterials.length} materiais</Badge>
            </div>
            <Button size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Enviar Material
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockMaterials.map((material) => (
              <Card key={material.id} className="hover:shadow-wellness transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{material.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{material.type}</Badge>
                        <Badge variant="outline">{material.category}</Badge>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tamanho</span>
                      <span className="font-medium">{material.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="font-medium">{material.downloads}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
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