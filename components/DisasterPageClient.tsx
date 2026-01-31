"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DisasterData } from "@/types/disaster";
import { TimelineEvent } from "@/types/timeline";
import PhaseTabs from "./PhaseTabs";
import ChecklistItem from "./ChecklistItem";

type DisasterPageClientProps = {
  disaster: DisasterData;
};

export default function DisasterPageClient({
  disaster,
}: DisasterPageClientProps) {
  const router = useRouter();
  const [activePhase, setActivePhase] = useState(disaster.phases[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showTimeline, setShowTimeline] = useState(false);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const storageKey = `disaster-checklist-${disaster.type}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data:", e);
      }
    }
  }, [disaster.type]);

  useEffect(() => {
    const timelineKey = `disaster-timeline-${disaster.type}`;
    const saved = localStorage.getItem(timelineKey);
    if (saved) {
      try {
        setTimeline(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse timeline:", e);
      }
    }
  }, [disaster.type]);

  useEffect(() => {
    const storageKey = `disaster-checklist-${disaster.type}`;
    localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, disaster.type]);

  useEffect(() => {
    const timelineKey = `disaster-timeline-${disaster.type}`;
    localStorage.setItem(timelineKey, JSON.stringify(timeline));
  }, [timeline, disaster.type]);

  const handleToggle = (id: string) => {
    const currentPhase = disaster.phases.find((p) => p.id === activePhase);
    const item = currentPhase?.items.find((i) => i.id === id);

    const newCheckedState = !checkedItems[id];

    setCheckedItems((prev) => ({
      ...prev,
      [id]: newCheckedState,
    }));

    if (item && currentPhase) {
      const event: TimelineEvent = {
        id: `event-${Date.now()}`,
        timestamp: new Date().toISOString(),
        disasterType: disaster.type,
        phaseId: currentPhase.id,
        phaseName: currentPhase.name,
        itemId: id,
        itemText: item.text,
        action: newCheckedState ? "checked" : "unchecked",
      };

      setTimeline((prev) => [event, ...prev]);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const currentPhase = disaster.phases.find((p) => p.id === activePhase);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">戻る</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {disaster.title}
          </h1>
          <p className="text-gray-600">{disaster.description}</p>
        </div>

        {/* タイムライン表示切替ボタン */}
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {showTimeline ? "チェックリストに戻る" : "行動履歴を見る"}
          {timeline.length > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {timeline.length}
            </span>
          )}
        </button>

        {showTimeline ? (
          // タイムライン表示
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📋 行動履歴
            </h2>
            {timeline.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                まだ行動履歴がありません
              </div>
            ) : (
              timeline.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${
                        event.action === "checked"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.action === "checked" ? "✓" : "○"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">
                        {formatTimestamp(event.timestamp)} · {event.phaseName}
                      </p>
                      <p className="text-gray-900">{event.itemText}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {event.action === "checked" ? "完了" : "未完了に変更"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // チェックリスト表示
          <>
            <PhaseTabs
              phases={disaster.phases.map((p) => ({ id: p.id, name: p.name }))}
              activePhase={activePhase}
              onPhaseChange={setActivePhase}
            />

            <div className="space-y-3">
              {currentPhase?.items.map((item) => (
                <ChecklistItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  checked={!!checkedItems[item.id]}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            {currentPhase && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                  完了:{" "}
                  {
                    currentPhase.items.filter((item) => checkedItems[item.id])
                      .length
                  }{" "}
                  / {currentPhase.items.length}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
