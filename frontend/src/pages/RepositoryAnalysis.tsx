import React, { useState } from 'react';
import { Typography, Input, Button, Form, Spin, Alert } from 'antd';
import { analyzeRepository } from '../services/api';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const RepositoryAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const onFinish = async (values: { repoUrl: string }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      try {
        const response = await analyzeRepository(values.repoUrl);
        setResult(response.data);
      } catch (err) {
        setError("分析に失敗しました。");
      } finally {
        setLoading(false);
      }

    } catch (err) {
      setError("分析に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>リポジトリ分析</Title>
      <Paragraph>
        分析したいGitHubリポジトリのURLを入力してください。
      </Paragraph>
      <Form onFinish={onFinish}>
        <Form.Item
          name="repoUrl"
          rules={[{ required: true, message: 'リポジトリURLを入力してください' }]}
        >
          <Search
            placeholder="https://github.com/your/repo"
            enterButton="分析開始"
            size="large"
            loading={loading}
          />
        </Form.Item>
      </Form>

      {loading && <Spin size="large" />}
      {error && <Alert message={error} type="error" />}
      {result && (
        <div>
          <Title level={3}>分析結果: {result.repoName}</Title>
          <p>総コミット数: {result.totalCommits}</p>
          {/* TODO: 結果をより詳細に表示 */}
        </div>
      )}
    </div>
  );
};

export default RepositoryAnalysis;
