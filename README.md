# 防災 行動チェック

災害発生時に「今やるべき行動」を即座に確認できる行動チェックリストアプリケーションです。

## 概要

このアプリケーションは、一般市民が災害時に迷わず行動できるよう、災害の種類とフェーズごとに整理されたチェックリストを提供します。

## 対応災害

- **地震**: 平常時 / 発災直後 / 避難時
- **台風**: 平常時 / 接近時 / 避難時
- **大雨**: 平常時 / 警報時 / 避難時

## 主な機能

- 災害種別の選択
- フェーズごとの行動チェックリスト
- チェック状態のローカル保存
- レスポンシブデザイン（スマートフォン対応）

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Storage**: localStorage
- **Progressive Web App (PWA)**: Service Worker対応でオフライン対応

## PWA対応

このアプリケーションはProgressive Web App (PWA)として構成されています：

- ✅ **ホーム画面へのインストール** - モバイルデバイスにネイティブアプリのようにインストール可能
- ✅ **オフライン対応** - インターネット接続がない場合も基本機能が利用可能
- ✅ **Service Worker** - バックグラウンドでのキャッシング機能
- ✅ **Web App Manifest** - デバイス上での表示設定
- ✅ **セキュリティヘッダー** - XSS、クリックジャッキング等の攻撃対策

詳細は[PWA_SETUP.md](./PWA_SETUP.md)を参照してください。

## セットアップ

## セットアップ

### 必要な環境

- Node.js 20以上

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

### ビルド

```bash
npm run build
npm start
```

## プロジェクト構成

```
disaster-action-checklist/
├── app/                      # Next.js App Router
│   ├── earthquake/          # 地震ページ
│   ├── typhoon/             # 台風ページ
│   ├── flood/               # 大雨ページ
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # トップページ
│   └── globals.css          # グローバルスタイル
├── components/              # Reactコンポーネント
│   ├── DisasterCard.tsx     # 災害選択カード
│   ├── PhaseTabs.tsx        # フェーズタブ
│   ├── ChecklistItem.tsx    # チェックリストアイテム
│   └── DisasterPageClient.tsx # 災害詳細ページクライアント
├── data/                    # データ定義
│   └── disasters.ts         # 災害データ
├── types/                   # 型定義
│   └── disaster.ts          # 災害関連の型
└── package.json
```

## 使い方

1. トップページで災害種別（地震/台風/大雨）を選択
2. フェーズタブで現在の状況に合わせたフェーズを選択
3. 行動チェックリストの各項目を確認し、完了したらチェック
4. チェック状態は自動的に保存され、次回アクセス時も保持されます

## 今後の拡張案

- PWA対応による完全オフライン化
- 文字サイズ調整機能
- 自治体情報へのリンク追加
- 多言語対応

## ライセンス

このプロジェクトは教育目的で作成されています。
