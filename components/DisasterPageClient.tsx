"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DisasterData } from "@/types/disaster";
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
    const storageKey = `disaster-checklist-${disaster.type}`;
    localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, disaster.type]);

  const handleToggle = (id: string) => {
    const newCheckedState = !checkedItems[id];

    setCheckedItems((prev) => ({
      ...prev,
      [id]: newCheckedState,
    }));
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
      </div>
    </div>
  );
}
