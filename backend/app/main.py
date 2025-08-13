from fastapi import FastAPI, APIRouter

app = FastAPI(title="Weave Japan MVP", version="0.1.0")

# API v1 Router
api_v1_router = APIRouter(prefix="/api/v1")

@api_v1_router.get("/health", tags=["Monitoring"])
async def health_check():
    """
    ヘルスチェックエンドポイント
    サーバーの状態を確認します。
    """
    return {"status": "ok"}

# 各APIモジュールをインポートしてルーターに含める
from .api import github, metrics, reports
api_v1_router.include_router(github.router)
api_v1_router.include_router(metrics.router)
api_v1_router.include_router(reports.router)

app.include_router(api_v1_router)

@app.get("/", tags=["Root"])
async def read_root():
    """
    ルートエンドポイント
    ウェルカムメッセージを返します。
    """
    return {"message": "Weave Japan MVPへようこそ！"}
