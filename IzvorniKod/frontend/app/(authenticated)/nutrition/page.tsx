"use client";

import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

type Goals = {
  calories: number;
  fats: number;
  saturatedFats: number;
  transFats: number;
  polyunsaturatedFats: number;
  monosaturatedFats: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  carbs: number;
  netCarbs: number;
  fiber: number;
  sugars: number;
  protein: number;
  C: number;
  D: number;
  B12: number;
  [key: string]: number;
};

type Food = {
  id: number;
  name: string;
  servingSize: number;
  servingSizeType: string;
  calories: number;
  fats: number;
  saturatedFats: number;
  transFats: number;
  polyunsaturatedFats: number;
  monosaturatedFats: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  carbs: number;
  netCarbs: number;
  fiber: number;
  sugars: number;
  protein: number;
  C: number;
  D: number;
  B12: number;
};

type Meal = {
  id: number;
  name: string;
  calories: number;
  foods: Food[];
  fats: number;
  saturatedFats: number;
  transFats: number;
  polyunsaturatedFats: number;
  monosaturatedFats: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  calcium: number;
  iron: number;
  magnesium: number;
  carbs: number;
  netCarbs: number;
  fiber: number;
  sugars: number;
  protein: number;
  C: number;
  D: number;
  B12: number;
};

const NutritionPage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasUnsavedChangesFood, setHasUnsavedChangesFood] = useState(false);
  const [showConfirmDialogFood, setShowConfirmDialogFood] = useState(false);

  const [totalNutrients, setTotalNutrients] = useState({
    fats: 0,
    saturatedFats: 0,
    transFats: 0,
    polyunsaturatedFats: 0,
    monosaturatedFats: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    carbs: 0,
    netCarbs: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    C: 0,
    D: 0,
    B12: 0,
  });

  const [goals, setGoals] = useState<Goals>({
    calories: 0,
    fats: 0,
    saturatedFats: 0,
    transFats: 0,
    polyunsaturatedFats: 0,
    monosaturatedFats: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    carbs: 0,
    netCarbs: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    C: 0,
    D: 0,
    B12: 0,
  });
  const [newFood, setNewFood] = useState<Food>({
    id: 0,
    name: "",
    servingSize: 0,
    servingSizeType: "",
    calories: 0,
    fats: 0,
    saturatedFats: 0,
    transFats: 0,
    polyunsaturatedFats: 0,
    monosaturatedFats: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    carbs: 0,
    netCarbs: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    C: 0,
    D: 0,
    B12: 0,
  });

  const [currentMeal, setCurrentMeal] = useState<{
    id: number;
    name: string;
    calories: number;
    foods: {
      id: number;
      name: string;
      servingSize: number;
      servingSizeType: string;
      calories: number;
      fats: number;
      saturatedFats: number;
      transFats: number;
      polyunsaturatedFats: number;
      monosaturatedFats: number;
      cholesterol: number;
      sodium: number;
      potassium: number;
      calcium: number;
      iron: number;
      magnesium: number;
      carbs: number;
      netCarbs: number;
      fiber: number;
      sugars: number;
      protein: number;
      C: number;
      D: number;
      B12: number;
    }[];
    fats: number;
    saturatedFats: number;
    transFats: number;
    polyunsaturatedFats: number;
    monosaturatedFats: number;
    cholesterol: number;
    sodium: number;
    potassium: number;
    calcium: number;
    iron: number;
    magnesium: number;
    carbs: number;
    netCarbs: number;
    fiber: number;
    sugars: number;
    protein: number;
    C: number;
    D: number;
    B12: number;
  }>({
    id: 0,
    name: "",
    calories: 0,
    foods: [],
    fats: 0,
    saturatedFats: 0,
    transFats: 0,
    polyunsaturatedFats: 0,
    monosaturatedFats: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    magnesium: 0,
    carbs: 0,
    netCarbs: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    C: 0,
    D: 0,
    B12: 0,
  });
  //Date---------------------------------------------------------------------------------------------------------------------
  const [mealsByDate, setMealsByDate] = useState<{ [key: string]: Meal[] }>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDateKey = (date: Date) => date.toISOString().split("T")[0];

  const handleDateChange = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? new Date(currentDate.setDate(currentDate.getDate() - 1))
        : new Date(currentDate.setDate(currentDate.getDate() + 1));
    setCurrentDate(newDate);
    const dateKey = formatDateKey(newDate);
    setMeals(mealsByDate[dateKey] || []);
  };

  const formatDay = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const dateKey = formatDateKey(currentDate);
    setMeals(mealsByDate[dateKey] || []);
  }, [currentDate, mealsByDate]);

  //Stats---------------------------------------------------------------------------------------------------------------------------------------------------------------
  const calculateTotalCalories = () => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  const calculateTotalNutrients = () => {
    return meals.reduce(
      (totals, meal) => {
        totals.protein += meal.protein || 0;
        totals.carbs += meal.carbs || 0;
        totals.fats += meal.fats || 0;
        totals.saturatedFats += meal.saturatedFats || 0;
        totals.transFats += meal.transFats || 0;
        totals.polyunsaturatedFats += meal.polyunsaturatedFats || 0;
        totals.monosaturatedFats += meal.monosaturatedFats || 0;
        totals.cholesterol += meal.cholesterol || 0;
        totals.sodium += meal.sodium || 0;
        totals.potassium += meal.potassium || 0;
        totals.calcium += meal.calcium || 0;
        totals.iron += meal.iron || 0;
        totals.magnesium += meal.magnesium || 0;
        totals.netCarbs += meal.netCarbs || 0;
        totals.fiber += meal.fiber || 0;
        totals.sugars += meal.sugars || 0;
        totals.C += meal.C || 0;
        totals.D += meal.D || 0;
        totals.B12 += meal.B12 || 0;
        return totals;
      },
      {
        protein: 0,
        carbs: 0,
        fats: 0,
        saturatedFats: 0,
        transFats: 0,
        polyunsaturatedFats: 0,
        monosaturatedFats: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        netCarbs: 0,
        fiber: 0,
        sugars: 0,
        C: 0,
        D: 0,
        B12: 0,
      }
    );
  };

  useEffect(() => {
    calculateTotalCalories();
  }, [meals]);

  useEffect(() => {
    setTotalNutrients(calculateTotalNutrients());
  }, [meals]);

  const [tempGoals, setTempGoals] = useState<Goals>(goals);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);

  const [goalFields, setGoalFields] = useState<
    { label: string; name: keyof Goals; isPercentage?: boolean }[]
  >([
    { label: "Calories (kcal)", name: "calories" }, //1.1
    { label: "Trans Fats (g)", name: "transFats" }, //2.1
    { label: "Fiber (g)", name: "fiber" }, //3.1
    { label: "Net Carbs (g)", name: "netCarbs" }, //4.1
    { label: "Carbohydrates (g)", name: "carbs", isPercentage: false }, //1.2
    { label: "Polyunsaturated Fats (g)", name: "polyunsaturatedFats" }, //2.2
    { label: "Sodium (mg)", name: "sodium" }, //3.2
    { label: "Magnesium (mg)", name: "magnesium" },
    { label: "Protein (g)", name: "protein", isPercentage: false }, //1.3
    { label: "Monounsaturated Fats (g)", name: "monosaturatedFats" }, //2.3
    { label: "Potassium (mg)", name: "potassium" }, //3.3
    { label: "Vitamin C (mg)", name: "C" }, //4.3
    { label: "Fats (g)", name: "fats", isPercentage: false }, //1.4
    { label: "Cholesterol (mg)", name: "cholesterol" }, //2.4
    { label: "Calcium (mg)", name: "calcium" }, //3.4
    { label: "Vitamin D (µg)", name: "D" }, //4.4
    { label: "Saturated Fats (g)", name: "saturatedFats", isPercentage: false }, //1.5
    { label: "Sugars (g)", name: "sugars" }, //2.5
    { label: "Iron (mg)", name: "iron" }, //3.5
    { label: "Vitamin B12 (µg)", name: "B12" }, //4.5
  ]);

  const activeGoals = goalFields.filter(
    ({ name }) =>
      !["calories", "fats", "carbs", "protein"].includes(name as string) &&
      tempGoals[name] > 0
  );

  const handleToggle = (fieldName: keyof Goals) => {
    setGoalFields((prevFields) =>
      prevFields.map((field) =>
        field.name === fieldName
          ? { ...field, isPercentage: !field.isPercentage }
          : field
      )
    );
  };

  const openGoalsModal = () => {
    setTempGoals(goals);
    setIsGoalsModalOpen(true);
  };

  const closeGoalsModal = () => {
    setIsGoalsModalOpen(false);
  };

  const handleGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempGoals((prevGoals) => ({
      ...prevGoals,
      [name]: Number(value),
    }));
  };

  const saveGoals = () => {
    setGoals(tempGoals);
    console.log("Ranges for each goal:", goalRanges);
    setIsGoalsModalOpen(false);
  };

  const [goalRanges, setGoalRanges] = useState<{
    [key in keyof Goals]?: string;
  }>({});

  const handleRangeChange = (goalName: keyof Goals, range: string) => {
    setGoalRanges((prev) => ({ ...prev, [goalName]: range }));
  };

  const getMacronutrientColor = (
    current: number,
    goal: number,
    range: string = "exact",
    isPercentage: boolean = false,
    dailyCalories: number = 0
  ) => {
    if (isPercentage) {
      const calorieValue = current * (range === "fats" ? 9 : 4);
      const percentage = (calorieValue / dailyCalories) * 100;

      const lowerBound = goal * 0.8;
      const upperBound = goal * 1.2;

      if (range === "under") {
        if (percentage < goal) return "green";
        if (percentage < upperBound) return "yellow";
        return "red";
      }

      if (range === "over") {
        if (percentage > goal) return "green";
        if (percentage >= lowerBound) return "yellow";
        return "red";
      }

      const within10 = goal * 0.9 <= percentage && percentage <= goal * 1.1;
      const within20 = goal * 0.8 <= percentage && percentage <= goal * 1.2;

      if (within10) return "green";
      if (within20) return "yellow";
      return "red";
    }

    return getMicronutrientColor(current, goal, range);
  };

  const getMicronutrientColor = (
    current: number,
    goal: number,
    range: string = "exact"
  ) => {
    const lowerBound = goal * 0.8;
    const upperBound = goal * 1.2;
    const within10 = goal * 0.9 <= current && current <= goal * 1.1;
    const within20 = goal * 0.8 <= current && current <= goal * 1.2;

    if (range === "under") {
      if (current < goal) return "green";
      else if (current <= upperBound) return "yellow";
      return "red";
    } else if (range === "over") {
      if (current > goal) return "green";
      else if (current >= lowerBound) return "yellow";
      return "red";
    } else if (range === "exact") {
      if (within10) return "green";
      if (within20) return "yellow";
      return "red";
    }

    return "gray";
  };

  //Pie chart--------------------------------------------------------------------------------------------------------------------------------------------------------
  const CHART_PROPERTIES_Pie = {
    labels: ["Protein", "Carbs", "Fats"],
    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    hoverOffset: 3,
  };

  const [data, setData] = useState({
    labels: CHART_PROPERTIES_Pie.labels,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: CHART_PROPERTIES_Pie.backgroundColor,
        hoverOffset: CHART_PROPERTIES_Pie.hoverOffset,
      },
    ],
  });

  const calculatePercentages = () => {
    const totalCalories = calculateTotalCalories();

    if (totalCalories === 0) {
      return [0, 0, 0];
    }

    return [
      ((totalNutrients.protein * 4) / totalCalories) * 100,
      ((totalNutrients.carbs * 4) / totalCalories) * 100,
      ((totalNutrients.fats * 9) / totalCalories) * 100,
    ];
  };

  useEffect(() => {
    const percentages = calculatePercentages();

    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: percentages,
        },
      ],
    }));
  }, [totalNutrients]);

  //Meal modal-----------------------------------------------------------------------------------------------------------------------------------------------------------
  const openModal = (meal?: Meal) => {
    setCurrentMeal(
      meal
        ? meal
        : {
            id: 0,
            name: "",
            calories: 0,
            foods: [],
            fats: 0,
            saturatedFats: 0,
            transFats: 0,
            polyunsaturatedFats: 0,
            monosaturatedFats: 0,
            cholesterol: 0,
            sodium: 0,
            potassium: 0,
            calcium: 0,
            iron: 0,
            magnesium: 0,
            carbs: 0,
            netCarbs: 0,
            fiber: 0,
            sugars: 0,
            protein: 0,
            C: 0,
            D: 0,
            B12: 0,
          }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
      return;
    }
    setIsModalOpen(false);
  };

  const confirmModalClose = () => {
    setShowConfirmDialog(false);
    setHasUnsavedChanges(false);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      [name]: name === "calories" ? Number(value) : value,
    }));

    setHasUnsavedChanges(true);
  };

  const [myMeals, setMyMeals] = useState<Meal[]>([]);
  const [isMyMealsModalOpen, setIsMyMealsModalOpen] = useState(false);
  const [saveToMyMeals, setSaveToMyMeals] = useState(false);

  const addMealFromMyMeals = (meal: Meal) => {
    const dateKey = formatDateKey(currentDate);

    setMealsByDate((prev) => {
      const updatedMeals = [
        ...(prev[dateKey] || []),
        { ...meal, id: (prev[dateKey]?.length || 0) + 1 },
      ];

      return {
        ...prev,
        [dateKey]: updatedMeals,
      };
    });

    setMeals((prevMeals) => [
      ...prevMeals,
      { ...meal, id: prevMeals.length + 1 },
    ]);
  };

  const saveMeal = () => {
    if (!currentMeal.name?.trim()) {
      alert("Please provide a name for your meal!");
      return;
    }

    const updatedMacros = calculateMealMacros(currentMeal);
    const updatedMeal: Meal = {
      ...currentMeal,
      calories: calculateMealCalories(currentMeal),
      protein: updatedMacros.protein,
      carbs: updatedMacros.carbs,
      fats: updatedMacros.fats,
      saturatedFats: updatedMacros.saturatedFats,
      transFats: updatedMacros.transFats,
      polyunsaturatedFats: updatedMacros.polyunsaturatedFats,
      monosaturatedFats: updatedMacros.monosaturatedFats,
      cholesterol: updatedMacros.cholesterol,
      sodium: updatedMacros.sodium,
      potassium: updatedMacros.potassium,
      calcium: updatedMacros.calcium,
      iron: updatedMacros.iron,
      magnesium: updatedMacros.magnesium,
      netCarbs: updatedMacros.netCarbs,
      fiber: updatedMacros.fiber,
      sugars: updatedMacros.sugars,
      C: updatedMacros.C,
      D: updatedMacros.D,
      B12: updatedMacros.B12,
    };

    const dateKey = formatDateKey(currentDate);
    setMealsByDate((prev) => ({
      ...prev,
      [dateKey]: updatedMeal.id
        ? prev[dateKey].map((meal) =>
            meal.id === updatedMeal.id ? updatedMeal : meal
          )
        : [
            ...(prev[dateKey] || []),
            { ...updatedMeal, id: prev[dateKey]?.length + 1 || 1 },
          ],
    }));

    if (saveToMyMeals) {
      setMyMeals((prevMeals) => {
        const mealExists = prevMeals.some(
          (meal) => meal.name.toLowerCase() === updatedMeal.name.toLowerCase()
        );
        if (!mealExists) {
          return [...prevMeals, { ...updatedMeal, id: prevMeals.length + 1 }];
        }
        return prevMeals;
      });
    }

    setSaveToMyMeals(false);
    setHasUnsavedChanges(false);
    setIsModalOpen(false);
  };

  const deleteMeal = (id: number) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  const calculateMealMacros = (meal: Meal) => {
    return meal.foods.reduce(
      (totals, meal) => {
        totals.protein += meal.protein || 0;
        totals.carbs += meal.carbs || 0;
        totals.fats += meal.fats || 0;
        totals.saturatedFats += meal.saturatedFats || 0;
        totals.transFats += meal.transFats || 0;
        totals.polyunsaturatedFats += meal.polyunsaturatedFats || 0;
        totals.monosaturatedFats += meal.monosaturatedFats || 0;
        totals.cholesterol += meal.cholesterol || 0;
        totals.sodium += meal.sodium || 0;
        totals.potassium += meal.potassium || 0;
        totals.calcium += meal.calcium || 0;
        totals.iron += meal.iron || 0;
        totals.magnesium += meal.magnesium || 0;
        totals.netCarbs += meal.netCarbs || 0;
        totals.fiber += meal.fiber || 0;
        totals.sugars += meal.sugars || 0;
        totals.C += meal.C || 0;
        totals.D += meal.D || 0;
        totals.B12 += meal.B12 || 0;
        return totals;
      },
      {
        protein: 0,
        carbs: 0,
        fats: 0,
        saturatedFats: 0,
        transFats: 0,
        polyunsaturatedFats: 0,
        monosaturatedFats: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        netCarbs: 0,
        fiber: 0,
        sugars: 0,
        C: 0,
        D: 0,
        B12: 0,
      }
    );
  };

  const calculateMealCalories = (meal: Meal) => {
    return meal.foods.reduce((total, food) => total + food.calories, 0);
  };

  const [servingSize, setServingSize] = useState<number>(0);

  const handleSave = (food: Food, newAmount: number) => {
    const ratio = newAmount / food.servingSize;
    const updatedFood: Food = {
      id: food.id,
      name: food.name,
      servingSize: newAmount,
      servingSizeType: food.servingSizeType,
      calories: Math.round(food.calories * ratio),
      fats: parseFloat((food.fats * ratio).toFixed(1)),
      saturatedFats: parseFloat((food.saturatedFats * ratio).toFixed(1)),
      transFats: parseFloat((food.transFats * ratio).toFixed(1)),
      polyunsaturatedFats: parseFloat(
        (food.polyunsaturatedFats * ratio).toFixed(1)
      ),
      monosaturatedFats: parseFloat(
        (food.monosaturatedFats * ratio).toFixed(1)
      ),
      cholesterol: parseFloat((food.cholesterol * ratio).toFixed(1)),
      sodium: parseFloat((food.sodium * ratio).toFixed(1)),
      potassium: parseFloat((food.potassium * ratio).toFixed(1)),
      calcium: parseFloat((food.calcium * ratio).toFixed(1)),
      iron: parseFloat((food.iron * ratio).toFixed(1)),
      magnesium: parseFloat((food.magnesium * ratio).toFixed(1)),
      carbs: parseFloat((food.carbs * ratio).toFixed(1)),
      netCarbs: parseFloat((food.netCarbs * ratio).toFixed(1)),
      fiber: parseFloat((food.fiber * ratio).toFixed(1)),
      sugars: parseFloat((food.sugars * ratio).toFixed(1)),
      protein: parseFloat((food.protein * ratio).toFixed(1)),
      C: parseFloat((food.C * ratio).toFixed(1)),
      D: parseFloat((food.D * ratio).toFixed(1)),
      B12: parseFloat((food.B12 * ratio).toFixed(1)),
    };

    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      foods: prevMeal.foods.map((f) =>
        f.id === updatedFood.id ? updatedFood : f
      ),
    }));

    setEditingFoodId(null);
  };

  const [editingFoodId, setEditingFoodId] = useState<number | null>(null);

  //Food modal----------------------------------------------------------------------------------------------------------------------------------------------------------
  const fields: { label: string; name: keyof Food }[] = [
    { label: "Food Name", name: "name" },
    { label: "Serving Size", name: "servingSize" },
    { label: "Serving Size Type", name: "servingSizeType" },
    { label: "Calories", name: "calories" },
    { label: "Fats", name: "fats" },
    { label: "Saturated Fats", name: "saturatedFats" },
    { label: "Trans Fats", name: "transFats" },
    { label: "Polyunsaturated Fats", name: "polyunsaturatedFats" },
    { label: "Monosaturated Fats", name: "monosaturatedFats" },
    { label: "Cholesterol", name: "cholesterol" },
    { label: "Sodium", name: "sodium" },
    { label: "Potassium", name: "potassium" },
    { label: "Calcium", name: "calcium" },
    { label: "Iron", name: "iron" },
    { label: "Magnesium", name: "magnesium" },
    { label: "Carbs", name: "carbs" },
    { label: "Net Carbs", name: "netCarbs" },
    { label: "Fiber", name: "fiber" },
    { label: "Sugars", name: "sugars" },
    { label: "Protein", name: "protein" },
    { label: "Vitamin C", name: "C" },
    { label: "Vitamin D", name: "D" },
    { label: "Vitamin B12", name: "B12" },
  ];

  const openFoodModal = (food?: Food) => {
    setNewFood(
      food
        ? { ...food }
        : {
            id: 0,
            name: "",
            servingSize: 0,
            servingSizeType: "",
            calories: 0,
            fats: 0,
            saturatedFats: 0,
            transFats: 0,
            polyunsaturatedFats: 0,
            monosaturatedFats: 0,
            cholesterol: 0,
            sodium: 0,
            potassium: 0,
            calcium: 0,
            iron: 0,
            magnesium: 0,
            carbs: 0,
            netCarbs: 0,
            fiber: 0,
            sugars: 0,
            protein: 0,
            C: 0,
            D: 0,
            B12: 0,
          }
    );
    setIsFoodModalOpen(true);
  };

  const closeFoodModal = () => {
    if (hasUnsavedChangesFood) {
      setShowConfirmDialogFood(true);
      return;
    }
    setIsFoodModalOpen(false);
  };

  const confirmFoodModalClose = () => {
    setShowConfirmDialogFood(false);
    setHasUnsavedChangesFood(false);
    setIsFoodModalOpen(false);
  };

  const handleFoodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = [
      "id",
      "servingSize",
      "calories",
      "fats",
      "saturatedFats",
      "transFats",
      "polyunsaturatedFats",
      "monosaturatedFats",
      "cholesterol",
      "sodium",
      "potassium",
      "calcium",
      "iron",
      "magnesium",
      "carbs",
      "netCarbs",
      "fiber",
      "sugars",
      "protein",
      "C",
      "D",
      "B12",
    ];

    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));

    setHasUnsavedChangesFood(true);
  };

  const [myFoods, setMyFoods] = useState<Food[]>([]);
  const [isMyFoodsModalOpen, setIsMyFoodsModalOpen] = useState(false);

  const openMyFoodModal = () => {
    setIsMyFoodsModalOpen(true);
  };

  const closeMyFoodModal = () => {
    setIsMyFoodsModalOpen(false);
  };

  const addFoodFromMyFoods = (food: Food) => {
    setCurrentMeal((prevMeal) => {
      const updatedFoods = [
        ...prevMeal.foods,
        { ...food, id: prevMeal.foods.length + 1 },
      ];
      const updatedMeal = {
        ...prevMeal,
        foods: updatedFoods,
        calories: calculateMealCalories({ ...prevMeal, foods: updatedFoods }),
      };
      return updatedMeal;
    });

    closeFoodModal();
  };

  const addFood = () => {
    if (!newFood.name?.trim()) {
      alert("Please provide a name for the food!");
      return;
    }

    setCurrentMeal((prevMeal) => {
      const updatedFoods = prevMeal.foods.some((food) => food.id === newFood.id)
        ? prevMeal.foods.map((food) =>
            food.id === newFood.id ? newFood : food
          )
        : [...prevMeal.foods, { ...newFood, id: prevMeal.foods.length + 1 }];

      const updatedMeal = {
        ...prevMeal,
        foods: updatedFoods,
        calories: calculateMealCalories({ ...prevMeal, foods: updatedFoods }),
      };

      return updatedMeal;
    });

    setMyFoods((prevFoods) => {
      const foodExists = prevFoods.some(
        (food) => food.name.toLowerCase() === newFood.name.toLowerCase()
      );

      if (!foodExists) {
        return [...prevFoods, { ...newFood, id: prevFoods.length + 1 }];
      }

      return prevFoods;
    });

    setHasUnsavedChangesFood(false);
    setIsFoodModalOpen(false);
  };

  const deleteFood = (foodId: number) => {
    setCurrentMeal((prevMeal) => {
      const updatedFoods = prevMeal.foods.filter((food) => food.id !== foodId);
      const updatedMeal = { ...prevMeal, foods: updatedFoods };
      updatedMeal.calories = calculateMealCalories(updatedMeal);
      return updatedMeal;
    });
  };

  const scanBarcode = () => {
    // Logic to scan barcode here
  };

  const isAllZero = !Object.values(totalNutrients).some((val) => val > 0);

  //Monthly Stats--------------------------------------------------------------------------------------------------------------
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const calculateDailyCalories = () => {
    const monthKey = formatMonthKey(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth); // Dynamically get days in the month

    const dailyCalories = Array(daysInMonth).fill(0); // Initialize array with the correct size

    Object.entries(mealsByDate).forEach(([dateKey, meals]) => {
      if (dateKey.startsWith(monthKey)) {
        // Check if the date belongs to the current month
        const day = parseInt(dateKey.split("-")[2], 10) - 1; // Extract day (0-based index)
        dailyCalories[day] = meals.reduce(
          (sum, meal) => sum + meal.calories,
          0
        ); // Sum up calories for the day
      }
    });

    return dailyCalories;
  };

  useEffect(() => {
    const dailyCalories = calculateDailyCalories();
    const daysInMonth = getDaysInMonth(currentMonth);

    setDataMonthCalories({
      labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
      datasets: [
        {
          label: "Calories",
          data: dailyCalories,
          backgroundColor: "green",
        },
      ],
    });
  }, [currentMonth, mealsByDate]);

  const CHART_PROPERTIES_Bar = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    backgroundColor: "green",
  };

  const [dataMonthCalories, setDataMonthCalories] = useState({
    labels: CHART_PROPERTIES_Bar.labels,
    datasets: [
      {
        label: "Calories",
        data: Array(30).fill(0),
        backgroundColor: CHART_PROPERTIES_Bar.backgroundColor,
      },
    ],
  });

  //Month Selector--------------------------------------------------------------------------------------------------------------------------------------------------------
  const [mealsByMonth, setMealsByMonth] = useState<{ [key: string]: any[] }>(
    {}
  );

  const formatMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
        : new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    setCurrentMonth(newDate);
    const monthKey = formatMonthKey(newDate);
    setMeals(mealsByMonth[monthKey] || []);
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const monthKey = formatMonthKey(currentMonth);
    setMeals(mealsByMonth[monthKey] || []);
  }, [currentMonth, mealsByMonth]);

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col w-full h-screen bg-white p-8 items-center relative">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">
        Nutrition
      </h1>

      {/* Date Selector */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => handleDateChange("prev")}
          className="px-8 py-2 bg-white-300 text-gray-400 rounded-l text-xl font-bold"
        >
          {"<"}
        </button>
        <div
          className="px-4 py-2 bg-white-200 text-gray-800 text-center"
          style={{ width: "150px" }}
        >
          <p className="text-base font-medium">{formatDay(currentDate)}</p>
          <p className="text-base font-semibold">{formatDate(currentDate)}</p>
        </div>
        <button
          onClick={() => handleDateChange("next")}
          className="px-8 py-2 bg-white-300 text-gray-400 text-xl font-bold"
        >
          {">"}
        </button>
      </div>

      <div className="flex w-full max-w-5xl justify-between mb-4 space-x-4">
        <div className="bg-gray-200 p-4 rounded-md shadow-md w-1/4 text-center">
          <h2 className="text-xl font-semibold">Total Calories</h2>
          <p>{calculateTotalCalories()} kcal</p>
        </div>
        {[
          { name: "protein", label: "Protein", bgColor: "bg-red-100" },
          { name: "carbs", label: "Carbs", bgColor: "bg-blue-100" },
          { name: "fats", label: "Fats", bgColor: "bg-yellow-100" },
        ].map(({ name, label, bgColor }) => {
          const value = totalNutrients[name as keyof typeof totalNutrients];
          const goal = goals[name as keyof Goals];
          const range = goalRanges[name as keyof Goals] ?? "exact";
          const isPercentage =
            goalFields.find((field) => field.name === name)?.isPercentage ??
            false;

          const content =
            goal > 0 ? (
              <>
                <h2 className="text-xl font-semibold">{label}</h2>
                <p
                  className={`text-xl font-semibold ${
                    getMacronutrientColor(
                      value,
                      goal,
                      range,
                      isPercentage,
                      calculateTotalCalories()
                    ) === "green"
                      ? "text-green-500"
                      : getMacronutrientColor(
                          value,
                          goal,
                          range,
                          isPercentage,
                          calculateTotalCalories()
                        ) === "yellow"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {isPercentage
                    ? `${(
                        ((value * (name === "fats" ? 9 : 4)) /
                          calculateTotalCalories()) *
                        100
                      ).toFixed(1)}%`
                    : `${value}g`}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800">{label}</h2>
                <p>{value}g</p>
              </>
            );

          return (
            <div
              key={name}
              className={`${bgColor} p-4 rounded-md shadow-md w-1/4 text-center`}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Micronutrients Tracker */}
      <div className="flex justify-center">
        <div
          className="grid gap-6 mt-2"
          style={{
            gridTemplateColumns: `repeat(${activeGoals.length}, 1fr)`,
            width: "100%",
            maxWidth: "80rem",
          }}
        >
          {activeGoals.map(({ label, name }) => {
            const value = totalNutrients[name as keyof typeof totalNutrients];
            const goal = goals[name as keyof Goals];
            const range = goalRanges[name as keyof Goals];
            const isPercentage =
              goalFields.find((field) => field.name === name)?.isPercentage ??
              false;
            const unitMatch = label.match(/\((.*?)\)/);

            const displayValue = isPercentage
              ? `${(((value * 9) / calculateTotalCalories()) * 100).toFixed(
                  1
                )}%`
              : `${value}${unitMatch ? unitMatch[1] : ""}`;

            const color = isPercentage
              ? getMacronutrientColor(
                  value,
                  goal,
                  range,
                  isPercentage,
                  calculateTotalCalories()
                )
              : getMicronutrientColor(value, goal, range);

            return (
              <div key={name} className="text-center">
                <p
                  className={`text-3xl font-bold ${
                    color === "green"
                      ? "text-green-500"
                      : color === "yellow"
                      ? "text-yellow-500"
                      : color === "red"
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                >
                  {displayValue}
                </p>
                <p className="text-sm text-gray-500">
                  {label.replace(/\s\((.*?)\)/, "")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Goals Button */}
      <button
        onClick={openGoalsModal}
        className="mt-2 px-6 py-2 bg-green-400 text-white rounded-md shadow-md font-semibold hover:bg-green-500"
      >
        Edit Goals
      </button>

      {isGoalsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-md w-[1200px] h-[96vh] relative overflow-y-auto">
            {/* Title and Tooltip */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Edit Your Goals</h2>
              <div className="relative group">
                <div className="w-6 h-6 flex items-center justify-center bg-gray-300 text-white rounded-full text-sm font-bold cursor-pointer">
                  ?
                </div>
                <div className="absolute right-0 mt-2 w-[700px] p-4 bg-gray-600 text-white text-sm rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                  <p>
                    Here, you can set your personal goals for calories and
                    nutrients. Recommended daily intakes vary depending on age,
                    activity level, and overall health. By setting ranges for
                    calories and nutrients you can specify whether you aim to be
                    under, over, or match the exact amount set for each goal.
                    For general guidance, adults may aim for:
                  </p>
                  <ul className="mt-2 list-disc list-inside">
                    <li>Calories: ~2000–2500 kcal/day</li>
                    <li>Fats: ~70–90 g/day (about 30% of daily calories)</li>
                    <li>
                      Saturated fats: {"<"}10% of daily calories (~20 g/day)
                    </li>
                    <li>Trans Fats: {"<"}2 g/day</li>
                    <li>Polyunsaturated Fats: ~11–22 g/day</li>
                    <li>Monounsaturated Fats: ~33–44 g/day</li>
                    <li>Cholesterol: {"<"}300 mg/day</li>
                    <li>Sodium: {"<"}2,300 mg/day</li>
                    <li>Potassium: ~4,700 mg/day</li>
                    <li>Calcium: ~1,000–1,200 mg/day</li>
                    <li>Iron: ~8–18 mg/day</li>
                    <li>Magnesium: ~310–420 mg/day</li>
                    <li>Carbs: ~225–325 g/day (55% of daily calories)</li>
                    <li>Net Carbs: Varies based on dietary goals</li>
                    <li>Fiber: ~28–30 g/day</li>
                    <li>Sugars: {"<"}50 g/day</li>
                    <li>Protein: ~50–60 g/day (10–15% of daily calories)</li>
                    <li>Vitamin C: ~75–90 mg/day</li>
                    <li>Vitamin D: ~15–20 µg/day</li>
                    <li>Vitamin B12: ~2.4 µg/day</li>
                  </ul>
                  <p className="mt-2">
                    Before setting goals, it's important to consult a doctor and
                    undergo a blood test to ensure your targets are realistic
                    and safe, and not potentially harmful.
                    <br />
                    <br />
                    *If your nutrition label lists sodium instead of salt, you
                    can convert it: 1 g salt = 400 mg of sodium.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-4 gap-6">
              {goalFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  {/* Input Field */}
                  <div>
                    <label className="block font-medium">{field.label}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      name={field.name as string}
                      value={tempGoals[field.name]}
                      onChange={handleGoalsChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  {["fats", "carbs", "protein", "saturatedFats"].includes(
                    field.name as string
                  ) && (
                    <div>
                      <label className="flex items-center space-x-2">
                        <span className="text-sm">Track as Percentage</span>
                        <div
                          className={`relative inline-block w-10 h-6 cursor-pointer ${
                            field.isPercentage ? "bg-blue-400" : "bg-gray-300"
                          } rounded-full transition-colors`}
                          onClick={() => handleToggle(field.name)}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              field.isPercentage
                                ? "translate-x-4"
                                : "translate-x-0"
                            }`}
                          ></span>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Radio Buttons */}
                  <div>
                    <p className="text-sm font-medium text-gray-600">Range</p>
                    <div className="flex space-x-2">
                      {["under", "exact", "over"].map((range) => (
                        <label
                          key={range}
                          className="flex items-center space-x-1"
                        >
                          <input
                            type="radio"
                            name={`${field.name}-range`}
                            value={range}
                            checked={goalRanges[field.name] === range}
                            onChange={() =>
                              handleRangeChange(field.name, range)
                            }
                            className="form-radio"
                          />
                          <span className="text-sm">
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={closeGoalsModal}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveGoals}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full max-w-5xl justify-center mt-5">
        {/* Meal List Section */}
        <div className="flex flex-col w-1/2 space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{meal.name}</h3>
                <p>Calories: {meal.calories} kcal</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(meal)}
                  className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMeal(meal.id)}
                  className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => openModal()}
            className="mt-4 bg-blue-400 text-white p-2 rounded-md shadow-md font-semibold hover:bg-blue-500"
          >
            Add new meal
          </button>
          <button
            onClick={() => setIsMyMealsModalOpen(true)}
            className="bg-red-400 text-white p-2 rounded-md shadow-md font-semibold hover:bg-red-600"
          >
            Add meal from My Meals
          </button>
          {isMyMealsModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg p-4 w-1/2">
                <h2 className="text-xl font-bold mb-4">My Meals</h2>
                <ul>
                  {myMeals.length > 0 ? (
                    myMeals.map((meal) => (
                      <li
                        key={meal.id}
                        className="flex justify-between items-center p-2 border-b border-gray-200"
                      >
                        <span>
                          {meal.name} - {meal.calories} calories
                        </span>
                        <button
                          onClick={() => addMealFromMyMeals(meal)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">
                      No meals in your list yet.
                    </li>
                  )}
                </ul>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setIsMyMealsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie Chart and Progress Section */}
        <div className="flex flex-col items-center w-1/2 space-y-4">
          <div className="w-full max-w-md h-[400px] flex items-center justify-center">
            {isAllZero ? (
              <p className="text-center text-gray-500">
                No data available. Add meals to see your macros chart!
              </p>
            ) : (
              <Pie
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          const value = tooltipItem.raw as number;
                          return `${tooltipItem.label}: ${value.toFixed(2)}%`;
                        },
                      },
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            )}
          </div>

          {/* Progress Bar */}
          {goals.calories > 0 ? (
            <div className="w-full bg-gray-300 rounded-full h-4 relative">
              <div
                className={`h-4 rounded-full ${
                  calculateTotalCalories() > goals.calories + 50
                    ? "bg-red-500"
                    : calculateTotalCalories() < goals.calories - 50
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${
                    (calculateTotalCalories() / goals.calories) * 100
                  }%`,
                }}
              ></div>
              <p className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-semibold">
                {((calculateTotalCalories() / goals.calories) * 100).toFixed(1)}
                % of goal complete
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-2">
              Set your calorie goal to see progress.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-[90%] h-[90%] relative overflow-y-auto">
            {showConfirmDialog ? (
              <div className="absolute inset-0 bg-white p-6 rounded-md shadow-lg flex flex-col items-center justify-center z-20">
                <p className="mb-4 text-center text-gray-700">
                  You have unsaved changes. Are you sure you want to leave
                  without saving?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmDialog(false);
                      setHasUnsavedChanges(false);
                      setIsModalOpen(false);
                      confirmModalClose;
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {currentMeal.id ? "Edit Meal" : "Add Meal"}
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Meal Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentMeal.name}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Total Calories</label>
                  <p>{calculateMealCalories(currentMeal)} kcal</p>
                </div>
                {currentMeal.foods.length > 0 && (
                  <table className="macro-table w-full mt-4">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Food</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Calories</th>
                        <th className="px-4 py-2">Protein</th>
                        <th className="px-4 py-2">Carbs</th>
                        <th className="px-4 py-2">Fats</th>
                        {activeGoals.map(({ label }) => (
                          <th key={label} className="px-4 py-2">
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentMeal.foods.map((food) => (
                        <tr key={food.id}>
                          <td className="px-4 py-2">{food.name}</td>
                          <td className="px-4 py-2 flex justify-between items-center">
                            {editingFoodId === food.id ? (
                              <>
                                <input
                                  type="text"
                                  inputMode="text"
                                  value={servingSize}
                                  onChange={(e) => {
                                    setServingSize(Number(e.target.value));
                                  }}
                                  className="w-16 border border-gray-300 rounded px-2"
                                />
                                <span> ({food.servingSizeType})</span>
                                <button
                                  onClick={() => handleSave(food, servingSize)}
                                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                >
                                  ✓
                                </button>
                              </>
                            ) : (
                              <>
                                <span>
                                  {food.servingSize} ({food.servingSizeType})
                                </span>
                                <button
                                  onClick={() => setEditingFoodId(food.id)}
                                  className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300"
                                >
                                  ✎
                                </button>
                              </>
                            )}
                          </td>
                          <td className="px-4 py-2">{food.calories}</td>
                          <td className="px-4 py-2">{food.protein}</td>
                          <td className="px-4 py-2">{food.carbs}</td>
                          <td className="px-4 py-2">{food.fats}</td>
                          {activeGoals.map(({ name }) => (
                            <td key={name} className="px-4 py-2">
                              {food[name as keyof typeof food]}
                            </td>
                          ))}
                          <td className="px-4 py-2">
                            <button
                              onClick={() => openFoodModal(food)}
                              className="bg-blue-500 text-white p-1 rounded-md shadow-md hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteFood(food.id)}
                              className="bg-red-500 text-white p-1 rounded-md shadow-md hover:bg-red-700 ml-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="mt-4 flex justify-between">
                  <div className="flex">
                    <button
                      onClick={() => openFoodModal()}
                      className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-700"
                    >
                      Add new food
                    </button>
                    <button
                      onClick={openMyFoodModal}
                      className="bg-orange-400 text-white p-2 rounded-md ml-2 shadow-md hover:bg-orange-600"
                    >
                      Add food from My Foods
                    </button>
                    {isMyFoodsModalOpen && (
                      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-4 w-1/2">
                          <h2 className="text-xl font-bold mb-4">My Foods</h2>
                          <ul>
                            {myFoods.length > 0 ? (
                              myFoods.map((food) => (
                                <li
                                  key={food.id}
                                  className="flex justify-between items-center p-2 border-b border-gray-200"
                                >
                                  <span>
                                    {food.name} - {food.calories} calories
                                  </span>
                                  <button
                                    onClick={() => addFoodFromMyFoods(food)}
                                    className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-blue-700"
                                  >
                                    Add
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-500">
                                No foods in your list yet.
                              </li>
                            )}
                          </ul>
                          <div className="mt-4 text-right">
                            <button
                              onClick={closeMyFoodModal}
                              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={scanBarcode}
                      className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-700 ml-2"
                    >
                      Scan Barcode
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex">
                  <button
                    onClick={saveMeal}
                    className="bg-blue-500 text-white p-2 rounded-md shadow-md mt-6 hover:bg-blue-700"
                  >
                    Save Meal
                  </button>
                  <div className="flex items-center mt-6 ml-4">
                    <input
                      type="checkbox"
                      id="saveToMyMeals"
                      checked={saveToMyMeals}
                      onChange={(e) => setSaveToMyMeals(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="saveToMyMeals" className="text-gray-700">
                      Save this meal to My Meals
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      if (hasUnsavedChanges) {
                        setShowConfirmDialog(true);
                      } else {
                        closeModal();
                      }
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
                  >
                    &times;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isFoodModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-[87.5%] relative overflow-y-auto">
            {showConfirmDialogFood ? (
              <div className="absolute inset-0 bg-white p-6 rounded-md shadow-lg flex flex-col items-center justify-center z-20">
                <p className="mb-4 text-center text-gray-700">
                  You have unsaved changes. Are you sure you want to leave
                  without saving?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmDialogFood(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmDialogFood(false);
                      setHasUnsavedChangesFood(false);
                      setIsFoodModalOpen(false);
                      confirmFoodModalClose;
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Add Custom Food</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map((field, idx) => (
                    <div key={idx} className="mb-4">
                      <label className="block text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        inputMode="text"
                        name={field.name}
                        value={newFood[field.name] as string | number}
                        onChange={handleFoodInputChange}
                        className="p-2 border border-gray-300 rounded-md w-full"
                        placeholder={
                          field.name === "servingSizeType"
                            ? "e.g., grams, cup, piece, glass"
                            : ""
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={addFood}
                    className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700"
                  >
                    Save Food
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (hasUnsavedChangesFood) {
                      setShowConfirmDialogFood(true);
                    } else {
                      closeFoodModal();
                    }
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-2xl p-1"
                >
                  &times;
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <h2 className="text-3xl font-bold text-black mb-8 mt-20 md-4 text-center">
        {" "}
        Your monthly stats{" "}
      </h2>

      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => handleMonthChange("prev")}
          className="px-8 py-2 bg-white-300 text-gray-400 rounded-l text-xl font-bold"
        >
          {"<"}
        </button>
        <div
          className="px-4 py-2 bg-white-200 text-gray-800 text-center"
          style={{ width: "200px" }}
        >
          <p className="text-base font-semibold">{formatMonth(currentMonth)}</p>{" "}
          {/* Month and year */}
        </div>
        <button
          onClick={() => handleMonthChange("next")}
          className="px-8 py-2 bg-white-300 text-gray-400 text-xl font-bold"
        >
          {">"}
        </button>
      </div>
      <h2 className="text-xl font-bold text-black mb-8 mt-4 md-4 text-center">
        {" "}
        Monthly calorie intake{" "}
      </h2>
      <Bar
        data={dataMonthCalories}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw as number;
                  return `${tooltipItem.dataset.label}: ${value} kcal`;
                },
              },
            },
            legend: { position: "top" },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: false, beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default NutritionPage;
