// チェックリストアイテムのプロパティ定義
type ChecklistItemProps = {
  id: string; // アイテムの一意識別子
  text: string; // 表示するチェック項目のテキスト
  checked: boolean; // チェック状態
  onToggle: (id: string) => void; // チェック状態変更時のコールバック
};

/**
 * チェックリストアイテムコンポーネント
 * 個別のチェック項目を表示し、ユーザーのチェック・アンチェック操作を処理
 */
const ChecklistItem = ({ id, text, checked, onToggle }: ChecklistItemProps) => {
  return (
    <label className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
      {/* チェックボックス入力 */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      {/* チェック項目のテキスト（チェック済みなら打消し線を表示） */}
      <span
        className={`flex-1 text-gray-900 ${checked ? "line-through opacity-60" : ""}`}
      >
        {text}
      </span>
    </label>
  );
};

export default ChecklistItem;
