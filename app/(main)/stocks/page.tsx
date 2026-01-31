"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StockItem } from "@/types/stock";

const categories = [
  { id: "food", name: "食料", icon: "🍞" },
  { id: "water", name: "飲料水", icon: "💧" },
  { id: "medicine", name: "医薬品", icon: "💊" },
  { id: "tool", name: "道具", icon: "🔦" },
  { id: "other", name: "その他", icon: "📦" },
];

export default function StocksPage() {
  const router = useRouter();
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "food" as StockItem["category"],
    quantity: 1,
    unit: "個",
    expiryDate: "",
  });

  // localStorageから備蓄品を読み込み
  useEffect(() => {
    const saved = localStorage.getItem("disaster-stocks");
    if (saved) {
      try {
        setStocks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stocks:", e);
      }
    } else {
      // デフォルトの備蓄品
      const defaultStocks: StockItem[] = [
        {
          id: "default-1",
          name: "水（2L）",
          category: "water",
          quantity: 6,
          unit: "本",
          expiryDate: "2025-12-31",
        },
        {
          id: "default-2",
          name: "非常食（アルファ米）",
          category: "food",
          quantity: 9,
          unit: "食",
          expiryDate: "2026-06-30",
        },
        {
          id: "default-3",
          name: "懐中電灯",
          category: "tool",
          quantity: 2,
          unit: "個",
        },
      ];
      setStocks(defaultStocks);
    }
  }, []);

  // localStorageに保存
  useEffect(() => {
    if (stocks.length > 0) {
      localStorage.setItem("disaster-stocks", JSON.stringify(stocks));
    }
  }, [stocks]);

  const handleAdd = () => {
    if (!formData.name) {
      alert("品名は必須です");
      return;
    }

    const newStock: StockItem = {
      id: `stock-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      quantity: formData.quantity,
      unit: formData.unit,
      expiryDate: formData.expiryDate || undefined,
      lastChecked: new Date().toISOString().split("T")[0],
    };

    setStocks([...stocks, newStock]);
    resetForm();
  };

  const handleEdit = (id: string) => {
    const stock = stocks.find((s) => s.id === id);
    if (stock) {
      setFormData({
        name: stock.name,
        category: stock.category,
        quantity: stock.quantity,
        unit: stock.unit,
        expiryDate: stock.expiryDate || "",
      });
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.name) {
      alert("品名は必須です");
      return;
    }

    setStocks(
      stocks.map((s) =>
        s.id === editingId
          ? {
              ...s,
              name: formData.name,
              category: formData.category,
              quantity: formData.quantity,
              unit: formData.unit,
              expiryDate: formData.expiryDate || undefined,
              lastChecked: new Date().toISOString().split("T")[0],
            }
          : s,
      ),
    );
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("この備蓄品を削除しますか？")) {
      setStocks(stocks.filter((s) => s.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "food",
      quantity: 1,
      unit: "個",
      expiryDate: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry =
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return daysUntilExpiry < 90 && daysUntilExpiry > 0; // 3ヶ月以内
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const filteredStocks =
    selectedCategory === "all"
      ? stocks
      : stocks.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* ヘッダー */}
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
            📦 備蓄品チェック
          </h1>
          <p className="text-gray-600">
            防災用の備蓄品を管理し、消費期限をチェックしましょう
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* 追加ボタン */}
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full mb-6 p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + 備蓄品を追加
          </button>
        )}

        {/* 追加・編集フォーム */}
        {isAdding && (
          <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "備蓄品を編集" : "新しい備蓄品"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  品名 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例: 水（2L）"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリ
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as StockItem["category"],
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    数量
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    単位
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="個、本、箱"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  消費期限
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="flex-1 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  {editingId ? "更新" : "追加"}
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 備蓄品リスト */}
        <div className="space-y-3">
          {filteredStocks.map((stock) => {
            const expiringSoon = isExpiringSoon(stock.expiryDate);
            const expired = isExpired(stock.expiryDate);
            const categoryInfo = categories.find(
              (c) => c.id === stock.category,
            );

            return (
              <div
                key={stock.id}
                className={`p-4 bg-white rounded-lg border ${
                  expired
                    ? "border-red-300 bg-red-50"
                    : expiringSoon
                      ? "border-yellow-300 bg-yellow-50"
                      : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categoryInfo?.icon}</span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {stock.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {stock.quantity} {stock.unit}
                    </p>
                    {stock.expiryDate && (
                      <p
                        className={`text-sm mt-1 ${
                          expired
                            ? "text-red-600 font-bold"
                            : expiringSoon
                              ? "text-yellow-700 font-semibold"
                              : "text-gray-500"
                        }`}
                      >
                        {expired ? "⚠️ 期限切れ" : "期限"}: {stock.expiryDate}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(stock.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(stock.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStocks.length === 0 && !isAdding && (
          <div className="text-center py-12 text-gray-500">
            {selectedCategory === "all"
              ? "備蓄品がまだ登録されていません"
              : "このカテゴリの備蓄品はありません"}
          </div>
        )}

        {/* 統計情報 */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">備蓄状況</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {stocks.length}
              </p>
              <p className="text-xs text-gray-600">登録品目</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {stocks.filter((s) => isExpiringSoon(s.expiryDate)).length}
              </p>
              <p className="text-xs text-gray-600">期限間近</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {stocks.filter((s) => isExpired(s.expiryDate)).length}
              </p>
              <p className="text-xs text-gray-600">期限切れ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
