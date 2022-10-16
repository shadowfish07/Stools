import Content from "@arco-design/web-react/es/Layout/content";
import { memo, useContext } from "react";
import { useStorage } from "../hooks";
import { BookmarksContext } from "../main";
import { Bookmark } from "./Bookmark";

export default memo(() => {
  const { data: bookmarks } = useContext(BookmarksContext);

  return (
    <Content style={{ padding: 10 }}>
      {[...bookmarks.values()].map((bookmark) => (
        <Bookmark key={bookmark.id} bookmark={bookmark} />
      ))}
    </Content>
  );
});
