import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import { EmojiPicker } from './EmojiPicker';
import { Input } from '@arco-design/web-react';

const StyledCategoryItem = styled.div`

  .readonly {
    pointer-events: none;
  }

  .icon {
    user-select: none;
    margin-right: 5px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;

    &:hover{
        background-color: rgb(var(--primary-1));
    }
  }

  .title {
    user-select: none;
  }
`;

type Props = {
    id: string
    category: Category;
    isNew?: boolean;
    onUpdate: (id: string, type: 'icon' | 'title', value: string) => void
}

const DEFAULT_NEW_CATEGORY_TITLE = "新建分类"

export const CategoryItem = ({ id, category, isNew = false, onUpdate }: Props) => {
    const ref = useRef<null | HTMLDivElement>(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [isEditingTitle, setIsEditingTitle] = useState(isNew)
    const [title, setTitle] = useState(category.title)

    const getElementPosition = () => {
        if (!ref.current) {
            return {
                x: 0,
                y: 0
            }
        }
        return {
            x: ref.current.getBoundingClientRect().x + 20,
            y: ref.current.getBoundingClientRect().y + 20,
        }
    }

    const handleHideEmojiPicker = () => {
        setShowEmojiPicker(false)
    }

    const handleClickEmoji = () => {
        setShowEmojiPicker(true)
    }

    const showTitleEditor = () => {
        setIsEditingTitle(true)
    }

    const saveTitle = () => {
        setIsEditingTitle(false)
        const finalTitle = isNew && !title ? DEFAULT_NEW_CATEGORY_TITLE : title
        onUpdate(id, 'title', finalTitle)
    }

    const handleInput = (value: string) => {
        setTitle(value)
    }

    const handleSelectEmoji = ({ native }: Emoji) => {
        handleHideEmojiPicker()
        onUpdate(id, 'icon', native)
    }

    return <>
        <StyledCategoryItem ref={ref} >
            <span className={`icon ${category.iconReadOnly ? 'readonly' : ''}`} onClick={handleClickEmoji}>{category.icon}</span>
            {
                !isEditingTitle && <span className={`title ${category.titleReadOnly ? 'readonly' : ''}`} onDoubleClick={showTitleEditor}>{category.title}</span>
            }
            {
                isEditingTitle && <Input value={title} onChange={handleInput} autoFocus onBlur={saveTitle} onPressEnter={saveTitle} style={{ width: "calc(100% - 35px)" }} placeholder={isNew ? DEFAULT_NEW_CATEGORY_TITLE : "输入分类名"} />
            }
        </StyledCategoryItem>
        {
            showEmojiPicker &&
            ReactDOM.createPortal(<EmojiPicker position={getElementPosition()} onHide={handleHideEmojiPicker} onSelect={handleSelectEmoji} />,
                document.getElementById('root') as HTMLElement)
        }
    </>
}