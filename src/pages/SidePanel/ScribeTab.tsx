import React, { useEffect, useState } from 'react';
import './SidePanel.css';
import {
  Divider,
  Empty,
  FloatButton,
  Form,
  Input,
  Tooltip,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  CheckCircleOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const ScribeTab = () => {
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState();

  const [form] = Form.useForm<{ name: string; age: number }>();
  const roleValue = Form.useWatch('role', form);
  const contextValue = Form.useWatch('context', form);
  const responsibilityValue = Form.useWatch('responsibility', form);
  const instructionsValue = Form.useWatch('instructions', form);

  useEffect(() => {
    // chrome.storage.sync.get(['testValue'], (data) => {
    //   console.log(data);
    //   setOptions(data.testValue);
    // });
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
        setOptions(newValue);
      }
    });
  }, []);

  const promptValue = `${roleValue ? `You are a ${roleValue}. ` : ''}${
    contextValue ? `${contextValue}. ` : ''
  }${responsibilityValue ? `${responsibilityValue}. ` : ''}${
    instructionsValue ? `${instructionsValue}. ` : ''
  }`;

  console.log(promptValue);

  return (
    <div className="App">
      <Typography.Title style={{ marginTop: 0 }} level={4}>
        SCRIBE Method
      </Typography.Title>
      <Typography.Paragraph>
        Based on the method described in this{' '}
        <a href="https://blog.synapticlabs.ai/unleash-your-chatgpts-potential-with-the-scribe-method">
          article
        </a>
        .
      </Typography.Paragraph>
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 'none' }}
        autoComplete="off"
        size="small"
        variant="filled"
        onChange={() => {
          setCopied(false);
        }}
      >
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="role"
          label="[S] - Specify a role"
          tooltip="Assigning a unique and engaging role for ChatGPT is the first step in crafting an enjoyable and productive interaction. A well-defined role helps the AI understand the context and the type of response you're looking for, while also sparking its creativity."
        >
          <Input allowClear placeholder="You are a ..." />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="context"
          label="[C] - Contextualize"
          tooltip="Providing context is essential for helping ChatGPT generate responses that are relevant and meaningful. By setting the stage with a rich and engaging background, you help the AI understand the nuances of the task and inspire it to produce more creative and accurate content."
        >
          <TextArea allowClear placeholder="Give Relevant Details" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="responsibility"
          label="[R] - Responsibility"
          tooltip="Assigning a clear and compelling task for ChatGPT is crucial to guiding its responses and ensuring that the output aligns with your expectations."
        >
          <TextArea allowClear placeholder="Specify a Task" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="instructions"
          label="[I] - Instructions"
          tooltip="Before diving into the conversation, it's essential give clear instructions to ChatGPT, so it's not left guessing about the best way forward. Asking the AI to follow steps leads to more accurate and relevant responses."
          extra={
            <ul>
              <li>Use numbers or bullet points</li>
              <li>Break complex tasks into smaller chinks</li>
              <li>Ask if ChatGPT understands</li>
              <li>Chain of Thought</li>
            </ul>
          }
        >
          <TextArea
            allowClear
            placeholder="Outline the steps to achieve the job"
          />
        </Form.Item>
      </Form>

      <Divider orientation="left" orientationMargin="0">
        Your prompt{' '}
        <CopyToClipboard text={promptValue} onCopy={() => setCopied(true)}>
          {copied ? (
            <CheckCircleOutlined style={{ color: 'green' }} />
          ) : (
            <CopyOutlined />
          )}
        </CopyToClipboard>
      </Divider>
      <Typography>
        <CopyToClipboard text={promptValue} onCopy={() => setCopied(true)}>
          <pre>
            {promptValue ? (
              <>{promptValue}</>
            ) : (
              <Empty
                description="Compose a prompt by completing the form"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </pre>
        </CopyToClipboard>
      </Typography>
      <Divider orientation="left" orientationMargin="0">
        Next steps
      </Divider>
      <Typography.Text strong>
        [B] - Banter{' '}
        <Tooltip
          title="Engaging in a back-and-forth conversation with ChatGPT is a crucial
          step in refining the AI-generated content to meet your expectations.
          Bantering with the AI allows you to shape the output and fine-tune the
          results, ensuring a higher degree of accuracy and relevance"
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </Typography.Text>
      <Typography.Paragraph>
        <ul>
          <li>Ask follow-up questions</li>
          <li>Request revisions or alternatives</li>
          <li>Provide feedback and guidance</li>
        </ul>
      </Typography.Paragraph>
      <Typography.Text strong>
        [E] - Evaluate{' '}
        <Tooltip title="The final step in the SCRIBE method is to evaluate the output generated by ChatGPT. Taking the time to assess the results helps you identify areas for improvement and learn from the experience, ultimately leading to more effective AI interactions in the future. ">
          <QuestionCircleOutlined />
        </Tooltip>
      </Typography.Text>
      <Typography.Paragraph>
        <ul>
          <li>Review the output for accuracy and relevance</li>
          <li>Reflect on the process and identify areas for improvement</li>
          <li>Take note of successful strategies</li>
        </ul>
      </Typography.Paragraph>
      <FloatButton
        style={{ right: 10, bottom: 15 }}
        tooltip={<div>Reset</div>}
        icon={
          <SyncOutlined
            onClick={() => {
              setCopied(false);
              form.resetFields();
            }}
          />
        }
      />
    </div>
  );
};

export default ScribeTab;
