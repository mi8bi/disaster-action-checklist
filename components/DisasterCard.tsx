import Link from "next/link";

// 災害カードのプロパティ定義
type DisasterCardProps = {
  title: string; // 災害の種類（地震、台風、大雨など）
  description: string; // 災害説明テキスト
  href: string; // 遷移先URL
  emoji: string; // 表示する絵文字
};

/**
 * 災害カードコンポーネント
 * ホーム画面に表示される各災害タイプへのナビゲーションカード
 */
const DisasterCard = ({
  title,
  description,
  href,
  emoji,
}: DisasterCardProps) => {
  return (
    <Link href={href}>
      {/* カードコンテナ（ホバーエフェクト付き） */}
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 mb-4 cursor-pointer border border-gray-100">
        <div className="flex items-center gap-4">
          {/* 災害タイプを示す絵文字 */}
          <span className="text-5xl">{emoji}</span>
          {/* カード情報：タイトルと説明 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DisasterCard;
