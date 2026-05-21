/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Utensils, Flame, Soup, Fish, Egg, Cookie, Check } from "lucide-react";
import { Meal, Dish } from "../types";

interface NutritionScreenProps {
  lunchMeal: Meal | undefined;
}

type FilterCategory = "전체" | "밥류" | "국/찌개" | "반찬" | "디저트";

export default function NutritionScreen({ lunchMeal }: NutritionScreenProps) {
  // Let's hold the checked state of each dish. By default, all are checked!
  const [selectedDishIds, setSelectedDishIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<FilterCategory>("전체");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Whenever the active lunch meal changes, we reset selection to select all dishes by default!
  useEffect(() => {
    if (lunchMeal) {
      setSelectedDishIds(lunchMeal.detailedDishes.map((d) => d.id));
    } else {
      setSelectedDishIds([]);
    }
    setShowSaveSuccess(false);
  }, [lunchMeal]);

  const dishes = lunchMeal?.detailedDishes || [];

  const handleToggleDish = (id: string) => {
    if (selectedDishIds.includes(id)) {
      setSelectedDishIds(selectedDishIds.filter((dishId) => dishId !== id));
    } else {
      setSelectedDishIds([...selectedDishIds, id]);
    }
  };

  const getFilteredDishes = () => {
    if (activeTab === "전체") return dishes;
    return dishes.filter((d) => d.category === activeTab);
  };

  // Sum calculations
  const totalCalories = dishes
    .filter((d) => selectedDishIds.includes(d.id))
    .reduce((sum, d) => sum + d.calories, 0);

  const totalCarbs = dishes
    .filter((d) => selectedDishIds.includes(d.id))
    .reduce((sum, d) => sum + d.carbs, 0);

  const totalProtein = dishes
    .filter((d) => selectedDishIds.includes(d.id))
    .reduce((sum, d) => sum + d.protein, 0);

  const totalFat = dishes
    .filter((d) => selectedDishIds.includes(d.id))
    .reduce((sum, d) => sum + d.fat, 0);

  // Targets to calculate nice progress metrics
  const targetCarbs = 180; // g
  const targetProtein = 70; // g
  const targetFat = 80; // g

  const carbPercentage = Math.min(100, Math.round((totalCarbs / targetCarbs) * 100));
  const proteinPercentage = Math.min(100, Math.round((totalProtein / targetProtein) * 100));
  const fatPercentage = Math.min(100, Math.round((totalFat / targetFat) * 100));

  // Category Icon Mapper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "밥류":
        return <Flame size={18} className="text-[#3c5500]" />;
      case "국/찌개":
        return <Soup size={18} className="text-[#3c5500]" />;
      case "반찬":
        return <Fish size={18} className="text-[#3c5500]" />;
      case "디저트":
        return <Cookie size={18} className="text-[#3c5500]" />;
      default:
        return <Utensils size={18} className="text-[#3c5500]" />;
    }
  };

  const handleSaveLogs = () => {
    setShowSaveSuccess(true);
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3500);
  };

  const categories: FilterCategory[] = ["전체", "밥류", "국/찌개", "반찬", "디저트"];

  return (
    <div className="max-w-md mx-auto px-5 pt-4 pb-20 space-y-6">
      {/* Toast Notification */}
      {showSaveSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#3c5500] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce border border-[#c9f17c]/20">
          <Check size={16} />
          <span>김학생 군의 식이 로그에 영양 분석 정보가 저장되었습니다!</span>
        </div>
      )}

      {/* Nutrition Summary Card */}
      <section className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(42,36,26,0.05)] border border-[#e5e2db]">
        <h2 className="text-base font-bold text-[#3c5500] mb-2">오늘의 선택 영양</h2>
        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-3xl font-extrabold text-[#1c1c17]">{totalCalories}</span>
          <span className="text-xs font-semibold text-[#444939]">kcal</span>
        </div>

        <div className="space-y-4">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#444939]">단백질</span>
              <span className="text-[#1c1c17]">{totalProtein}g</span>
            </div>
            <div className="w-full h-2 bg-[#f6f3eb] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3c5500] rounded-full transition-all duration-500"
                style={{ width: `${proteinPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#444939]">탄수화물</span>
              <span className="text-[#1c1c17]">{totalCarbs}g</span>
            </div>
            <div className="w-full h-2 bg-[#f6f3eb] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#536500] rounded-full transition-all duration-500"
                style={{ width: `${carbPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#444939]">지방</span>
              <span className="text-[#1c1c17]">{totalFat}g</span>
            </div>
            <div className="w-full h-2 bg-[#f6f3eb] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#485229] rounded-full transition-all duration-500"
                style={{ width: `${fatPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Filter Chips */}
      <section className="overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex gap-1.5">
          {categories.map((cat, idx) => {
            const isTabActive = activeTab === cat;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(cat);
                  setShowSaveSuccess(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isTabActive
                    ? "bg-[#4f6f00] text-white shadow-sm font-bold"
                    : "bg-[#f1eee6] text-[#444939] hover:bg-[#ebe8e0]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Menu List */}
      <section className="space-y-3">
        {dishes.length > 0 ? (
          getFilteredDishes().map((dish) => {
            const isChecked = selectedDishIds.includes(dish.id);

            return (
              <div
                key={dish.id}
                onClick={() => handleToggleDish(dish.id)}
                className={`p-4 rounded-xl shadow-soft flex items-center justify-between cursor-pointer transition-all duration-200 bg-white hover:scale-[1.01] ${
                  isChecked
                    ? "border-2 border-[#3c5500] ring-2 ring-[#3c5500]/5"
                    : "border border-[#e5e2db]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2 rounded-full ${
                      isChecked ? "bg-[#c9f17c]/30 text-[#3c5500]" : "bg-[#f1eee6] text-[#444939]"
                    }`}
                  >
                    {getCategoryIcon(dish.category)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1c1c17]">{dish.name}</h3>
                    <p className="text-[10px] text-[#444939] mt-0.5">
                      {dish.calories}kcal • 
                      {dish.carbs > 0 && ` 탄 ${dish.carbs}g`}
                      {dish.protein > 0 && ` 단 ${dish.protein}g`}
                      {dish.fat > 0 && ` 지 ${dish.fat}g`}
                    </p>
                  </div>
                </div>

                {isChecked ? (
                  <CheckCircle2 size={20} className="text-[#3c5500]" />
                ) : (
                  <Circle size={20} className="text-[#c4c9b4]" />
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-[#444939] text-center py-6">선택한 날짜에 급식 한 끼 식단이 등록되지 않았습니다.</p>
        )}
      </section>

      {/* Save Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSaveLogs}
          className="bg-[#3c5500] text-[#ffffff] w-full py-4 rounded-full text-xs font-bold hover:bg-[#4f6f00] hover:text-[#c9f17c] transition-colors shadow-md cursor-pointer"
        >
          계산 결과 저장하기
        </button>
      </div>
    </div>
  );
}
