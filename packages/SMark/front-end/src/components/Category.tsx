import { Button, Menu, Typography } from "@arco-design/web-react";
import { useState } from "react";
import { useConfig, useStorage } from "../hooks";
import { CategoryItem } from "./CategoryItem";
import { IconPlus } from "@arco-design/web-react/icon";
import { nanoid } from "nanoid";
import styled, { createGlobalStyle } from "styled-components";

const GlobalMenuStyle = createGlobalStyle`
  .arco-menu-light .arco-menu-inline-header.arco-menu-selected {
    background-color: var(--color-fill-2);
  }
`;

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -4px;
  margin-bottom: 5px;
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
  const [config] = useConfig();

  const handleAddCategory = () => {
    setNewCategory(getNewCategoryTemplate());
  };

  const getNewCategoryTemplate = (): Category => {
    return {
      id: nanoid(),
      title: "",
      icon: "📂",
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
        defaultSelectedKeys={["categories-default"]}
        style={{ paddingTop: 10 }}
      >
        <StyledSectionHeader>
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
        </StyledSectionHeader>

        <Menu.Item style={{ padding: "0 5px" }} key={`categories-default`}>
          <CategoryItem
            id={"categories-default"}
            category={config.defaultCategory}
            isDefault
          />
        </Menu.Item>

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
