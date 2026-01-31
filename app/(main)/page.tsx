import Card from "@/components/Card/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900">防災 行動チェック</h1>
        <p className="text-gray-600 mt-2 mb-6">
          災害時、今やることがすぐ分かります
        </p>
        <Card />
      </div>
    </div>
  );
}
