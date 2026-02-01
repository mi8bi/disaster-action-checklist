"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/types/contact";

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
  });

  // localStorageから連絡先を読み込み
  useEffect(() => {
    const saved = localStorage.getItem("emergency-contacts");
    if (saved) {
      try {
        setContacts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse contacts:", e);
      }
    } else {
      // デフォルトの連絡先
      const defaultContacts: Contact[] = [
        {
          id: "default-1",
          name: "警察",
          relationship: "緊急通報",
          phone: "110",
          priority: 1,
        },
        {
          id: "default-2",
          name: "消防・救急",
          relationship: "緊急通報",
          phone: "119",
          priority: 2,
        },
      ];
      setContacts(defaultContacts);
    }
  }, []);

  // localStorageに保存
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("emergency-contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAdd = () => {
    if (!formData.name || !formData.phone) {
      alert("名前と電話番号は必須です");
      return;
    }

    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      name: formData.name,
      relationship: formData.relationship,
      phone: formData.phone,
      email: formData.email,
      priority: contacts.length + 1,
    };

    setContacts([...contacts, newContact]);
    setFormData({ name: "", relationship: "", phone: "", email: "" });
    setIsAdding(false);
  };

  const handleEdit = (id: string) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      setFormData({
        name: contact.name,
        relationship: contact.relationship,
        phone: contact.phone,
        email: contact.email || "",
      });
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.phone) {
      alert("名前と電話番号は必須です");
      return;
    }

    setContacts(
      contacts.map((c) =>
        c.id === editingId
          ? {
              ...c,
              name: formData.name,
              relationship: formData.relationship,
              phone: formData.phone,
              email: formData.email,
            }
          : c,
      ),
    );
    setFormData({ name: "", relationship: "", phone: "", email: "" });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("この連絡先を削除しますか？")) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

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
            📞 緊急連絡先
          </h1>
          <p className="text-gray-600">
            災害時にすぐ連絡できる連絡先を登録しましょう
          </p>
        </div>

        {/* 追加ボタン */}
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full mb-6 p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + 連絡先を追加
          </button>
        )}

        {/* 追加・編集フォーム */}
        {isAdding && (
          <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "連絡先を編集" : "新しい連絡先"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  名前 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="山田太郎"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  続柄・関係
                </label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) =>
                    setFormData({ ...formData, relationship: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="例: 父、区役所、職場"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話番号 *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="090-1234-5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@email.com"
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
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      relationship: "",
                      phone: "",
                      email: "",
                    });
                  }}
                  className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 連絡先リスト */}
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {contact.name}
                  </h3>
                  {contact.relationship && (
                    <p className="text-sm text-gray-600">
                      {contact.relationship}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(contact.id)}
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
                    onClick={() => handleDelete(contact.id)}
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
              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(contact.phone)}
                  className="flex-1 p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {contact.phone}
                </button>
                {contact.email && (
                  <button
                    onClick={() => handleEmail(contact.email!)}
                    className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && !isAdding && (
          <div className="text-center py-12 text-gray-500">
            連絡先がまだ登録されていません
          </div>
        )}
      </div>
    </div>
  );
}
