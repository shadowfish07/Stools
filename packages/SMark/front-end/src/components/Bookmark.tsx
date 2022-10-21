import { Card, Image, Typography } from "@arco-design/web-react";
import { CategoryInfo, UrlInfo } from ".";
import { useStorage } from "../hooks";

type Props = {
  bookmark: Bookmark;
};

export const Bookmark = ({ bookmark }: Props) => {
  const { selectHelper } = useStorage({ useKey: "categories" });
  const category = selectHelper.selectCategory(bookmark.category!);

  return (
    <Card hoverable style={{ marginBottom: 5, cursor: "pointer" }}>
      <div style={{ display: "flex" }}>
        <Image width={20} height={20} src="/test.ico" />
        <div style={{ marginLeft: 10 }}>
          <Typography.Title heading={6} style={{ margin: 0 }}>
            {bookmark.title}
          </Typography.Title>
          {/* <Typography.Text type="secondary">Secondary</Typography.Text> */}
          <CategoryInfo category={category} />
          <UrlInfo bookmark={bookmark} />
        </div>
      </div>
    </Card>
  );
};
