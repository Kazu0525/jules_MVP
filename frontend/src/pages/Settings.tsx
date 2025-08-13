import React from 'react';
import { Typography, Form, Input, Button, Select, Slider } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    // TODO: 設定を保存するAPIを呼び出す
  };

  return (
    <div>
      <Title level={2}>設定</Title>
      <Form
        name="settings"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          githubToken: 'ghp_...',
          language: 'ja',
          aiSensitivity: 70,
        }}
      >
        <Form.Item
          name="githubToken"
          label="GitHub Personal Access Token"
          rules={[{ required: true, message: 'GitHubトークンを入力してください' }]}
        >
          <Input.Password placeholder="GitHubトークン" />
        </Form.Item>

        <Form.Item
          name="repositories"
          label="分析対象リポジトリ"
        >
          <Select mode="tags" placeholder="リポジトリURLを追加">
            {/* Sample Repos */}
          </Select>
        </Form.Item>

        <Form.Item
          name="aiSensitivity"
          label="AI検出感度"
        >
          <Slider marks={{ 0: '低', 50: '中', 100: '高' }} />
        </Form.Item>

        <Form.Item
          name="language"
          label="言語設定"
        >
          <Select>
            <Option value="ja">日本語</Option>
            <Option value="en">English</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            設定を保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
