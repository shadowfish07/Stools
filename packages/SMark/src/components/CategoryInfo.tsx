import styled from "styled-components";

const StyledCategoryInfo = styled.div`
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
  category: Category;
};

export const CategoryInfo = ({ category }: Props) => {
  return (
    <StyledCategoryInfo>
      <span>{category.icon}</span>
      <span>{category.title}</span>
    </StyledCategoryInfo>
  );
};
