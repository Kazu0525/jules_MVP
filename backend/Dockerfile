# Pythonの公式イメージをベースとして使用
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 環境変数を設定
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# pipをアップグレード
RUN pip install --upgrade pip

# requirements.txtをコピーして依存関係をインストール
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# アプリケーションコードをコピー
COPY ./app /app/app

# uvicornを起動してアプリケーションを実行
# 0.0.0.0でリッスンすることで、コンテナ外からのアクセスを許可
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
