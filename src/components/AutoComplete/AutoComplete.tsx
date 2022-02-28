import React, {ChangeEvent, ReactElement, useEffect, useRef, useState} from 'react';
import Input, {InputProps} from "../Input/Input";
import useDebounce from "../../hooks/useDebounce";
import Icon from "../Icon/Icon";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

// 基本类型
interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void,
    renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props
    const [inputValue, setInputValue] = useState(value)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const triggerSearch = useRef(false)
    const [hightliIndex, setHightliIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue, 1000)
    const refComponent = useRef<HTMLDivElement>(null);
    useClickOutside(refComponent,()=>{setSuggestions([])})

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([])
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
    }, [debounceValue])



    const higlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHightliIndex(index)
    }

    const handleKeyDown = (e) => {
        switch (e.code) {
            case 'ArrowUp':
                higlight(hightliIndex - 1);
                break;
            case 'ArrowDown':
                higlight(hightliIndex + 1);
                break;
            case 'Enter':
                if (suggestions[hightliIndex]) {
                    handleSelect(suggestions[hightliIndex])
                }
                break;
            case "Escape":
                break;
        }
    }
    const handleChange = (item: ChangeEvent<HTMLInputElement>) => {
        const value = item.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item;
    }

    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    const classes = classNames('suggestion-item', {
                        'item-highlighted': index === hightliIndex
                    })
                    return (
                        <li className={classes} key={index} onClick={() => {
                            handleSelect(item)
                        }}>{renderTemplate(item)}</li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className={"viking-auto-complete"} ref={refComponent}>
            <Input
                {...restProps}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {loading && <ul><Icon icon={"spinner"} spin/></ul>}
            {suggestions.length > 0 && generateDropdown()}
        </div>
    );
};

export default AutoComplete;