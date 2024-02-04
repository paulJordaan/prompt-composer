import React, { useEffect, useRef, useState } from 'react';
import './SidePanel.css';
import {
  Button,
  Divider,
  Empty,
  FloatButton,
  Form,
  Input,
  InputRef,
  Select,
  Space,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  CheckCircleOutlined,
  CopyOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const ROLES = ['reporter'];
const TASKS = [
  'adapt',
  'analyze',
  'automate',
  'calculate',
  'classify',
  'collaborate',
];
const FORMATS = [
  'plain text',
  'well structured format',
  'JSON',
  'CSV',
  'HTML',
  'XML',
];

const GPTTab = () => {
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState();
  const roleInputRef = useRef<InputRef>(null);
  const taskInputRef = useRef<InputRef>(null);

  const onCustomRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('role', event.target.value);
  };

  const onCustomTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('task', event.target.value);
  };

  const [form] = Form.useForm<{ name: string; age: number }>();
  const roleValue = Form.useWatch('role', form);
  const needValue = Form.useWatch('need', form);
  const taskValue = Form.useWatch('task', form);
  const detailsValue = Form.useWatch('details', form);
  const exclusionValue = Form.useWatch('exclusion', form);
  const formatValue = Form.useWatch('format', form);
  const exampleValue = Form.useWatch('example', form);

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

  const promptValue = `${roleValue ? `Act like a ${roleValue}, ` : ''}${
    needValue ? `I need a ${needValue}, ` : ''
  }${taskValue ? `you will ${taskValue}, ` : ''}${
    detailsValue ? `in the process, you should ${detailsValue}, ` : ''
  }${exclusionValue ? `please ${exclusionValue}, ` : ''}${
    formatValue ? `input the final result in a  ${formatValue}, ` : ''
  }${exampleValue ? `here is an example:  ${exampleValue}` : ''}`;

  console.log(promptValue);

  return (
    <div className="App">
      <Typography.Title style={{ marginTop: 0 }} level={4}>
        Craft a Prompt
      </Typography.Title>
      <Typography.Paragraph>
        Inpired by this <a href="https://mitenmit.github.io/gpt/">site</a>.
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
          label="Act like a"
        >
          <Select
            placeholder="Specify a role"
            allowClear
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider plain style={{ margin: '8px 0' }}>
                  Use custom role
                </Divider>
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="Custom role"
                    ref={roleInputRef}
                    onChange={onCustomRoleChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </Space>
              </>
            )}
            options={ROLES.map((role) => ({ label: role, value: role }))}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: '8px' }} name="need" label="I need a">
          <Input allowClear placeholder="What do you need?" />
        </Form.Item>
        <Form.Item style={{ marginBottom: '8px' }} name="task" label="you will">
          <Select
            placeholder="Enter a task"
            allowClear
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider plain style={{ margin: '8px 0' }}>
                  Use custom task
                </Divider>
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="Custom task"
                    ref={taskInputRef}
                    onChange={onCustomTaskChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </Space>
              </>
            )}
            options={TASKS.map((task) => ({ label: task, value: task }))}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="details"
          label="in the process, you should"
        >
          <TextArea allowClear placeholder="Enter details" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="exclusion"
          label="please"
        >
          <Input allowClear placeholder="Enter exclusion" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="format"
          label="input the final result in a "
        >
          <Select
            placeholder="Select a format"
            allowClear
            options={FORMATS.map((format) => ({
              label: format,
              value: format,
            }))}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '8px' }}
          name="example"
          label="here is an example: "
        >
          <TextArea allowClear placeholder="Enter an example" />
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
              <>
                {promptValue}
                {/* {roleValue && `Act like a ${roleValue}, `}
                {needValue && `I need a ${needValue}, `}
                {taskValue && `you will ${taskValue}, `}
                {detailsValue && `in the process, you should ${detailsValue}, `}
                {exclusionValue && `please ${exclusionValue}, `}
                {formatValue && `input the final result in a  ${formatValue}, `}
                {exampleValue && `here is an example:  ${exampleValue}`} */}
              </>
            ) : (
              <Empty
                description="Compose a prompt by completing the form"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </pre>
        </CopyToClipboard>
      </Typography>
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

export default GPTTab;
