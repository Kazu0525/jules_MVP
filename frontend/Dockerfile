# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# ビルドステージからビルド済みファイル（静的ファイル）をコピー
COPY --from=build /app/build /usr/share/nginx/html

# デフォルトのNginx設定を削除
RUN rm /etc/nginx/conf.d/default.conf

# 新しい設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d

# 3000番ポートを公開
EXPOSE 3000

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
