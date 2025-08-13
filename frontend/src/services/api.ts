import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// GitHubリポジトリ分析を開始
export const analyzeRepository = (repoUrl: string) => {
  return apiClient.post('/github/analyze', { url: repoUrl });
};

// 生産性メトリクスを取得
export const getProductivityMetrics = (repoId: string) => {
  // TODO: `repoId` をパラメータとして渡す
  return apiClient.get('/metrics/productivity');
};

// AI使用状況分析を取得
export const getAiUsageMetrics = (repoId: string) => {
  // TODO: `repoId` をパラメータとして渡す
  return apiClient.get('/metrics/ai-usage');
};

// レポートを生成
export const generateReport = (repoId: string) => {
  return apiClient.post('/reports/generate', { repository_id: repoId });
};

// ヘルスチェック
export const healthCheck = () => {
  return apiClient.get('/health');
};
