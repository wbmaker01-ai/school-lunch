/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AlertCircle, ChevronRight, Bell, Headphones, Library, LogOut, Heart } from "lucide-react";

export default function ProfileScreen() {
  const [dailyMealAlerts, setDailyMealAlerts] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto px-5 pt-4 pb-20 flex flex-col gap-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#3c5500] text-white px-5 py-3 rounded-full shadow-lg text-xs font-bold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Profile Card */}
      <section className="bg-gradient-to-br from-[#dde8b2] to-[#4f6f00] p-[2px] rounded-[28px] shadow-[0_4px_20px_rgba(42,36,26,0.05)]">
        <div className="bg-white rounded-[26px] p-6 relative overflow-hidden flex flex-col items-center text-center">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4f6f00] opacity-5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#3c5500] opacity-5 rounded-tr-full"></div>
          
          <div className="relative w-24 h-24 mb-4">
            <img
              alt="Student Profile"
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-sm z-10 relative"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd4JTexWIuNK0NMdo2i1q7rXHj5IBNc85l9bdMxkCXJFOAk0ZSaIj21RcuwYce1R0ugJR7A10hi64Aw9NkT2r4w5OaNxn88fTiJZS5ItuopJ80CIj4jNd3gW5sIF6AYRH2jFuYIL3idoI1FSHjak_vV4QplsOnt1YdcMGj0rCuRLhxEeZFZDb4JctyLkXGSIrvykwlj-VtLPUNmBYsDVSJiazLW3DgVuOE6FSzeK-lqWQ7I3v8jmW0BVEAEcP1nweXngucwKsUrA"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <h2 className="text-lg font-bold text-[#1c1c17] mb-1">김학생</h2>
          <p className="text-xs text-[#444939] bg-[#f1eee6] px-3.5 py-1 rounded-full font-semibold">
            2학년 3반 15번
          </p>
        </div>
      </section>

      {/* Settings List */}
      <section className="flex flex-col gap-3.5">
        {/* Allergy Danger Card */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(42,36,26,0.03)] border border-[#e5e2db]/55 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#ffdad6] text-[#ba1a1a] w-10 h-10 rounded-full flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1c1c17]">알레르기 정보</h3>
                <p className="text-[10px] text-[#444939]">급식 메뉴에 포함 시 경고 알림</p>
              </div>
            </div>
            <button
              onClick={() => triggerToast("알레르기 정보 수정 모드 기능 준비 중입니다.")}
              className="text-[#3c5500] hover:bg-[#f1eee6] p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="flex gap-2 pl-12">
            <span className="bg-[#f1eee6] text-[#444939] px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-[#c4c9b4]/20">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span> 우유
            </span>
            <span className="bg-[#f1eee6] text-[#444939] px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-[#c4c9b4]/20">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span> 땅콩
            </span>
          </div>
        </div>

        {/* Regular Settings Toggles / Links */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(42,36,26,0.03)] border border-[#e5e2db]/50 overflow-hidden divide-y divide-[#f1eee6]">
          {/* Notifications Toggle */}
          <div className="p-4 flex items-center justify-between hover:bg-[#f6f3eb]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-[#d2ea7a] text-[#576a00] w-10 h-10 rounded-full flex items-center justify-center">
                <Bell size={18} />
              </div>
              <h3 className="text-xs font-bold text-[#1c1c17]">일일 식단 알림</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dailyMealAlerts}
                onChange={(e) => {
                  setDailyMealAlerts(e.target.checked);
                  triggerToast(
                    e.target.checked
                      ? "매일 급식 리포트 알림을 받아봅니다."
                      : "급식 알림이 수신 거부 설정되었습니다."
                  );
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#e5e2db] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4f6f00]"></div>
            </label>
          </div>

          {/* Customer Service */}
          <button
            onClick={() => triggerToast("고객센터 채팅 상담으로 연결합니다.")}
            className="w-full p-4 flex items-center justify-between hover:bg-[#f6f3eb]/40 transition-colors text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#f1eee6] text-[#444939] w-10 h-10 rounded-full flex items-center justify-center">
                <Headphones size={18} />
              </div>
              <h3 className="text-xs font-bold text-[#1c1c17]">고객센터</h3>
            </div>
            <ChevronRight size={18} className="text-[#747967]" />
          </button>

          {/* Terms */}
          <button
            onClick={() => triggerToast("이용약관 내용을 노출합니다.")}
            className="w-full p-4 flex items-center justify-between hover:bg-[#f6f3eb]/40 transition-colors text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#f1eee6] text-[#444939] w-10 h-10 rounded-full flex items-center justify-center">
                <Library size={18} />
              </div>
              <h3 className="text-xs font-bold text-[#1c1c17]">이용약관</h3>
            </div>
            <ChevronRight size={18} className="text-[#747967]" />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={() => triggerToast("김학생 군의 계정에서 안전하게 로그아웃 되었습니다.")}
          className="w-full bg-white text-[#ba1a1a] rounded-2xl p-4 flex items-center justify-center gap-2 font-bold text-xs hover:bg-[#ffdad6]/25 transition-colors shadow-[0_2px_10px_rgba(42,36,26,0.03)] border border-[#ffdad6] mt-2 cursor-pointer"
        >
          <LogOut size={16} />
          <span>로그아웃</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-8 mb-4 text-center px-4 flex flex-col items-center">
        <p className="text-[10px] font-bold text-[#747967]">© 2026 씨마스고등학교 급식</p>
        <p className="text-[10px] font-medium text-[#747967] mt-1">
          건강하고 맛있는 학교 식단을 지원합니다.
        </p>
        <div className="mt-4 flex justify-center opacity-50 text-[#3c5500]">
          <Heart size={24} fill="#3c5500" />
        </div>
      </footer>
    </div>
  );
}
