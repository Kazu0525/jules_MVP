# Weave日本語版MVP

これは、Y Combinator支援のWeave（エンジニアリング生産性分析ツール）の日本語版MVP（Minimum Viable Product）です。
LLMとGitHub分析を組み合わせ、開発者向けの生産性向上ダッシュボードを提供します。

## 🌟 主な機能

- **GitHubリポジトリ分析**: コミット履歴を分析し、開発の生産性を可視化します。
- **生産性ダッシュボード**: リアルタイムで主要な生産性メトリクス（KPI）を表示します。
- **AI使用効果の測定**: AIが生成したコードを検出し、生産性への影響を分析します。
- **日本語UI**: 全てのインターフェースが日本語に対応しています。

## 🛠️ 技術スタック

- **バックエンド**: FastAPI, Python, SQLAlchemy
- **フロントエンド**: React, TypeScript, Ant Design, Recharts
- **データベース**: PostgreSQL
- **キャッシュ**: Redis
- **コンテナ化**: Docker, Docker Compose

## 🚀 導入・実行方法

このアプリケーションはDocker Composeを使用して簡単にセットアップできます。

### 前提条件

- [Docker](https://www.docker.com/get-started) がインストールされていること
- [Docker Compose](https://docs.docker.com/compose/install/) がインストールされていること

### セットアップ手順

1. **リポジトリをクローン**:
   ```bash
   git clone https://github.com/your-username/weave-japan-mvp.git
   cd weave-japan-mvp
   ```

2. **環境変数の設定**:
   `.env.example` ファイルをコピーして `.env` ファイルを作成します。
   ```bash
   cp .env.example .env
   ```
   作成した `.env` ファイルを開き、以下の項目を実際値に更新してください。
   - `GITHUB_TOKEN`: あなたのGitHub Personal Access Token
   - `OPENAI_API_KEY`: あなたのOpenAI APIキー

3. **アプリケーションの起動**:
   以下のコマンドを実行して、すべてのサービスを起動します。
   ```bash
   docker-compose up --build
   ```
   初回起動時は、Dockerイメージのビルドに数分かかることがあります。

4. **アプリケーションへのアクセス**:
   - **フロントエンド**: `http://localhost:3000`
   - **バックエンドAPIドキュメント (Swagger UI)**: `http://localhost:8000/docs`

## ✅ MVPの動作確認項目

- [ ] `localhost:3000` でReactアプリが起動し、ダッシュボードが表示される。
- [ ] `localhost:8000/docs` でFastAPIのAPIドキュメントが確認できる。
- [ ] 「リポジトリ分析」ページでGitHubリポジトリのURLを入力し、「分析開始」ボタンを押すと、バックエンドAPIが呼び出される。
- [ ] ダッシュボードにサンプルまたはAPIから取得したメトリクスが表示される。
- [ ] UI全体が日本語で表示されている。

## 📝 APIエンドポイント

主要なAPIエンドポイントは以下の通りです。詳細はSwagger UI (`/docs`) を参照してください。

- `GET /api/v1/health`: ヘルスチェック
- `POST /api/v1/github/analyze`: GitHubリポジトリ分析
- `GET /api/v1/metrics/productivity`: 生産性メトリクス取得
- `GET /api/v1/metrics/ai-usage`: AI使用状況分析
- `POST /api/v1/reports/generate`: レポート生成

---
*このプロジェクトはJulesによって自動生成されました。*
