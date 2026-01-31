import DisasterCard from "@/components/DisasterCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-slate-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            防災 行動チェック
          </h1>
          <p className="text-gray-600">災害時、今やることがすぐ分かります</p>
        </div>

        {/* 災害別チェックリスト */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            🚨 災害別チェックリスト
          </h2>
          <div className="space-y-4">
            <DisasterCard
              title="地震"
              description="地震発生時の行動チェックリスト"
              href="/earthquake"
              emoji="🏚️"
            />
            <DisasterCard
              title="台風"
              description="台風接近時の行動チェックリスト"
              href="/typhoon"
              emoji="🌀"
            />
            <DisasterCard
              title="大雨"
              description="大雨・洪水警報時の行動チェックリスト"
              href="/flood"
              emoji="🌊"
            />
          </div>
        </div>

        {/* 防災管理ツール */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            📱 防災管理ツール
          </h2>
          <div className="space-y-4">
            <DisasterCard
              title="緊急連絡先"
              description="家族や自治体の連絡先を管理"
              href="/contacts"
              emoji="📞"
            />
            <DisasterCard
              title="備蓄品チェック"
              description="防災用品の在庫と消費期限を管理"
              href="/stocks"
              emoji="📦"
            />
          </div>
        </div>

        {/* フッター */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>いざという時のために、日頃から準備を</p>
        </div>
      </div>
    </div>
  );
}
