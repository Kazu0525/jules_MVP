import React from 'react';
import { Typography, Row, Col, Card, Spin, Alert } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import { getProductivityMetrics } from '../services/api';

const { Title } = Typography;

// サンプルデータ (APIフォールバック用)
const sampleData = [
    { name: '1月', 'AI活用度': 0.1, 'コード品質': 75, '開発速度': 20 },
    { name: '2月', 'AI活用度': 0.12, 'コード品質': 78, '開発速度': 22 },
    { name: '3月', 'AI活用度': 0.15, 'コード品質': 80, '開発速度': 25 },
    { name: '4月', 'AI活用度': 0.18, 'コード品質': 82, '開発速度': 28 },
];

const Dashboard: React.FC = () => {
    const { data: metrics, isLoading, error } = useQuery('productivityMetrics', () => getProductivityMetrics("1"));

    if (isLoading) return <Spin size="large" />;
    if (error) return <Alert message="データの取得に失敗しました" type="error" />;

    const displayMetrics = metrics?.data || {
        "改善度": 0,
        "効率性": 0,
        "AI活用率": 0,
        "コード品質スコア": 0
    };

    return (
        <div>
            <Title level={2}>ダッシュボード</Title>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="AI活用率">
                        <p style={{ fontSize: 24, fontWeight: 'bold' }}>{`${(displayMetrics.AI活用率 * 100).toFixed(1)}%`}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="コード品質スコア">
                        <p style={{ fontSize: 24, fontWeight: 'bold' }}>{displayMetrics.コード品質スコア}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="効率性">
                        <p style={{ fontSize: 24, fontWeight: 'bold' }}>{displayMetrics.効率性}</p>
                    </Card>
                </Col>
            </Row>
            <div style={{ marginTop: 40 }}>
                <Title level={3}>生産性指標の推移 (サンプル)</Title>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="AI活用度" stroke="#8884d8" />
                        <Line type="monotone" dataKey="コード品質" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="開発速度" stroke="#ffc658" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
