"use client";

import React from "react";
import { Form, FormInstance } from "antd";
import InputField from "@/components/InputField";
import { InputType } from "@/type";
import Button from "@/components/Button";
import { Rule } from "antd/es/form";

interface InputConfig {
  label: string;
  name: string;
  placeholder: string;
  rules?: Rule[];
  inputType?: InputType;
}

interface DynamicFormProps {
  form: FormInstance;
  inputs: InputConfig[];
  onFinish: (values: { [key: string]: string }) => void;
  buttonText: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  form,
  inputs,
  onFinish,
  buttonText,
}) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical" className="mt-7">
      {inputs.map((input) => (
        <Form.Item
          key={input.name}
          label={input.label}
          name={input.name}
          rules={input.rules}
        >
          <InputField
            placeHolder={input.placeholder}
            size="medium"
            inputType={input.inputType}
          />
        </Form.Item>
      ))}

      <Form.Item>
        <div className="flex justify-end">
          <Button behavior="submit">{buttonText}</Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
