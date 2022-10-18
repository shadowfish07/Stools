import styled from "styled-components";

const StyledCategoryInfo = styled.span`
  color: var(--color-text-2);

  span:nth-child(1) {
    margin-right: 5px;
    user-select: none;
  }

  &::after {
    content: "·";
    text-align: center;
    width: 20px;
    display: inline-block;
  }
`;

type Props = {
  category?: Category;
};

export const CategoryInfo = ({ category }: Props) => {
  if (!category) {
    return (
      <StyledCategoryInfo>
        <span>🗂️</span>
        <span>所有书签</span>
      </StyledCategoryInfo>
    );
  }
  return (
    <StyledCategoryInfo>
      <span>{category.icon}</span>
      <span>{category.title}</span>
    </StyledCategoryInfo>
  );
};
