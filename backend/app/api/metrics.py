from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...services.metrics import MetricsEngine
from ...models.database import get_db

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"],
)

@router.get("/productivity")
async def get_productivity_metrics(repo_id: int = 1, db: Session = Depends(get_db)):
    """
    生産性メトリクスを取得します。
    """
    try:
        engine = MetricsEngine(db)
        kpis = engine.calculate_productivity_kpis(repo_id)
        return kpis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ai-usage")
async def get_ai_usage_analysis(repo_id: int = 1, db: Session = Depends(get_db)):
    """
    AI使用状況の分析結果を取得します。
    """
    # This might be part of the general productivity metrics
    # or a separate calculation.
    try:
        engine = MetricsEngine(db)
        # Assuming there is a method for this in MetricsEngine
        # For now, we reuse the benchmark as a mock
        usage = engine.get_benchmark_comparison(repo_id)
        return usage
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
