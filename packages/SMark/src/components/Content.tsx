import Content from "@arco-design/web-react/es/Layout/content";
import { memo } from "react";
import { useStorage } from "../hooks";
import { Bookmark } from "./Bookmark";

export default memo(() => {
  //   const [bookmarks, setBookmarks] = useStorage({ useKey: "bookmarks" });

  return <Content style={{ padding: 10 }}>{/* <Bookmark /> */}</Content>;
});
