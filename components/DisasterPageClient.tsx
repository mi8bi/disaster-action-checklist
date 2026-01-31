"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DisasterData } from "@/types/disaster";
import PhaseTabs from "./PhaseTabs";
import ChecklistItem from "./ChecklistItem";

// 災害ページクライアントのプロパティ定義
type DisasterPageClientProps = {
  disaster: DisasterData; // 表示する災害のデータ
};

/**
 * 災害チェックリスト表示コンポーネント（クライアント側）
 * 指定された災害タイプのチェックリストを表示し、localStorageでユーザーの進捗状況を保存
 */
export default function DisasterPageClient({
  disaster,
}: DisasterPageClientProps) {
  const router = useRouter();
  const [activePhase, setActivePhase] = useState(disaster.phases[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // localStorageからチェック状態を読み込む（マウント時）
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

  // チェック状態をlocalStorageに保存（状態変更時に自動保存）
  useEffect(() => {
    const storageKey = `disaster-checklist-${disaster.type}`;
    localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, disaster.type]);

  /**
   * チェックボックス状態を切り替える
   * @param id チェック対象のアイテムID
   */
  const handleToggle = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 現在アクティブなフェーズの情報を取得
  const currentPhase = disaster.phases.find((p) => p.id === activePhase);

  return (
    <div className="min-h-screen bg-linear-to-b  from-blue-50 to-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* ヘッダーセクション：タイトルと戻るボタン */}
        <div className="mb-6">
          {/* 前ページに戻るボタン */}
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
          {/* 災害タイプのタイトルと説明 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {disaster.title}
          </h1>
          <p className="text-gray-600">{disaster.description}</p>
        </div>

        {/* フェーズタブセクション：事前準備、発生直後など段階を切り替える */}
        <PhaseTabs
          phases={disaster.phases.map((p) => ({ id: p.id, name: p.name }))}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
        />

        {/* チェックリストセクション：各フェーズの実施項目を表示 */}
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

        {/* 完了状況表示：現在のフェーズで完了した項目数 */}
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
      </div>
    </div>
  );
}
