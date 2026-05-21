/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NutritionInfo {
  carbs: number;    // g
  protein: number;  // g
  fat: number;      // g
}

export interface Dish {
  id: string;
  name: string;
  calories: number; // kcal
  carbs: number;    // g
  protein: number;  // g
  fat: number;      // g
  category: "밥류" | "국/찌개" | "반찬" | "디저트";
}

export interface Meal {
  id: string;
  schoolName: string;
  date: Date;
  dateKey: string;
  dayOfWeek: string; // "월" | "화" | "수" | "목" | "금"
  mealType: "중식" | "석식";
  title: string;
  dishes: string[]; // Standard menu string list
  detailedDishes: Dish[]; // Menu list with detailed calories/nutrient info for the calculator
  totalCalories: number;
  nutrition: NutritionInfo;
  allergens: string[];
}
