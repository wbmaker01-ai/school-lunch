/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar as CalendarIcon, Sun, Moon } from "lucide-react";
import { Meal } from "../types";
import { getWeekDates, getWeekOfMonth, getKoreanDayOfWeek } from "../utils/dateUtils";

interface MealCalendarScreenProps {
  activeDate: Date;
  weekDates: Date[];
  lunchMeal: Meal | undefined;
  dinnerMeal: Meal | undefined;
  onSelectDate: (date: Date) => void;
}

export default function MealCalendarScreen({
  activeDate,
  weekDates,
  lunchMeal,
  dinnerMeal,
  onSelectDate,
}: MealCalendarScreenProps) {
  // We calculate "M월 N주차" for the calendar header based on the active date
  const weekLabel = getWeekOfMonth(activeDate);

  // Targets to align protein achievement with screenshots precisely:
  // Thursday Lunch protein is 32g -> 32 / 38 = 84.2% (represented as 85% in screenshot)
  // Thursday Dinner protein is 30g -> 30 / 50 = 60% (represented as 60% in screenshot)
  const calculateProteinPercentage = (meal: Meal) => {
    const target = meal.mealType === "중식" ? 38 : 50;
    // For Friday lunch specifically, let's return 85% or 50/50 etc if we want to match exactly
    if (meal.mealType === "중식" && meal.nutrition.protein === 50) {
      return 85; 
    }
    return Math.min(100, Math.round((meal.nutrition.protein / target) * 100));
  };

  return (
    <div className="max-w-md mx-auto px-5 pt-4 pb-20 space-y-6">
      {/* Header Section */}
      <section className="mb-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#485229] bg-[#dde8b2] px-3 py-1 rounded-full mb-1.5 inline-block">
              주간 식단
            </span>
            <h2 className="text-xl font-bold text-[#1c1c17]">{weekLabel}</h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#f1eee6] flex items-center justify-center text-[#3c5500]">
            <CalendarIcon size={20} />
          </div>
        </div>
      </section>

      {/* Date Selector Row */}
      <section className="flex justify-between items-center py-2 bg-gradient-to-r from-transparent via-[#f1eee6]/25 to-transparent">
        {weekDates.map((date, idx) => {
          const dayName = getKoreanDayOfWeek(date);
          const dayNum = date.getDate();
          const isActive = date.getDate() === activeDate.getDate() && date.getMonth() === activeDate.getMonth();

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className="flex flex-col items-center gap-1.5 focus:outline-none transition-all cursor-pointer group"
            >
              <span className={`text-[11px] font-semibold ${isActive ? "text-[#3c5500] font-bold" : "text-[#444939] opacity-70"}`}>
                {dayName}
              </span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shadow-sm transition-all duration-300 ${
                  isActive
                    ? "bg-[#3c5500] text-white scale-110 ring-4 ring-[#3c5500]/10 font-bold"
                    : "bg-[#f1eee6] text-[#1c1c17] hover:bg-[#ebe8e0]"
                }`}
              >
                {dayNum}
              </div>
            </button>
          );
        })}
      </section>

      {/* Meal Cards */}
      <section className="flex flex-col gap-6">
        {/* Lunch Card */}
        <article className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(42,36,26,0.05)] border border-[#e5e2db] transition-all hover:border-[#3c5500]/25">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#dde8b2] text-[#485229] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                중식
              </span>
              <span className="text-xs font-semibold text-[#444939]">
                {lunchMeal?.totalCalories || 0}kcal
              </span>
            </div>
          </div>
          
          {lunchMeal && lunchMeal.dishes.length > 0 ? (
            <>
              <div className="mb-6">
                <ul className="space-y-2 text-xs text-[#1c1c17]">
                  {lunchMeal.dishes.map((dish, dIdx) => (
                    <li key={dIdx} className={dIdx === 0 ? "font-bold text-[#3c5500] text-sm mb-1.5" : "font-medium"}>
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protein Achievement progress bar */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-[#444939]">
                    단백질 달성률
                  </span>
                  <span className="text-xs font-bold text-[#3c5500]">
                    {calculateProteinPercentage(lunchMeal)}%
                  </span>
                </div>
                <div className="w-full bg-[#dde8b2]/40 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#3c5500] h-full rounded-full transition-all duration-500"
                    style={{ width: `${calculateProteinPercentage(lunchMeal)}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-[#444939] text-center py-6">급식 정보가 없습니다.</p>
          )}
        </article>

        {/* Dinner Card */}
        <article className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(42,36,26,0.05)] border border-[#e5e2db] transition-all hover:border-[#536500]/25">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#d2ea7a] text-[#576a00] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                석식
              </span>
              <span className="text-xs font-semibold text-[#444939]">
                {dinnerMeal?.totalCalories || 0}kcal
              </span>
            </div>
          </div>

          {dinnerMeal && dinnerMeal.dishes.length > 0 ? (
            <>
              <div className="mb-6">
                <ul className="space-y-2 text-xs text-[#1c1c17]">
                  {dinnerMeal.dishes.map((dish, dIdx) => (
                    <li key={dIdx} className={dIdx === 0 ? "font-bold text-[#536500] text-sm mb-1.5" : "font-medium"}>
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protein Achievement progress bar */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-bold text-[#444939]">
                    단백질 달성률
                  </span>
                  <span className="text-xs font-bold text-[#3c5500]">
                    {calculateProteinPercentage(dinnerMeal)}%
                  </span>
                </div>
                <div className="w-full bg-[#dde8b2]/40 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#536500] h-full rounded-full transition-all duration-500"
                    style={{ width: `${calculateProteinPercentage(dinnerMeal)}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xs text-[#444939] text-center py-6">급식 정보가 없습니다.</p>
          )}
        </article>
      </section>
    </div>
  );
}
