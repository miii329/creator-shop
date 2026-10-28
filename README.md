# つくりて / Creator Shop

Next.js App Router + TypeScript + Neon PostgreSQL / Drizzle + Better Auth + Cloudflare R2 + Stripe Connect。
元の試作は index.html に保存。Next.js は src/ 以下です。

## 起動

```sh
npm install
npm run dev
```

http://localhost:3000 で表示。DATABASE_URL が未設定の場合はサンプル作品を表示し、購入を無効化します。

## 接続

1. `.env.example` を `.env` にコピー。秘密鍵はコミットしない。
2. Neon の接続文字列を DATABASE_URL に設定。
3. BETTER_AUTH_SECRET を `openssl rand -base64 32` で生成。BETTER_AUTH_URL をアプリのURLに設定。
4. `npm run db:migrate` でテーブル作成。
5. R2バケット、バケット限定のアクセスキー、公開用カスタムドメインを設定。R2_PUBLIC_URL は末尾スラッシュなし。アップロードはサーバー経由のためブラウザ向けCORS不要。
6. Stripeテストキーを設定してConnectを有効化。ログイン後 /sell からExpressアカウントのオンボーディング。
7. Stripe CLIで `stripe listen --forward-to localhost:3000/api/webhooks/stripe` を起動し、表示された署名シークレットを設定。checkout.session.completed と checkout.session.async_payment_succeeded を購読。
8. アカウントを2つ作り、出品者と購入者で画像アップロード→出品→Checkout→Webhook→注文履歴をテスト。

## 現在の範囲

- 商品一覧・検索・詳細、メール/パスワード認証、出品、R2画像保存、Connect受取設定、1商品単位のCheckout、署名検証Webhook、購入者限定の注文履歴。
- 価格と送金先はサーバーのDBから取得。配送先はStripeで収集。送料込み価格として出品する想定。
- 手数料は仮で10%（PLATFORM_FEE_BPS）。取引条件確定時に変更する。
- 有限在庫の予約、複数出品者の一括カート、返金・配送管理、メール認証/パスワード再設定、管理画面、アップロードの孤立画像清掃は未実装。本番販売前に追加する。
- Stripe決済後の反映はWebhookで行い、success URLへの遷移だけでは注文を確定しない。
- Stripe Webhookはpendingからpaidへの条件付き更新で再配信に対応。Checkoutセッション作成には注文IDの冪等性キーを利用。
- 外部サービスのキー未設定では実接続テストできない。Next.jsのホスティングはNode対応環境を想定。Cloudflare R2の利用とNext.js自体のCloudflare Workers配置は別設定。

## チェック

```sh
npm run typecheck
npm run build
```

## 公式資料
- https://better-auth.com/docs/installation
- https://neon.com/docs/guides/drizzle
- https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/
- https://docs.stripe.com/connect/destination-charges

## 検証メモ

Next.js 16.4.3 の本番ビルド（TypeScriptチェック含む）とマイグレーション生成に成功。サービス接続前のため、認証・Neon・R2・Stripe実接続は未検証。npm auditにはDrizzle Kitの開発用依存に由来するmoderate 4件が残る。強制ダウングレードはしていない。

このMacでTurbopackのFSEvent監視が失敗する場合は `WATCHPACK_POLLING=true BETTER_AUTH_URL=http://localhost:3001 npm run dev -- --webpack --port 3001` で起動できます。今回のプレビューは3000番ポートが使用中のため3001番を使用しています。
