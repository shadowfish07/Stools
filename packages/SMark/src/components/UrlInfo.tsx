import styled from "styled-components";

const StyledUrlInfo = styled.span`
  color: var(--color-text-2);

  &::after {
    content: "·";
    text-align: center;
    width: 20px;
    display: inline-block;
  }
`;

type Props = {
  bookmark: Bookmark;
};

export const UrlInfo = ({ bookmark }: Props) => {
  return (
    <StyledUrlInfo>
      <span>{bookmark.url}</span>
    </StyledUrlInfo>
  );
};
