"use client";

import { useState } from "react";
import dayjs from "dayjs";

type Trade = {
  pair: string;
  session: "Asia" | "NY";
  resultR: number;
  ruleFollowed: boolean;
};

type DayData = {
  date: string;
  pnl: number;
  trades: number;
  tradeList: Trade[];
};

const mockData: DayData[] = [
  {
    date: "2026-01-09",
    pnl: -67.65,
    trades: 6,
    tradeList: [
      { pair: "Gold", session: "NY", resultR: -1, ruleFollowed: false },
      { pair: "ETH", session: "Asia", resultR: 0.5, ruleFollowed: true },
      { pair: "Gold", session: "NY", resultR: -1, ruleFollowed: false }
    ]
  },
  {
    date: "2026-01-12",
    pnl: 26.04,
    trades: 6,
    tradeList: [
      { pair: "ETH", session: "Asia", resultR: 2, ruleFollowed: true },
      { pair: "ETH", session: "Asia", resultR: 1, ruleFollowed: true }
    ]
  }
];

export default function PnLCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs("2026-01-01"));
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const startOfMonth = currentMonth.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentMonth.daysInMonth();

  const totalPnL = mockData.reduce((a, b) => a + b.pnl, 0).toFixed(2);

  const getDayData = (date: string) =>
    mockData.find(d => d.date === date);

  const getDayStyle = (pnl?: number) => {
    if (pnl === undefined) return "bg-[#111827]";
    if (pnl > 0) return "bg-emerald-900 border-emerald-400";
    if (pnl < 0) return "bg-rose-900 border-rose-400";
    return "bg-slate-800";
  };

  return (
    <div className="bg-[#0B1220] text-white p-6 rounded-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <button onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>←</button>
          <h2 className="text-lg font-semibold">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>→</button>
        </div>

        <div className="text-right text-sm">
          <div>PnL: <span className="text-red-400">${totalPnL}</span></div>
          <div className="text-slate-400">Days: {mockData.length}</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {[...Array(startDay)].map((_, i) => <div key={i} />)}

        {[...Array(daysInMonth)].map((_, i) => {
          const date = startOfMonth.add(i, "day");
          const dateStr = date.format("YYYY-MM-DD");
          const data = getDayData(dateStr);

          return (
            <div
              key={dateStr}
              onClick={() => data && setSelectedDay(data)}
              className={`h-24 rounded-lg border p-2 cursor-pointer ${getDayStyle(data?.pnl)}`}
            >
              <div className="text-xs">{date.date()}</div>
              {data && (
                <div className="text-center mt-4">
                  <div className="text-xs">{data.trades} ⇄</div>
                  <div className={data.pnl > 0 ? "text-green-300" : "text-red-300"}>
                    ${data.pnl}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#0B1220] p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h3>{dayjs(selectedDay.date).format("DD MMM YYYY")}</h3>
              <button onClick={() => setSelectedDay(null)}>✕</button>
            </div>

            {selectedDay.tradeList.map((t, i) => (
              <div key={i} className="flex justify-between bg-slate-800 p-3 rounded mb-2">
                <div>
                  <div>{t.pair}</div>
                  <div className="text-xs text-slate-400">{t.session}</div>
                </div>
                <div className="text-right">
                  <div className={t.resultR > 0 ? "text-green-400" : "text-red-400"}>
                    {t.resultR}R
                  </div>
                  <div className="text-xs">
                    {t.ruleFollowed ? "✅ Rule" : "❌ Rule"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
