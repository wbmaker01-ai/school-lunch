/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Utensils, Bell, Calendar, Sun, Moon } from "lucide-react";
import { Meal } from "../types";
import { formatKoreanDate } from "../utils/dateUtils";

interface HomeScreenProps {
  today: Date;
  activeDate: Date;
  isWeekend: boolean;
  lunchMeal: Meal | undefined;
  dinnerMeal: Meal | undefined;
  onNavigateToCalendar: () => void;
}

export default function HomeScreen({
  today,
  activeDate,
  isWeekend,
  lunchMeal,
  dinnerMeal,
  onNavigateToCalendar,
}: HomeScreenProps) {
  // Let's obtain the main dish title or the meal's recommendation.
  // Cheese cutlet is always a favorite, or whatever title the template holds.
  const mainTitle = lunchMeal?.title || "급식 준비중";
  const mainCals = lunchMeal?.totalCalories || 0;
  
  // Custom descriptions to match the templates beautifully
  const getDescription = () => {
    if (lunchMeal?.title.includes("치즈돈까스")) {
      return "바삭한 튀김옷 속에 고소한 모짜렐라 치즈가 듬뿍 들어간 수제 치즈돈까스입니다. 상큼한 샐러드와 특별히 우려낸 깊은 맛의 미역국을 함께 즐기세요.";
    }
    if (lunchMeal?.title.includes("비빔밥")) {
      return "신선한 비빔밥 고명과 맑은 콩나물국, 그리고 육즙 가득 전통궁중떡갈비를 더했습니다. 건강하고 풍성한 영양소를 듬뿍 담은 월요일 맛점!";
    }
    if (lunchMeal?.title.includes("제육")) {
      return "부드러운 돈육에 매콤달콤 비법 제육 양념을 입혀 구워내어 신선한 상추쌈, 쌈장, 칼칼안 얼큰순두부찌개와 꿀조합을 이루는 인기 메뉴입니다.";
    }
    if (lunchMeal?.title.includes("닭강정")) {
      return "오븐에 바삭하게 구워낸 순살 허니닭강정과 부드러운 단호박카레라이스, 우동의 조화! 든든함과 감칠맛을 동시에 잡은 특별 식단입니다.";
    }
    if (lunchMeal?.title.includes("고등어")) {
      return "카레가루를 살짝 입혀 기름기 쏙 빼고 담백하게 구워낸 노르웨이산 영양 만점 고등어구이와 푸짐한 돈육 두부김치찌개의 건강한 밥상입니다.";
    }
    return "영양이 가득 균형 잡힌 고품격 식단입니다. 씨마스고등학교 학생 및 교직원을 위한 최고의 한 끼를 제공합니다.";
  };

  const getHeroImage = () => {
    // If thursday / cheesecutlet, return the specific cheese cutlet URL from screens
    if (lunchMeal?.title.includes("치즈돈까스")) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCCHaDGSrhnjZQB30dPO0B-1flt-KSOFoPVMOj9H37_13Q9nCDcGgXwWU_qomBhaSFPahMxKtqTPak2Vj_wo9pDyb52RoqVN5etdnsu8VsGcKjXEQ70bKg9ge9pVZcqSQuJ-dC3qKreuI3kEO2PpOku34HYs0O8N_97iIVpySBBSw3Kla3N-jW-DSInhmVw-4qJ62I3xPpU1x2eoQxi1tBb25lBLxYlTPZaZmAGop9xaRvb7IIBv7PfuaXKlEfUur7buExdQtgYcA";
    }
    // Return standard premium portrait image
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuBd4JTexWIuNK0NMdo2i1q7rXHj5IBNc85l9bdMxkCXJFOAk0ZSaIj21RcuwYce1R0ugJR7A10hi64Aw9NkT2r4w5OaNxn88fTiJZS5ItuopJ80CIj4jNd3gW5sIF6AYRH2jFuYIL3idoI1FSHjak_vV4QplsOnt1YdcMGj0rCuRLhxEeZFZDb4JctyLkXGSIrvykwlj-VtLPUNmBYsDVSJiazLW3DgVuOE6FSzeK-lqWQ7I3v8jmW0BVEAEcP1nweXngucwKsUrA";
  };

  return (
    <div className="max-w-md mx-auto px-5 space-y-6 pt-4 pb-20">
      {/* Date Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-primary">
            {isWeekend ? "주말 급식 휴무안내" : "오늘의 급식"}
          </span>
          <h2 className="text-lg font-bold text-[#1c1c17] mt-1">
            {formatKoreanDate(isWeekend ? today : activeDate)}
          </h2>
        </div>
        <button
          onClick={onNavigateToCalendar}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f1eee6] text-[#3c5500] hover:bg-[#ebe8e0] transition-colors"
          title="식단표 보기"
        >
          <Calendar size={20} />
        </button>
      </div>

      {/* Weekend Info Banner */}
      {isWeekend && (
        <div className="bg-[#dde8b2] border border-[#3c5500]/20 rounded-xl p-4 flex flex-col gap-1 text-xs text-[#3c5500] shadow-sm animate-pulse">
          <span className="font-bold text-sm">💡 오늘은 즐거운 주말입니다!</span>
          <p className="text-[#485229] leading-relaxed">
            주말에는 급식이 운영되지 않아, 가장 가까운 급식일인{" "}
            <strong>{formatKoreanDate(activeDate)}</strong>의 추천 식단을 안내해 드립니다.
          </p>
        </div>
      )}

      {/* Hero Card (Today's / Next Day's Recommendation) */}
      <section className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(42,36,26,0.05)] border border-[#e5e2db] relative group">
        <div className="absolute top-4 left-4 z-10 bg-[#4f6f00] text-[#c9f17c] px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm flex items-center gap-1">
          {isWeekend ? "다음 급식일 추천" : "오늘의 추천 급식"}
        </div>
        
        <div className="h-48 w-full bg-[#f6f3eb] relative overflow-hidden">
          <img
            alt={mainTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            src={getHeroImage()}
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-base font-bold text-[#1c1c17]">{mainTitle}</h3>
            <span className="text-xs font-semibold text-[#536500] bg-[#f1eee6] px-2 py-0.5 rounded">
              {mainCals} kcal
            </span>
          </div>
          <p className="text-xs text-[#444939] leading-relaxed line-clamp-3">
            {getDescription()}
          </p>
        </div>
      </section>

      {/* Lunch Detail Card */}
      <section className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(42,36,26,0.05)] border border-[#e5e2db]">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#f1eee6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#dde8b2] text-[#485229] flex items-center justify-center">
              <Sun size={15} />
            </div>
            <h3 className="font-bold text-[#1c1c17]">중식</h3>
          </div>
          <span className="text-xs font-semibold text-[#536500] bg-[#f6f3eb] px-2.5 py-1 rounded-md">
            {lunchMeal?.totalCalories || 0} kcal
          </span>
        </div>

        {lunchMeal && lunchMeal.dishes.length > 0 ? (
          <>
            <ul className="space-y-3 mb-5">
              {lunchMeal.dishes.map((dish, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-[#3c5500] mt-1 text-[8px] font-bold">●</span>
                  <span className="text-[#1c1c17] font-medium leading-tight">
                    {dish}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="text-[10px] font-bold text-[#444939] mb-2 uppercase tracking-wide">
                알레르기 정보
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {lunchMeal.allergens.map((allergy, uIdx) => (
                  <span
                    key={uIdx}
                    className="text-[10px] font-semibold bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-xs text-[#444939] text-center py-4">식단 정보가 없습니다.</p>
        )}
      </section>

      {/* Dinner Detail Card */}
      <section className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(42,36,26,0.05)] border border-[#e5e2db] opacity-95">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#f1eee6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d2ea7a] text-[#576a00] flex items-center justify-center">
              <Moon size={15} />
            </div>
            <h3 className="font-bold text-[#1c1c17]">석식</h3>
          </div>
          <span className="text-xs font-semibold text-[#536500] bg-[#f6f3eb] px-2.5 py-1 rounded-md">
            {dinnerMeal?.totalCalories || 0} kcal
          </span>
        </div>

        {dinnerMeal && dinnerMeal.dishes.length > 0 ? (
          <>
            <ul className="space-y-3 mb-5">
              {dinnerMeal.dishes.map((dish, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-[#536500] mt-1 text-[8px] font-bold">●</span>
                  <span className="text-[#1c1c17] font-medium leading-tight">
                    {dish}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="text-[10px] font-bold text-[#444939] mb-2 uppercase tracking-wide">
                알레르기 정보
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dinnerMeal.allergens.map((allergy, uIdx) => (
                  <span
                    key={uIdx}
                    className="text-[10px] font-semibold bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-xs text-[#444939] text-center py-4">식단 정보가 없습니다.</p>
        )}
      </section>
    </div>
  );
}
