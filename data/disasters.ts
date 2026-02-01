import { DisasterData } from "@/types/disaster";

export const disasterData: Record<string, DisasterData> = {
  earthquake: {
    type: "earthquake",
    title: "地震",
    description: "地震発生時の行動チェックリスト",
    phases: [
      {
        id: "normal",
        name: "平常時",
        items: [
          { id: "eq-normal-1", text: "非常用持ち出し袋を準備する" },
          { id: "eq-normal-2", text: "家具の転倒防止を確認する" },
          { id: "eq-normal-3", text: "避難場所を確認する" },
        ],
      },
      {
        id: "immediate",
        name: "地震直後",
        items: [
          { id: "eq-immediate-1", text: "身の安全を確保する" },
          { id: "eq-immediate-2", text: "火の元を確認する" },
          { id: "eq-immediate-3", text: "正しい情報を確認する" },
        ],
      },
      {
        id: "evacuation",
        name: "避難時",
        items: [
          { id: "eq-evacuation-1", text: "非常用持ち出し袋を持つ" },
          { id: "eq-evacuation-2", text: "ブレーカーを落とす" },
          { id: "eq-evacuation-3", text: "避難場所へ移動する" },
        ],
      },
    ],
  },
  typhoon: {
    type: "typhoon",
    title: "台風",
    description: "台風接近時の行動チェックリスト",
    phases: [
      {
        id: "normal",
        name: "平常時",
        items: [
          { id: "ty-normal-1", text: "ベランダの物を片付ける" },
          { id: "ty-normal-2", text: "雨戸・窓を確認する" },
        ],
      },
      {
        id: "approaching",
        name: "接近時",
        items: [
          { id: "ty-approaching-1", text: "外出を控える" },
          { id: "ty-approaching-2", text: "最新の気象情報を確認する" },
        ],
      },
      {
        id: "evacuation",
        name: "避難時",
        items: [
          { id: "ty-evacuation-1", text: "指示に従って避難する" },
          { id: "ty-evacuation-2", text: "危険な場所に近づかない" },
        ],
      },
    ],
  },
  flood: {
    type: "flood",
    title: "大雨",
    description: "大雨・洪水警報時の行動チェックリスト",
    phases: [
      {
        id: "normal",
        name: "平常時",
        items: [
          { id: "fl-normal-1", text: "ハザードマップを確認する" },
          { id: "fl-normal-2", text: "側溝の詰まりを確認する" },
        ],
      },
      {
        id: "warning",
        name: "警報時",
        items: [
          { id: "fl-warning-1", text: "川や用水路に近づかない" },
          { id: "fl-warning-2", text: "避難情報を確認する" },
        ],
      },
      {
        id: "evacuation",
        name: "避難時",
        items: [
          { id: "fl-evacuation-1", text: "安全な場所へ移動する" },
          { id: "fl-evacuation-2", text: "夜間は無理に移動しない" },
        ],
      },
    ],
  },
};
