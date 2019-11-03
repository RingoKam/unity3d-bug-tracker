import React from "react";
import { SelectMenu, IconButton, Button, Tooltip, Pill, Pane } from "evergreen-ui"

const CategoryTagInput = ({ categories, selectable, setcategories }) => {
    const availableCategories = selectable.map(category => {
        return { label: category, value: category };
    }).sort();

    const clearFilter = (isSelectAll) => {
        const payload = isSelectAll ? selectable : [];
        setcategories(payload);
    } 

    const selectFilter = ({label, value}) => {
        const index = categories.findIndex(c => c === label)
        const newCategories = index >= 0
            ? [...categories.slice(0, index), ...categories.slice(index + 1)]  
            : [...categories, label];
        setcategories(newCategories);
    }

    const customTile = ({ close, title, headerHeight }) => {
        const isSelectAll = !categories.length > 0;
        const text = isSelectAll ? "Select All" : "Clear";
        const icon = isSelectAll ? "tick" : "cross";
        return (
        <Pane
            boxSizing="border-box"
            borderBottom="default"
            display="flex"
            alignItems="start">
                <Button 
                    appearance="minimal" 
                    onClick={() => clearFilter(isSelectAll)} 
                    iconBefore={icon}>
                    {text}
                </Button>
        </Pane>)
    }

    return (
        <SelectMenu 
            isMultiSelect
            title="Select Bug Category"
            options={availableCategories}
            titleView={customTile}
            selected={categories}
            onSelect={selectFilter}
        >
            <Button><Pill margin={8} color="purple" isSolid>{categories.length}</Pill> Bug Categories</Button>
        </SelectMenu>
    )
}

export default CategoryTagInput;