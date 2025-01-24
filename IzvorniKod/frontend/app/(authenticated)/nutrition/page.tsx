"use client";

import React, { useState, useEffect, useCallback } from "react";

import { useFood } from "@/hooks/useFood";
import { useMeal } from "@/hooks/useMeal";
import { useNutritionPlan } from "@/hooks/useNutritionPlan";

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

import { FoodBase } from "@/types/food";
import { MealBase } from "@/types/meal";
import { NutritionPlanBase } from "@/types/nutritionPlan";
import { MealSuggestionBase } from "@/types/mealSuggestion";

const NutritionPage = () => {

  const { foods, createFood, getFoodById, updateFood, deleteFood: hookDeleteFood } = useFood();
  const { meals: hookMeals, createMeal, getMealById, updateMeal, deleteMeal: hookDeleteMeal } = useMeal();
  const {
    nutritionPlan: hookNUtritionPlan,
    createNutritionPlan,
    getNutritionPlan,
  } = useNutritionPlan();

  useEffect(() => {
    console.log("Loaded foods:", foods);
  }, [foods]);  

  const [meals, setMeals] = useState<MealBase[]>([]);
  const [mealFoods, setMealFoods] = useState<FoodBase[]>([]);
  const [mealSuggestions, setMealSuggestions] = useState<MealSuggestionBase[]>([]);
  const [mealSuggestionsByDate, setMealSuggestionsByDate] = useState<{ [key: string]: MealSuggestionBase[] }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasUnsavedChangesFood, setHasUnsavedChangesFood] = useState(false);
  const [showConfirmDialogFood, setShowConfirmDialogFood] = useState(false);

  const [totalNutrients, setTotalNutrients] = useState({
    fat: 0,
    carbs: 0,
    protein: 0,
  });

  const defaultMeal: MealBase = {
    id: 0,
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    userId: 0,
    dailyNutritionLogId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };  

  const [goals, setGoals] = useState<NutritionPlanBase>({
    id: 0,
    userId: 0,
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    startDate: new Date(),
    endDate: undefined,
  });

  const [newFood, setNewFood] = useState<FoodBase>({
    id: 0,
    name: "",
    defaultNumber: 0,
    unit: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });

  const [currentMeal, setCurrentMeal] = useState<MealBase>(defaultMeal);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlanBase>(goals);

  //Date---------------------------------------------------------------------------------------------------------------------
  const [mealsByDate, setMealsByDate] = useState<{ [key: string]: MealBase[] }>({});
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
  const calculateTotalCalories = useCallback(() => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  }, [meals]);

  const calculateTotalNutrients = useCallback(() => {
    return meals.reduce(
      (totals, meal) => {
        totals.protein += meal.protein || 0;
        totals.carbs += meal.carbs || 0;
        totals.fat += meal.fat || 0;
        return totals;
      },
      {
        protein: 0,
        carbs: 0,
        fat: 0,
      }
    );
  }, [meals]);

  const calculatePercentages = useCallback(() => {
    const totalCalories = calculateTotalCalories();

    if (totalCalories === 0) return [0, 0, 0];

    return [
      ((totalNutrients.protein * 4) / totalCalories) * 100,
      ((totalNutrients.carbs * 4) / totalCalories) * 100,
      ((totalNutrients.fat * 9) / totalCalories) * 100,
    ];
  }, [calculateTotalCalories, totalNutrients]);

  useEffect(() => {
    calculateTotalCalories();
  }, [meals, calculateTotalCalories]);

  useEffect(() => {
    setTotalNutrients(calculateTotalNutrients());
  }, [meals, calculateTotalNutrients]);

  const [tempGoals, setTempGoals] = useState<NutritionPlanBase>(goals);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);

  const [goalFields, setGoalFields] = useState<
    { label: string; name: keyof NutritionPlanBase; isPercentage?: boolean }[]
  >([
    { label: "Calories (kcal)", name: "calories" }, //1.1
    { label: "Carbohydrates (g)", name: "carbs", isPercentage: false }, //1.2
    { label: "Protein (g)", name: "protein", isPercentage: false }, //1.3
    { label: "Fats (g)", name: "fat", isPercentage: false }, //1.4
  ]);

  const activeGoals = goalFields.filter(
    ({ name }) =>
      !["calories", "fat", "carbs", "protein"].includes(name as string)
  );

  const handleToggle = (fieldName: keyof NutritionPlanBase) => {
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
    [key in keyof NutritionPlanBase]?: string;
  }>({});

  const handleRangeChange = (goalName: keyof NutritionPlanBase, range: string) => {
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
      const calorieValue = current * (range === "fat" ? 9 : 4);
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
  }, [totalNutrients, calculatePercentages]);

  //Meal modal-----------------------------------------------------------------------------------------------------------------------------------------------------------
  const openModal = (meal?: MealBase) => {
    setCurrentMeal(
      meal
        ? { ...meal }
        : {
            id: 0,
            name: "",
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            userId: 0,
            dailyNutritionLogId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
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
  
    setCurrentMeal((prevMeal) => {
      if (!prevMeal) return prevMeal;
  
      return {
        ...prevMeal,
        [name]: name === "calories" ? Number(value) : value,
      };
    });
  
    setHasUnsavedChanges(true);
  };

  const [myMeals, setMyMeals] = useState<MealBase[]>([]);
  const [isMyMealsModalOpen, setIsMyMealsModalOpen] = useState(false);
  const [saveToMyMeals, setSaveToMyMeals] = useState(false);

  const addMealFromMyMeals = async (meal: MealBase) => {
    const dateKey = formatDateKey(currentDate);
  
    try {
      const newMeal = await createMeal({ ...meal, dailyNutritionLogId: currentMeal.dailyNutritionLogId });
      setMealsByDate((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newMeal],
      }));
      console.log("Meal added from My Meals:", newMeal);
    } catch (error) {
      console.error("Failed to add meal from My Meals:", error);
    }
  };  

  const saveMeal = async () => {
    if (!currentMeal || !currentMeal.name?.trim()) {
      alert("Please provide a name for your meal!");
      return;
    }
  
    try {
      if (currentMeal.id === 0) {
        // Call backend to create a new meal
        const newMeal = await createMeal(currentMeal);
        console.log("Meal created:", newMeal);
      } else {
        // Call backend to update the existing meal
        await updateMeal(currentMeal.id, currentMeal);
        console.log("Meal updated:", currentMeal);
      }
  
      // Close modal and reset state
      setIsModalOpen(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to save meal:", error);
    }
  };
  
  const deleteMeal = async (id: number) => {
    try {
      await hookDeleteMeal(id); // Call backend to delete meal
      console.log(`Meal with ID ${id} deleted`);
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
  };
  
  const [servingSize, setServingSize] = useState<number>(0);

  const handleSave = (food: FoodBase, newAmount: number) => {
    const ratio = newAmount / food.defaultNumber;
  
    const updatedFood: FoodBase = {
      ...food,
      defaultNumber: newAmount,
      calories: Math.round(food.calories * ratio),
      fat: parseFloat((food.fat * ratio).toFixed(1)),
      protein: parseFloat((food.protein * ratio).toFixed(1)),
      carbs: parseFloat((food.carbs * ratio).toFixed(1)),
    };
  
    // Update mealFoods array
    setMealFoods((prevMealFoods) =>
      prevMealFoods.map((f) => (f.id === food.id ? updatedFood : f))
    );
  
    // Update currentMeal nutrient totals
    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      calories: prevMeal.calories - food.calories + updatedFood.calories,
      protein: prevMeal.protein - food.protein + updatedFood.protein,
      carbs: prevMeal.carbs - food.carbs + updatedFood.carbs,
      fat: prevMeal.fat - food.fat + updatedFood.fat,
    }));
  
    // Exit editing mode
    setEditingFoodId(null);
  };  

  const [editingFoodId, setEditingFoodId] = useState<number | null>(null);

  //Food modal----------------------------------------------------------------------------------------------------------------------------------------------------------
  const fields: { label: string; name: keyof FoodBase }[] = [
    { label: "Food Name", name: "name" },
    { label: "Serving Size", name: "defaultNumber" },
    { label: "Unit", name: "unit" },
    { label: "Calories", name: "calories" },
    { label: "Fats", name: "fat" },
    { label: "Carbs", name: "carbs" },
    { label: "Protein", name: "protein" },
  ];

  const openFoodModal = (food?: FoodBase) => {
    setNewFood(food ? { ...food } : {
      id: 0,
      name: "",
      defaultNumber: 0,
      unit: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    });
    setIsFoodModalOpen(true);
  };  

  const [myFoods, setMyFoods] = useState<FoodBase[]>([]);

  const saveFood = async () => {
    if (!newFood.name?.trim()) {
      alert("Please provide a name for the food!");
      return;
    }
  
    try {
      // Create or update the food in the backend
      let updatedOrCreatedFood = newFood;
      if (newFood.id) {
        await updateFood(newFood); // Update food in backend
        console.log("Food updated in backend:", newFood);
      } else {
        updatedOrCreatedFood = await createFood(newFood); // Add new food in backend
        console.log("Food added in backend:", updatedOrCreatedFood);
      }
  
      // Update the `currentMeal` state
      setCurrentMeal((prevMeal: MealBase) => {
        const updatedFoods = mealFoods.map((food: FoodBase) =>
          food.id === updatedOrCreatedFood.id ? updatedOrCreatedFood : food
        );
  
        // Add food if it doesn't exist in the current meal
        if (!mealFoods.some((food: FoodBase) => food.id === updatedOrCreatedFood.id)) {
          updatedFoods.push(updatedOrCreatedFood);
        }
  
        // Recalculate calories
        const totalCalories = updatedFoods.reduce(
          (sum: number, food: FoodBase) => sum + food.calories,
          0
        );
  
        return {
          ...prevMeal,
          calories: totalCalories,
        };
      });
  
      // Update the `mealFoods` state for rendering
      setMealFoods((prevMealFoods: FoodBase[]) => {
        const updatedMealFoods = prevMealFoods.map((food: FoodBase) =>
          food.id === updatedOrCreatedFood.id ? updatedOrCreatedFood : food
        );
  
        // Add the food if not already in the state
        if (!prevMealFoods.some((food: FoodBase) => food.id === updatedOrCreatedFood.id)) {
          updatedMealFoods.push(updatedOrCreatedFood);
        }
  
        console.log("Updated mealFoods:", updatedMealFoods);
        return updatedMealFoods;
      });
  
      // Update the `myFoods` state
      setMyFoods((prevFoods: FoodBase[]) => {
        const foodExists = prevFoods.some(
          (food: FoodBase) =>
            food.name.toLowerCase() === updatedOrCreatedFood.name.toLowerCase()
        );
  
        if (!foodExists) {
          return [...prevFoods, updatedOrCreatedFood];
        }
  
        return prevFoods;
      });
  
      // Close the modal and reset
      setHasUnsavedChangesFood(false);
      setIsFoodModalOpen(false);
    } catch (error) {
      console.error("Failed to add or update food:", error);
    }
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

    const numericFields = ["id", "defaultNumber", "calories", "fat", "carbs", "protein"];
    setNewFood((prevFood) => ({
      ...prevFood,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));

    setHasUnsavedChangesFood(true);
  };

  const [isMyFoodsModalOpen, setIsMyFoodsModalOpen] = useState(false);

  const openMyFoodModal = () => {
    setIsMyFoodsModalOpen(true);
  };

  const closeMyFoodModal = () => {
    setIsMyFoodsModalOpen(false);
  };

  const addFoodFromMyFoods = (food: FoodBase) => {
    setCurrentMeal((prevMeal) => ({
      ...prevMeal,
      calories: prevMeal.calories + food.calories,
      protein: prevMeal.protein + food.protein,
      carbs: prevMeal.carbs + food.carbs,
      fat: prevMeal.fat + food.fat,
    }));
  
    closeFoodModal();
  };   

  const deleteFood = async (food: FoodBase) => {
    try {
      await hookDeleteFood(food.id); // Call backend to delete food
      console.log(`Food with ID ${food.id} deleted`);
    } catch (error) {
      console.error("Failed to delete food:", error);
    }
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

  const calculateDailyCalories = useCallback(() => {
    const monthKey = formatMonthKey(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);

    const dailyCalories = Array(daysInMonth).fill(0);

    Object.entries(mealsByDate).forEach(([dateKey, meals]) => {
      if (dateKey.startsWith(monthKey)) {
        const day = parseInt(dateKey.split("-")[2], 10) - 1;
        dailyCalories[day] = meals.reduce(
          (sum, meal) => sum + meal.calories,
          0
        );
      }
    });

    return dailyCalories;
  }, [currentMonth, mealsByDate]);

  useEffect(() => {
    calculateDailyCalories();
  }, [currentMonth, mealsByDate, calculateDailyCalories]);

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
  }, [currentMonth, mealsByDate, calculateDailyCalories]);

  //Month Selector--------------------------------------------------------------------------------------------------------------------------------------------------------
  const [mealsByMonth, setMealsByMonth] = useState<Record<string, MealBase[]>>({});

  const formatMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
    const updatedMealsByMonth = Object.entries(mealsByDate).reduce(
      (acc, [date, meals]) => {
        const mealDate = new Date(date);
        if (
          mealDate.getMonth() === month.getMonth() &&
          mealDate.getFullYear() === month.getFullYear()
        ) {
          acc[date] = meals;
        }
        return acc;
      },
      {} as Record<string, MealBase[]>
    );
    setMealsByMonth(updatedMealsByMonth);
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
          { name: "fat", label: "Fats", bgColor: "bg-yellow-100" },
        ].map(({ name, label, bgColor }) => {
          const value = totalNutrients[name as keyof typeof totalNutrients];
          const goal = goals[name as keyof NutritionPlanBase];
          const range = goalRanges[name as keyof NutritionPlanBase] ?? "exact";
          const isPercentage =
            goalFields.find((field) => field.name === name)?.isPercentage ??
            false;

          const content =
          typeof goal === "number" && goal > 0 ? (
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
                        ((value * (name === "fat" ? 9 : 4)) /
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

      {/* Edit Goals Button */}
      <button
        onClick={openGoalsModal}
        className="mt-2 px-6 py-2 bg-green-400 text-white rounded-md shadow-md font-semibold hover:bg-green-500"
      >
        Edit Goals
      </button>

      {isGoalsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-md w-[520px] h-[70vh] relative overflow-y-auto">
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
                    <li>Carbs: ~225–325 g/day (55% of daily calories)</li>
                    <li>Protein: ~50–60 g/day (10–15% of daily calories)</li>
                  </ul>
                  <p className="mt-2">
                    Before setting goals, it&apos;s important to consult a
                    doctor and undergo a blood test to ensure your targets are
                    realistic and safe, and not potentially harmful.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              {goalFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  {/* Input Field */}
                  <div>
                    <label className="block font-medium">{field.label}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      name={field.name as string}
                      value={goals.startDate ? goals.startDate.toISOString().split("T")[0] : ""}
                      onChange={handleGoalsChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  {["fat", "carbs", "protein"].includes(
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
        <div className="flex flex-col w-1/2 space-y-4 mr-2">
          <h2 className="text-2xl font-semibold text-center">My Meals</h2>
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
        <div className="flex flex-col w-1/2 space-y-4 ml-2">

          {/* Suggested Meal List Section */}
          <h2 className="text-2xl font-semibold text-center">Suggested Meals</h2>
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
                  onClick={() => addMealFromMyMeals(meal)}
                  className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-700"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
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
                      confirmModalClose();
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
                  <p>{currentMeal.calories} kcal</p>
                </div>
                {mealFoods.length > 0 ? (
                <table className="macro-table w-full mt-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Food</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Calories</th>
                      <th className="px-4 py-2">Protein</th>
                      <th className="px-4 py-2">Carbs</th>
                      <th className="px-4 py-2">Fats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealFoods.map((food) => (
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
                                <span> ({food.unit})</span>
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
                                  {food.defaultNumber} ({food.unit})
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
                          <td className="px-4 py-2">{food.fat}</td>
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
                              onClick={() => deleteFood(food)}
                              className="bg-red-500 text-white p-1 rounded-md shadow-md hover:bg-red-700 ml-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 mt-4">No foods added to this meal yet.</p>
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
                            {foods.length > 0 ? (
                              foods.map((food) => (
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
                      confirmFoodModalClose();
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
                          field.name === "unit"
                            ? "e.g., grams, cup, piece, glass"
                            : ""
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={saveFood}
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
          onClick={() =>
            handleMonthChange(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
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
          onClick={() =>
            handleMonthChange(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
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
