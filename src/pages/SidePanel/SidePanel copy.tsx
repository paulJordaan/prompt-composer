import React from 'react';
import './SidePanel.css';
import { Form, Input, InputNumber, Typography } from 'antd';


// # CONTEXT # 
// I am a personal productivity developer. In the realm of personal development and productivity, there is a growing demand for systems that not only help individuals set goals but also convert those goals into actionable steps. Many struggle with the transition from aspirations to concrete actions, highlighting the need for an effective goal-to-system conversion process.

// #########

// # OBJECTIVE #
// Your task is to guide me in creating a comprehensive system converter. This involves breaking down the process into distinct steps, including identifying the goal, employing the 5 Whys technique, learning core actions, setting intentions, and conducting periodic reviews. The aim is to provide a step-by-step guide for seamlessly transforming goals into actionable plans.

// #########

// # STYLE #
// Write in an informative and instructional style, resembling a guide on personal development. Ensure clarity and coherence in the presentation of each step, catering to an audience keen on enhancing their productivity and goal attainment skills.

// #########

// # Tone #
//  Maintain a positive and motivational tone throughout, fostering a sense of empowerment and encouragement. It should feel like a friendly guide offering valuable insights.

// # AUDIENCE #
// The target audience is individuals interested in personal development and productivity enhancement. Assume a readership that seeks practical advice and actionable steps to turn their goals into tangible outcomes.

// #########

// # RESPONSE FORMAT #
// Provide a structured list of steps for the goal-to-system conversion process. Each step should be clearly defined, and the overall format should be easy to follow for quick implementation. 

// #############

// # START ANALYSIS #
// If you understand, ask me for my goals.


const SidePanel = () => {
  const [form] = Form.useForm<{ name: string; age: number }>();
  const contextValue = Form.useWatch('context', form);
  const objectiveValue = Form.useWatch('objective', form);
  const styleValue = Form.useWatch('style', form);
  const toneValue = Form.useWatch('tone', form);
  const audienceValue = Form.useWatch('audience', form);
  const responseValue = Form.useWatch('response', form);



  return (
    <div className="App">
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="context" label="CONTEXT">
          <Input />
        </Form.Item>
        <Form.Item name="objective" label="OBJECTIVE">
          <Input />
        </Form.Item>
        <Form.Item name="style" label="STYLE">
          <Input />
        </Form.Item>
        <Form.Item name="tone" label="TONE">
          <Input />
        </Form.Item>
        <Form.Item name="audience" label="AUDIENCE">
          <Input />
        </Form.Item>
        <Form.Item name="response" label="RESPONSE FORMAT">
          <Input />
        </Form.Item>
      </Form>
      <Typography>
        <pre>
          {contextValue} <br/>
          {objectiveValue} <br/>
          {styleValue}<br/>
          {toneValue}<br/>
          {audienceValue}<br/>
          {responseValue}
        </pre>
      </Typography>
    </div>
  );
};

export default SidePanel;
