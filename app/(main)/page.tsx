import DisasterCard from "@/components/DisasterCard";

/**
 * ホームページコンポーネント
 * 災害チェックリストアプリのランディングページ
 * 地震、台風、大雨などの災害タイプを選択できるカード一覧を表示
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* ページタイトルセクション */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            防災 行動チェック
          </h1>
          <p className="text-gray-600">災害時、今やることがすぐ分かります</p>
        </div>

        {/* 災害タイプ選択カード一覧 */}
        <div className="space-y-4">
          {/* 地震チェックリストへのナビゲーション */}
          <DisasterCard
            title="地震"
            description="地震発生時の行動チェックリスト"
            href="/earthquake"
            emoji="🏚️"
          />
          {/* 台風チェックリストへのナビゲーション */}
          <DisasterCard
            title="台風"
            description="台風接近時の行動チェックリスト"
            href="/typhoon"
            emoji="🌀"
          />
          {/* 大雨・洪水チェックリストへのナビゲーション */}
          <DisasterCard
            title="大雨"
            description="大雨・洪水警報時の行動チェックリスト"
            href="/flood"
            emoji="🌊"
          />
        </div>
      </div>
    </div>
  );
}
