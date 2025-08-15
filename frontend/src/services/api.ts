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

  console.log('API Base URL:', process.env.REACT_APP_API_URL || 'Not
  set');

  // より堅牢なエラーハンドリング
  export const getProductivityMetrics = async (repoId: string) => {
    try {
      console.log('🚀 Fetching metrics for repo:', repoId);
      const response = await apiClient.get('/metrics/productivity');
      console.log('✅ Metrics received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Metrics fetch failed:', error);
      // フォールバックデータを返す
      return {
        productivity_score: 85.2,
        ai_usage_rate: 65.5,
        commit_frequency: 24,
        code_quality_score: 78.9,
        fallback: true
      };
    }
  };
