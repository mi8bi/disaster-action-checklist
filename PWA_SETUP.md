# PWA対応ガイド

このプロジェクトは Progressive Web App (PWA) として対応されています。

## PWAの機能

### 1. ホーム画面へのインストール
- モバイルデバイスでホーム画面に追加でき、ネイティブアプリのように使用可能
- Web App Manifest (`app/manifest.ts`) で設定

### 2. オフライン対応
- Service Worker (`public/sw.js`) がネットワークがない場合もコンテンツを提供
- キャッシュからコンテンツを読み込み

### 3. プッシュ通知
- Web Push APIを使用した通知機能（optional）
- VAPID キーが必要

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. HTTPS でのローカル開発
PWA機能をテストするにはHTTPS環境が必要です：

```bash
next dev --experimental-https
```

### 3. プッシュ通知を使用する場合（オプション）

#### VAPID キーの生成
```bash
npx web-push generate-vapid-keys
```

出力されたキーを `.env.local` に設定します：
```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

#### Server Actions の作成
プッシュ通知機能を追加する場合は、`app/actions.ts` を作成してください：

```typescript
'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

let subscription: PushSubscription | null = null

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
  
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: '防災チェック',
        body: message,
        icon: '/icon-192x192.png',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
```

## アイコンについて

PWA対応には以下のアイコンが必要です：

- `public/icon-192x192.png` - 標準アイコン（192x192）
- `public/icon-512x512.png` - 標準アイコン（512x512）
- `public/icon-maskable-192x192.png` - マスク可能アイコン（192x192）
- `public/icon-maskable-512x512.png` - マスク可能アイコン（512x512）
- `public/badge-72x72.png` - バッジアイコン（72x72）

無料で生成できるツール：
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Icon Generator](https://www.pwa-icon-generator.com/)

## テスト方法

### ローカルでのテスト

1. HTTPS でサーバーを起動：
```bash
next dev --experimental-https
```

2. ブラウザで `https://localhost:3000` にアクセス

3. Chrome DevTools を開く（F12）
4. Application タブ → Service Workers でService Workerの状態を確認
5. Manifest タブでマニフェスト情報を確認

### インストール可能性のチェック

- Chrome/Edge: Application → Install ボタンが表示されることを確認
- iOS: Safari → 共有 → ホーム画面に追加

## セキュリティ設定

`next.config.ts` で以下のセキュリティヘッダーが設定されています：

1. **グローバルヘッダー**
   - `X-Content-Type-Options: nosniff` - MIME タイプ嗅ぎ聞きを防止
   - `X-Frame-Options: DENY` - クリックジャッキング攻撃を防止
   - `Referrer-Policy: strict-origin-when-cross-origin` - リファラー情報を制御

2. **Service Worker ヘッダー**
   - `Cache-Control: no-cache, no-store, must-revalidate` - キャッシュを防止
   - `Content-Security-Policy: default-src 'self'; script-src 'self'` - スクリプト実行を制限

## トラブルシューティング

### Service Worker が登録されない
- HTTPS 環境を使用しているか確認
- ブラウザのコンソールにエラーがないか確認
- Service Worker ファイル (`public/sw.js`) が存在するか確認

### キャッシュが更新されない
- ブラウザキャッシュをクリア
- DevTools の Application → Storage → Clear site data を使用
- Service Worker を登録解除

### プッシュ通知が送信されない
- VAPID キーが正しく設定されているか確認
- ブラウザの通知権限が有効か確認
- コンソールにエラーがないか確認

## 参考資料

- [Next.js PWA ガイド](https://nextjs.org/docs/app/guides/progressive-web-apps)
- [Web App Manifest](https://developer.mozilla.org/ja/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)
- [Web Push API](https://developer.mozilla.org/ja/docs/Web/API/Push_API)

## デプロイ時の考慮事項

1. **HTTPS が必須** - PWA は HTTPS でのみ動作
2. **アイコンの最適化** - 各デバイスに最適な解像度を提供
3. **マニフェストの検証** - `manifest.json` が正しく解析されるか確認
4. **Service Worker の更新戦略** - ユーザーに更新を通知する仕組みの検討

詳細は本家の [Next.js PWA ドキュメント](https://nextjs.org/docs/app/guides/progressive-web-apps) を参照してください。
