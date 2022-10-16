import { Card, Image, Typography } from "@arco-design/web-react";
import { CategoryInfo } from ".";
import { SelectUtil } from "../utils";

type Props = {
  bookmark: BookMark;
};

export const Bookmark = ({ bookmark }: Props) => {
  const category = SelectUtil.selectCategory(bookmark.category);

  return (
    <Card hoverable>
      <div style={{ display: "flex" }}>
        <Image width={20} height={20} />
        <div style={{ marginLeft: 10 }}>
          <Typography.Title heading={6} style={{ margin: 0 }}>
            {bookmark.title}
          </Typography.Title>
          {/* <Typography.Text type="secondary">Secondary</Typography.Text> */}
          {category && <CategoryInfo category={category} />}
        </div>
      </div>
    </Card>
  );
};
