import { Button, Menu, Typography } from "@arco-design/web-react"
import { useState } from "react";
import { useStorage } from "../hooks";
import { Storage } from "../utils/Storage";
import { CategoryItem } from "./CategoryItem";
import { IconPlus } from '@arco-design/web-react/icon';
import { nanoid } from 'nanoid'


export const Category = () => {
    const [categories, setCategories] = useStorage({ useKey: "categories" })
    const [newCategory, setNewCategory] = useState<null | Category>(null)

    const handleAddCategory = () => {
        setNewCategory(getNewCategoryTemplate())
    }

    const getNewCategoryTemplate = (): Category => {
        return {
            id: nanoid(),
            title: "",
            titleReadOnly: false,
            icon: "📂",
            iconReadOnly: false,
            deletedAt: undefined,
            children: []
        }
    }

    const handleCategoryChange = (id: string, type: 'icon' | 'title', value: string) => {

        if (!categories.has(id)) {
            setCategories(new Map(categories.set(id, {
                ...(newCategory as Category),
                [type]: value,
            })))
            return
        }

        setCategories(new Map(categories.set(id, {
            ...categories.get(id)!,
            [type]: value,
        })))
        // if (!categories.has(id)) {
        //     if (value) {
        //         // setCategories([
        //         //     ...categories,
        //         //     {
        //         //         ...getNewCategoryTemplate(),
        //         //         [type]: value,
        //         //     }
        //         // ])
        //         setCategories(new Map(categories.set(id, {
        //             ...categories.get(id)!,
        //             [type]: value,
        //         })))
        //     }
        //     setShowAddCategory(false)
        //     return
        // }

        // const newCategories = [...categories]
        // newCategories[id][type] = value

        // setCategories(newCategories)
    }

    return <>
        <Menu mode='vertical' defaultSelectedKeys={['categories-1']}>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                <Typography.Text type='secondary' style={{ userSelect: 'none', fontSize: 13, marginLeft: 9 }}>分类</Typography.Text>
                <Button type='text' size='mini' onClick={handleAddCategory} icon={<IconPlus />} />
            </div>

            {
                [...categories.entries()].map(([id, category]) =>
                    <Menu.Item style={{ padding: '0 5px' }} key={`categories-${id}`}>
                        <CategoryItem id={id} category={category} onUpdate={handleCategoryChange} />
                    </Menu.Item>
                )
            }

            {
                newCategory &&
                <Menu.Item style={{ padding: '0 5px' }} key={`categories-${newCategory.id}`}>
                    <CategoryItem id={newCategory.id} category={newCategory} isNew onUpdate={handleCategoryChange} />
                </Menu.Item>

            }
        </Menu>
    </>
}