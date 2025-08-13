from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ...services.github_analyzer import GitHubAnalyzer
from ...models.database import get_db

router = APIRouter(
    prefix="/github",
    tags=["GitHub"],
)

class AnalyzeRequest(BaseModel):
    url: str

@router.post("/analyze")
async def analyze_github_repository(request: AnalyzeRequest, db: Session = Depends(get_db)):
    """
    GitHubリポジトリの分析を非同期で開始します。
    """
    try:
        analyzer = GitHubAnalyzer()
        # In a real app, this would be a background task
        result = analyzer.analyze_repository(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
