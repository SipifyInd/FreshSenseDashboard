import React from "react";
import { Form, FormInstance, Radio } from "antd";
import InputField from "@/components/InputField";
import { InputConfig } from "@/type";
import Button from "@/components/Button";
import classNames from "classnames";

interface DynamicFormProps {
  form: FormInstance;
  inputs: InputConfig[];
  onFinish: (values: { [key: string]: string }) => void;
  buttonText: string;
  buttonElement?: React.ReactNode;
  isLoading?: boolean;
  extra?: React.ReactNode;
  verifedName?: string;
  navigateHandler?: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  form,
  inputs,
  onFinish,
  buttonText,
  buttonElement,
  isLoading = false,
  extra,
  verifedName,
  navigateHandler,
}) => {
  return (
    <Form form={form} onFinish={onFinish} layout="vertical" className="mt-7">
      {inputs.map((input) => (
        <div key={input.name} className="mb-4">
          <Form.Item
            label={input.label}
            name={input.name}
            rules={input.rules}
            required={input.required !== undefined ? input.required : true}
          >
            {input.inputType === "radio" ? (
              <Radio.Group>
                {input.options?.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            ) : (
              <InputField
                placeHolder={input.placeholder as string}
                size="medium"
                inputType={input.inputType}
              />
            )}
          </Form.Item>

          {input.extra && (
            <div className="flex justify-between">{input.extra}</div>
          )}
        </div>
      ))}

      {extra && extra}

      <Form.Item>
        <div
          className={classNames("flex mt-4", {
            "justify-between": buttonElement,
            "justify-end": !buttonElement,
          })}
        >
          {buttonElement}

          {verifedName ? (
            <Button behavior="button" onClick={navigateHandler}>
              {buttonText}
            </Button>
          ) : (
            <Button behavior="submit" loading={isLoading}>
              {buttonText}
            </Button>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
