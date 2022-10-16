import { Button, Input, Popover, Typography } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useStorage } from "../hooks";
import { BookmarksContext } from "../main";

const StyledContent = styled.div`
  .button {
    margin-left: auto;
    margin-top: 10px;
    display: block;
  }
`;

export const AddBookmark = () => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const { updateRecord } = useContext(BookmarksContext);

  const handleUrlChange = (url: string) => {
    setUrl(url);
  };

  const handleSave = () => {
    const id = nanoid();
    updateRecord(id, {
      id: id,
      url,
      title: "123456",
      createdAt: new Date().getTime(),
      deletedAt: undefined,
    });
    setVisible(false);
    setUrl("");
  };

  useEffect(() => {
    return () => {
      setUrl("");
    };
  }, []);

  return (
    <Popover
      position="bl"
      popupVisible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      trigger="click"
      style={{ width: 300 }}
      content={
        <StyledContent>
          <Typography.Text>URL</Typography.Text>
          <Input value={url} onChange={handleUrlChange} />
          <Button type="primary" className="button" onClick={handleSave}>
            保存
          </Button>
        </StyledContent>
      }
    >
      <Button type="primary" icon={<IconPlus />}>
        添加
      </Button>
    </Popover>
  );
};
