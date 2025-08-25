import {useEffect, useState} from "react";
import SortButton from "../SortButton/SortButton.jsx";
import FilterButton from "../FilterButton/FilterButton.jsx";
import FilterModal from "../FilterModal/FilterModal.jsx";


function Table({ data, columns }) {
    const [displayData, setDisplayData] = useState(data)
    const [sortConfig, setSortConfig] = useState({key: null, parentKey: null, direction: null})
    const [openFilter, setOpenFilter] = useState(null)
    const [activeFilters, setActiveFilters] = useState({})

    function getValue(item, key, parentKey = null) {
        return parentKey ? item[parentKey]?.[key] : item[key];
    }

    useEffect(() => {
        let processed = [...data];

        // 1. Apply filters
        Object.values(activeFilters).forEach(filter => {
            const selectedOptions = Object.entries(filter.options)
                .filter(([_, isSelected]) => isSelected)
                .map(([option]) => option);

            if (selectedOptions.length > 0) {
                processed = processed.filter(row => {
                    const value = getValue(row, filter.key, filter.parentKey);
                    // Convert value into string, as numeric options are strings.
                    return selectedOptions.includes(String(value));
                });
            }
        });

        // 2. Apply sorting
        if (sortConfig?.key && sortConfig?.direction) {
            processed.sort((a, b) => {
                const aVal = getValue(a, sortConfig.key, sortConfig.parentKey);
                const bVal = getValue(b, sortConfig.key, sortConfig.parentKey);

                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
                }
                return sortConfig.direction === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal));
            });
        }

        // 3. Push to state
        setDisplayData(processed);
    }, [data, activeFilters, sortConfig]);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.label} colSpan={column.children.length}>{column.label}</th>
                        ))}
                    </tr>
                    <tr>{columns.map(parentColumn => (
                        parentColumn.children.map(column => (
                            <th key={column.id}>
                                {column.label}{column.sortable &&
                                <SortButton columnKey={column.key} parentKey={column.parentKey || null} config={sortConfig}
                                             setConfig={setSortConfig}/>}
                                {column.filterable &&
                                <FilterButton handleClick={() => {
                                    // Ensure the column id in activeFilters
                                    if (!activeFilters[column.id]) {
                                        const optionsArr = [...new Set(displayData.map(row => getValue(row, column.key, column.parentKey)))];
                                        const options = {};
                                        optionsArr.forEach(option => options[option] = false);
                                        setActiveFilters(prev => ({ ...prev, [column.id]: {options, key: column.key, parentKey: column.parentKey || null }}));
                                    }
                                    setOpenFilter(column.id);
                                }}/>
                                }
                            </th>
                        ))
                    ))}</tr>
                </thead>
                <tbody>
                    {displayData.map(row => (
                        <tr key={row.tag}>
                            {columns.map(parentColumn => (
                            parentColumn.children.map(column => (
                                <td key={`${column.id}-${row.tag}`}>{getValue(row, column.key, column.parentKey)}</td>
                            ))
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {openFilter && (
                <FilterModal
                    is_open={!!openFilter}
                    options={activeFilters[openFilter]?.options || {}}
                    setOptions={(newOptions) => (
                        setActiveFilters((prev) => (
                            {...prev, [openFilter]:  {...prev[openFilter], options: newOptions}}
                        )
                    ))}
                    onClose={() => setOpenFilter(null)}
                />
            )}
        </>
    )
}

export default Table