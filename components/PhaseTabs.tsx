// フェーズタブのプロパティ定義
type PhaseTabsProps = {
  phases: { id: string; name: string }[]; // 表示するフェーズのリスト
  activePhase: string; // 現在アクティブなフェーズのID
  onPhaseChange: (phaseId: string) => void; // フェーズ変更時のコールバック
};

/**
 * フェーズタブコンポーネント
 * 災害の各段階（事前準備、発生直後、復旧など）を切り替えるタブUI
 */
const PhaseTabs = ({ phases, activePhase, onPhaseChange }: PhaseTabsProps) => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {/* 各フェーズのタブボタンを生成 */}
      {phases.map((phase) => (
        <button
          key={phase.id}
          onClick={() => onPhaseChange(phase.id)}
          // アクティブなフェーズは青色ハイライト、非アクティブはグレー
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activePhase === phase.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {phase.name}
        </button>
      ))}
    </div>
  );
};

export default PhaseTabs;
