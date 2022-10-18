import { Button, Popover } from "@arco-design/web-react";
import Header from "@arco-design/web-react/es/Layout/header";
import { memo, useContext, useState } from "react";
import { AddBookmark } from ".";
import { SavingContext } from "../main";

export default memo(() => {
  const { isSaving, setIsSaving } = useContext(SavingContext);

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingRight: 10,
      }}
    >
      <div>{isSaving && <span>保存中</span>}</div>
      <div>
        <AddBookmark />
      </div>
    </Header>
  );
});
