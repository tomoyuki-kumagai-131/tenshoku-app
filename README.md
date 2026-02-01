# TenShoku - 転職マッチングサービス

IT・Web業界に特化した転職マッチングサービスのプロトタイプです。

<img width="1494" height="824" alt="スクリーンショット 2026-02-01 9 18 40" src="https://github.com/user-attachments/assets/0c2d2fde-3389-40d5-838d-7bfd7184d160" />

## デプロイ

**本番環境**: https://tenshoku-app-web.vercel.app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tomoyuki-kumagai-131/tenshoku-app)

## デモ

| ページ | 説明 |
|--------|------|
| `/` | ランディングページ |
| `/login` | ログイン画面 |
| `/jobs` | 求人一覧 |
| `/jobs/[id]` | 求人詳細 |
| `/apply?jobId=[id]` | 応募フォーム |
| `/mypage` | マイページ（プロフィール・お気に入り） |
| `/about` | サービス紹介 |

## 技術スタック

### フロントエンド
- **Next.js 14** - React フレームワーク（App Router）
- **Tailwind CSS** - ユーティリティファーストCSS
- **TypeScript** - 型安全な開発

### バックエンド
- **Hono** - 軽量・高速なWebフレームワーク
- **TypeScript** - 型安全な開発

### インフラ・ツール
- **Turborepo** - モノレポ管理
- **pnpm** - パッケージマネージャー

## プロジェクト構成

```
tenshoku-app/
├── apps/
│   ├── web/                 # Next.js フロントエンド
│   │   ├── src/
│   │   │   ├── app/         # ページコンポーネント
│   │   │   ├── components/  # UIコンポーネント
│   │   │   ├── lib/         # ユーティリティ・API
│   │   │   └── hooks/       # カスタムフック
│   │   └── ...
│   └── api/                 # Hono バックエンド
│       └── src/
│           ├── routes/      # APIルート
│           └── mock/        # モックデータ
├── packages/
│   └── types/               # 共有型定義
├── turbo.json               # Turborepo設定
└── pnpm-workspace.yaml      # ワークスペース設定
```

## セットアップ

### 必要条件

- Node.js 18以上
- pnpm 8以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/tomoyuki-kumagai-131/tenshoku-app.git
cd tenshoku-app

# 依存関係をインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 全アプリケーションを起動
pnpm dev
```

以下のサーバーが起動します：
- **フロントエンド**: http://localhost:3000
- **API**: http://localhost:4000

### 個別に起動する場合

```bash
# フロントエンドのみ
pnpm dev --filter web

# APIのみ
pnpm dev --filter api
```

## 主な機能

### 求人検索・閲覧
- キーワード検索
- 地域・スキルでフィルタリング
- 無限スクロール対応

### 応募機能
- ステップ形式の応募フォーム
- プロフィール自動入力
- 応募完了画面

### お気に入り
- 求人をお気に入り登録
- マイページで一覧表示

### マイページ
- プロフィール編集
- お気に入り管理
- アクティビティ履歴

## テストアカウント

```
メールアドレス: test@example.com
パスワード: password
```

## スクリプト

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm type-check

# リント
pnpm lint
```

## ライセンス

MIT
