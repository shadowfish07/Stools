import { Button, Drawer, Form, Input, Message } from "@arco-design/web-react";
import FormItem from "@arco-design/web-react/es/Form/form-item";
import { useRef, useState } from "react";
import { useConfig } from "../hooks";

type Props = {
  renderButton: (openDrawer: () => void) => JSX.Element;
};

export const Config = ({ renderButton }: Props) => {
  const [visible, setVisible] = useState(false);
  const [config, , setConfig] = useConfig();
  const formRef = useRef<any>();

  const openDrawer = () => {
    setVisible(true);
  };

  const hideDrawer = () => {
    setVisible(false);
  };

  const handleValuesChange = (values: Config) => {
    setConfig({
      ...config,
      ...values,
    });
    hideDrawer();
    Message.success("设置已保存");
  };

  return (
    <>
      {renderButton(openDrawer)}
      <Drawer
        width={"60%"}
        title={<span>设置 </span>}
        visible={visible}
        onOk={() => {
          formRef.current.submit();
        }}
        onCancel={() => {
          hideDrawer();
        }}
      >
        <Form
          ref={formRef}
          initialValues={config}
          onSubmit={handleValuesChange}
          scrollToFirstError
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 21,
          }}
          labelAlign="left"
        >
          <FormItem label="后端地址" field="backendURL">
            <Input />
          </FormItem>
        </Form>
      </Drawer>
    </>
  );
};
