/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meal, Dish } from "../types";
import { formatDateKey, getKoreanDayOfWeek } from "../utils/dateUtils";

/**
 * Generates mock meal data for Monday through Friday of the given week dates.
 * Matches design system specifications and screenshots perfectly.
 */
export function generateMealsForWeek(weekDates: Date[]): Meal[] {
  const meals: Meal[] = [];

  const templates = [
    // 1. Monday (월요일)
    {
      title: "비빔밥과 떡갈비 정식",
      lunchDishes: ["친환경보리밥", "맑은 콩나물국", "전통궁중떡갈비", "오이양파무침", "포기김치"],
      lunchDetailed: [
        { name: "친환경보리밥", calories: 310, carbs: 70, protein: 6, fat: 1, category: "밥류" },
        { name: "맑은 콩나물국", calories: 80, carbs: 4, protein: 3, fat: 5, category: "국/찌개" },
        { name: "전통궁중떡갈비", calories: 240, carbs: 12, protein: 15, fat: 14, category: "반찬" },
        { name: "오이양파무침", calories: 45, carbs: 5, protein: 1, fat: 0, category: "반찬" },
        { name: "포기김치", calories: 15, carbs: 3, protein: 1, fat: 0, category: "반찬" },
      ],
      lunchCals: 690,
      lunchNutrition: { carbs: 94, protein: 26, fat: 20 },
      lunchAllergens: ["난류", "밀", "대두", "쇠고기"],
      
      dinnerTitle: "스팸마요덮밥 정식",
      dinnerDishes: ["스팸마요덮밥", "가쓰오계란국", "소떡소떡꼬치", "깍두기", "요구르트"],
      dinnerCals: 740,
      dinnerNutrition: { carbs: 105, protein: 22, fat: 24 },
      dinnerAllergens: ["난류", "우유", "밀", "대두", "돼지고기"],
    },
    // 2. Tuesday (화요일)
    {
      title: "제육볶음과 순두부찌개 정식",
      lunchDishes: ["친환경기장밥", "얼큰순두부찌개", "제육고추장불고기", "상추쌈 & 쌈장", "배추김치"],
      lunchDetailed: [
        { name: "친환경기장밥", calories: 320, carbs: 72, protein: 6, fat: 1, category: "밥류" },
        { name: "얼큰순두부찌개", calories: 180, carbs: 8, protein: 12, fat: 11, category: "국/찌개" },
        { name: "제육고추장불고기", calories: 260, carbs: 14, protein: 22, fat: 15, category: "반찬" },
        { name: "상추쌈 & 쌈장", calories: 50, carbs: 8, protein: 2, fat: 1, category: "반찬" },
        { name: "배추김치", calories: 20, carbs: 4, protein: 1, fat: 0, category: "반찬" },
      ],
      lunchCals: 830,
      lunchNutrition: { carbs: 106, protein: 43, fat: 28 },
      lunchAllergens: ["대두", "밀", "돼지고기"],
      
      dinnerTitle: "참치김치찌개와 두부구이",
      dinnerDishes: ["친환경현미밥", "참치김치찌개", "들기름두부구이", "간장양념장", "파인애플주스"],
      dinnerCals: 690,
      dinnerNutrition: { carbs: 88, protein: 28, fat: 22 },
      dinnerAllergens: ["대두", "밀", "조개류"],
    },
    // 3. Wednesday (수요일)
    {
      title: "순살간장닭강정과 카레라이스",
      lunchDishes: ["단호박카레라이스", "미니 가쓰오우동", "순살 허니간장닭강정", "단무지피클", "감귤푸딩"],
      lunchDetailed: [
        { name: "단호박카레라이스", calories: 380, carbs: 80, protein: 8, fat: 3, category: "밥류" },
        { name: "미니 가쓰오우동", calories: 150, carbs: 28, protein: 4, fat: 2, category: "국/찌개" },
        { name: "순살 허니간장닭강정", calories: 220, carbs: 15, protein: 18, fat: 10, category: "반찬" },
        { name: "단무지피클", calories: 15, carbs: 3, protein: 0, fat: 0, category: "반찬" },
        { name: "감귤푸딩", calories: 80, carbs: 20, protein: 0, fat: 0, category: "디저트" },
      ],
      lunchCals: 845,
      lunchNutrition: { carbs: 146, protein: 30, fat: 15 },
      lunchAllergens: ["난류", "우유", "밀", "대두", "닭고기"],
      
      dinnerTitle: "짜장덮밥과 군만두",
      dinnerDishes: ["유니짜장밥", "맑은 계란국", "바삭군만두", "짜사이무침", "요구르트"],
      dinnerCals: 720,
      dinnerNutrition: { carbs: 98, protein: 21, fat: 25 },
      dinnerAllergens: ["난류", "밀", "대두", "돼지고기"],
    },
    // 4. Thursday (목요일) - Matches original Cheese Cutlet menu
    {
      title: "치즈돈까스 정식",
      lunchDishes: ["친환경현미밥", "쇠고기미역국", "수제 치즈돈까스 & 특제소스", "양상추샐러드 & 오리엔탈드레싱", "배추김치 (자율)"],
      lunchDetailed: [
        { name: "친환경현미밥", calories: 300, carbs: 65, protein: 6, fat: 1, category: "밥류" },
        { name: "쇠고기미역국", calories: 150, carbs: 4, protein: 10, fat: 8, category: "국/찌개" },
        { name: "수제 치즈돈까스 & 특제소스", calories: 320, carbs: 28, protein: 15, fat: 18, category: "반찬" },
        { name: "양상추샐러드 & 오리엔탈드레싱", calories: 55, carbs: 8, protein: 1, fat: 2, category: "반찬" },
        { name: "배추김치 (자율)", calories: 20, carbs: 3, protein: 1, fat: 0, category: "반찬" },
      ],
      lunchCals: 845,
      lunchNutrition: { carbs: 100, protein: 32, fat: 29 },
      lunchAllergens: ["난류(가금류)", "우유", "대두", "밀", "돼지고기", "쇠고기"],
      
      dinnerTitle: "제육볶음과 순두부찌개 정식",
      dinnerDishes: ["기장밥", "얼큰순두부찌개", "제육고추장불고기", "상추쌈 & 쌈장", "깍두기"],
      dinnerCals: 720,
      dinnerNutrition: { carbs: 96, protein: 30, fat: 25 },
      dinnerAllergens: ["대두", "밀", "돼지고기"],
    },
    // 5. Friday (금요일) - Matches Calendar / Nutrition Screen screenshot
    {
      title: "혼합잡곡밥과 고등어구이 정식",
      lunchDishes: ["혼합잡곡밥", "돈육김치찌개", "고등어카레구이", "두부조림", "깍두기"],
      lunchDetailed: [
        { name: "혼합잡곡밥", calories: 300, carbs: 65, protein: 6, fat: 1, category: "밥류" },
        { name: "돈육김치찌개", calories: 250, carbs: 4, protein: 15, fat: 12, category: "국/찌개" },
        { name: "고등어카레구이", calories: 180, carbs: 0, protein: 20, fat: 10, category: "반찬" },
        { name: "두부조림", calories: 120, carbs: 6, protein: 8, fat: 9, category: "반찬" },
        { name: "깍두기", calories: 15, carbs: 3, protein: 1, fat: 0, category: "반찬" },
      ],
      lunchCals: 850,
      lunchNutrition: { carbs: 78, protein: 50, fat: 32 },
      lunchAllergens: ["우유", "대두", "밀", "돼지고기", "고등어"],
      
      dinnerTitle: "참치마요덮밥 정식",
      dinnerDishes: ["참치마요덮밥", "유부장국", "매콤떡볶이", "김말이튀김", "배추김치"],
      dinnerCals: 720,
      dinnerNutrition: { carbs: 102, protein: 24, fat: 22 },
      dinnerAllergens: ["난류", "우유", "대두", "밀"],
    },
  ];

  weekDates.forEach((date, index) => {
    // Choose template based on 0-4 index
    const template = templates[index] || templates[0];
    const dateKey = formatDateKey(date);
    const dayOfWeek = getKoreanDayOfWeek(date);

    // Lunch (중식)
    const lunchDetailedWithIds: Dish[] = template.lunchDetailed.map((dish, dIdx) => ({
      ...dish,
      category: dish.category as "밥류" | "국/찌개" | "반찬" | "디저트",
      id: `${dateKey}-lunch-${dIdx}`,
    }));

    meals.push({
      id: `${dateKey}-중식`,
      schoolName: "씨마스고등학교",
      date: new Date(date),
      dateKey,
      dayOfWeek,
      mealType: "중식",
      title: template.title,
      dishes: template.lunchDishes,
      detailedDishes: lunchDetailedWithIds,
      totalCalories: template.lunchCals,
      nutrition: template.lunchNutrition,
      allergens: template.lunchAllergens,
    });

    // Dinner (석식)
    meals.push({
      id: `${dateKey}-석식`,
      schoolName: "씨마스고등학교",
      date: new Date(date),
      dateKey,
      dayOfWeek,
      mealType: "석식",
      title: template.dinnerTitle,
      dishes: template.dinnerDishes,
      detailedDishes: [], // Default empty as calculator mainly targets lunch meals
      totalCalories: template.dinnerCals,
      nutrition: template.dinnerNutrition,
      allergens: template.dinnerAllergens,
    });
  });

  return meals;
}
