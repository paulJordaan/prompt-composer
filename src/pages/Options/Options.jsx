import React from 'react';
import './Options.css';

import { Button, Form, Input } from 'antd';


const Options = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);

    chrome.storage.sync.set(
      { testValue: values.testValue, },
      () => {
        console.log(values.testValue)
        // // Update status to let user know options were saved.
        // const status = document.getElementById('status');
        // status.textContent = 'Options saved.';
        // setTimeout(() => {
        //   status.textContent = '';
        // }, 750);
      }
    );

  };

  return (
    <Form
      layout='horizontal'
      form={form}
      onFinish={onFinish}
    >
      <Form.Item name="testValue"  label="Value">
        <Input placeholder="input placeholder" required/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );};

export default Options;


