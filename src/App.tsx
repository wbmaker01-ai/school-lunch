/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Utensils, Bell, Settings, Home, CalendarRange, Calculator, User } from "lucide-react";
import {
  getTodayKST,
  getWeekDates,
  formatDateKey,
  getDefaultSelectedDate,
  getKoreanDayOfWeek,
} from "./utils/dateUtils";
import { generateMealsForWeek } from "./data/mockMeals";

// Component imports
import HomeScreen from "./components/HomeScreen";
import MealCalendarScreen from "./components/MealCalendarScreen";
import NutritionScreen from "./components/NutritionScreen";
import ProfileScreen from "./components/ProfileScreen";

type TabType = "home" | "calendar" | "nutrition" | "profile";

export default function App() {
  // 1. Calculate today's date in KST
  const today = useMemo(() => getTodayKST(), []);
  
  // 2. Set default active date (Mon-Fri -> today, Sat/Sun -> next Monday)
  const initialActiveDate = useMemo(() => getDefaultSelectedDate(today), [today]);
  const [activeDate, setActiveDate] = useState<Date>(initialActiveDate);
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // Determine if it is currently weekend KST
  const isWeekend = useMemo(() => {
    const day = today.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  }, [today]);

  // 3. Dynamically generate meals for the week containing the active screen date
  const weekDates = useMemo(() => getWeekDates(activeDate), [activeDate]);
  const meals = useMemo(() => generateMealsForWeek(weekDates), [weekDates]);

  // Find the lunch and dinner meals for the activeDate
  const lunchMeal = useMemo(() => {
    const key = formatDateKey(activeDate);
    return meals.find((m) => m.dateKey === key && m.mealType === "중식");
  }, [meals, activeDate]);

  const dinnerMeal = useMemo(() => {
    const key = formatDateKey(activeDate);
    return meals.find((m) => m.dateKey === key && m.mealType === "석식");
  }, [meals, activeDate]);

  // Navigate to Calendar view and focus active selection
  const handleNavigateToCalendar = () => {
    setActiveTab("calendar");
  };

  // Render content based on current active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            today={today}
            activeDate={activeDate}
            isWeekend={isWeekend}
            lunchMeal={lunchMeal}
            dinnerMeal={dinnerMeal}
            onNavigateToCalendar={handleNavigateToCalendar}
          />
        );
      case "calendar":
        return (
          <MealCalendarScreen
            activeDate={activeDate}
            weekDates={weekDates}
            lunchMeal={lunchMeal}
            dinnerMeal={dinnerMeal}
            onSelectDate={(date) => setActiveDate(date)}
          />
        );
      case "nutrition":
        return <NutritionScreen lunchMeal={lunchMeal} />;
      case "profile":
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#fcf9f1] text-[#1c1c17] min-h-screen pb-24 md:pb-6 font-sans antialiased">
      {/* TopAppBar */}
      <header className="bg-[#fcf9f1] border-b border-[#e5e2db]/45 flex justify-between items-center px-5 h-16 w-full max-w-md mx-auto sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1eee6] text-[#3c5500] transition-colors">
            <Utensils size={20} className="stroke-[2.5]" />
          </div>
          <h1 className="text-sm font-bold text-[#3c5500] tracking-wide">
            씨마스고등학교 급식
          </h1>
        </div>
        <div>
          {activeTab === "profile" ? (
            <button
              onClick={() => setActiveTab("profile")}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3c5500] hover:bg-[#f1eee6] transition-colors cursor-pointer"
            >
              <Settings size={20} />
            </button>
          ) : (
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3c5500] hover:bg-[#f1eee6] transition-colors cursor-pointer"
              title="알림"
            >
              <Bell size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Main content canvas limited to standard mobile form-factor for precision matching */}
      <main className="w-full max-w-md mx-auto">
        {renderTabContent()}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e5e2db] shadow-lg rounded-t-2xl max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center py-1 px-4 transition-all duration-200 cursor-pointer ${
            activeTab === "home"
              ? "bg-[#3c5500] text-white rounded-2xl scale-100 shadow-md py-1.5"
              : "text-[#444939] opacity-75 hover:bg-[#f1eee6]/50 rounded-xl"
          }`}
        >
          <Home size={18} className={activeTab === "home" ? "stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] font-bold mt-1">홈</span>
        </button>

        {/* Meal Calendar */}
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex flex-col items-center justify-center py-1 px-4 transition-all duration-200 cursor-pointer ${
            activeTab === "calendar"
              ? "bg-[#3c5500] text-white rounded-2xl scale-100 shadow-md py-1.5"
              : "text-[#444939] opacity-75 hover:bg-[#f1eee6]/50 rounded-xl"
          }`}
        >
          <CalendarRange size={18} className={activeTab === "calendar" ? "stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] font-bold mt-1">식단표</span>
        </button>

        {/* Nutrition Calculator */}
        <button
          onClick={() => setActiveTab("nutrition")}
          className={`flex flex-col items-center justify-center py-1 px-4 transition-all duration-200 cursor-pointer ${
            activeTab === "nutrition"
              ? "bg-[#3c5500] text-white rounded-2xl scale-100 shadow-md py-1.5"
              : "text-[#444939] opacity-75 hover:bg-[#f1eee6]/50 rounded-xl"
          }`}
        >
          <Calculator size={18} className={activeTab === "nutrition" ? "stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] font-bold mt-1">영양계산</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center py-1 px-4 transition-all duration-200 cursor-pointer ${
            activeTab === "profile"
              ? "bg-[#3c5500] text-white rounded-2xl scale-100 shadow-md py-1.5"
              : "text-[#444939] opacity-75 hover:bg-[#f1eee6]/50 rounded-xl"
          }`}
        >
          <User size={18} className={activeTab === "profile" ? "stroke-[2.5]" : "stroke-[1.8]"} />
          <span className="text-[10px] font-bold mt-1">프로필</span>
        </button>
      </nav>
    </div>
  );
}
