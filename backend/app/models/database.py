from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# テーブルモデルの定義

class Repository(Base):
    __tablename__ = "repositories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    url = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    commits = relationship("Commit", back_populates="repository")

class Commit(Base):
    __tablename__ = "commits"
    id = Column(Integer, primary_key=True, index=True)
    commit_hash = Column(String, unique=True, index=True, nullable=False)
    author = Column(String, index=True)
    message = Column(Text)
    commit_date = Column(DateTime(timezone=True))
    additions = Column(Integer)
    deletions = Column(Integer)
    repository_id = Column(Integer, ForeignKey("repositories.id"))

    repository = relationship("Repository", back_populates="commits")
    ai_usage = relationship("AIUsage", uselist=False, back_populates="commit")

class Metric(Base):
    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"))
    metric_name = Column(String, index=True)
    value = Column(Float)
    calculated_at = Column(DateTime(timezone=True), server_default=func.now())

class AIUsage(Base):
    __tablename__ = "ai_usage"
    id = Column(Integer, primary_key=True, index=True)
    commit_id = Column(Integer, ForeignKey("commits.id"))
    is_ai_generated = Column(Float, default=0.0) # 確率やスコア
    confidence_score = Column(Float)
    details = Column(Text) # AI検出の詳細

    commit = relationship("Commit", back_populates="ai_usage")

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"))
    report_type = Column(String) # e.g., "monthly_summary"
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
    content = Column(Text) # レポート内容 (e.g., JSON, Markdown)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
