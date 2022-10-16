import { Button, Menu, Typography } from "@arco-design/web-react";
import { useState } from "react";
import { useStorage } from "../hooks";
import { Storage } from "../utils/Storage";
import { CategoryItem } from "./CategoryItem";
import { IconPlus } from "@arco-design/web-react/icon";
import { nanoid } from "nanoid";
import { createGlobalStyle } from "styled-components";

const GlobalMenuStyle = createGlobalStyle`
  .arco-menu-light .arco-menu-inline-header.arco-menu-selected {
    background-color: var(--color-fill-2);
  }
`;

export const Category = () => {
  const {
    data: categories,
    updateField,
    updateRecord,
  } = useStorage({
    useKey: "categories",
  });
  const [newCategory, setNewCategory] = useState<null | Category>(null);

  const handleAddCategory = () => {
    setNewCategory(getNewCategoryTemplate());
  };

  const getNewCategoryTemplate = (): Category => {
    return {
      id: nanoid(),
      title: "",
      titleReadOnly: false,
      icon: "📂",
      iconReadOnly: false,
      deletedAt: undefined,
      children: [],
    };
  };

  const handleCategoryChange = (
    id: string,
    type: "icon" | "title",
    value: string
  ) => {
    if (!categories.has(id)) {
      updateRecord(id, {
        ...(newCategory as Category),
        [type]: value,
      });
      setNewCategory(null);
      return;
    }

    updateField(id, type, value);
  };

  return (
    <>
      <GlobalMenuStyle />
      <Menu
        mode="vertical"
        defaultSelectedKeys={["categories-1"]}
        style={{ paddingTop: 10 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text
            type="secondary"
            style={{ userSelect: "none", fontSize: 13, marginLeft: 9 }}
          >
            分类
          </Typography.Text>
          <Button
            type="text"
            size="mini"
            onClick={handleAddCategory}
            icon={<IconPlus />}
          />
        </div>

        {[...categories.entries()].map(([id, category]) => (
          <Menu.Item style={{ padding: "0 5px" }} key={`categories-${id}`}>
            <CategoryItem
              id={id}
              category={category}
              onUpdate={handleCategoryChange}
            />
          </Menu.Item>
        ))}

        {newCategory && (
          <Menu.Item
            style={{ padding: "0 5px" }}
            key={`categories-${newCategory.id}`}
          >
            <CategoryItem
              id={newCategory.id}
              category={newCategory}
              isNew
              onUpdate={handleCategoryChange}
            />
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};
