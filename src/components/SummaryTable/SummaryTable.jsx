import {useEffect, useState, useRef} from "react";
import SortButton from "../SortButton/SortButton.jsx";
import FilterButton from "../FilterButton/FilterButton.jsx";
import FilterModal from "../FilterModal/FilterModal.jsx";
import { getUniqueValues } from "../../utilities/filtering.js";


function generateColumnId(key, parentKey) {
    return parentKey ? `${parentKey}-${key}` : key;
}

const rawColumns = [
    { label: "General Info", children: [
            { key: "name", label: "Name", sortable: true, filterable: false },
            { key: "town_hall", label: "Town Hall", sortable: true, filterable: true },
            { key: "role", label: "Role", sortable: false, filterable: true },
            { key: "war_opted_in", label: "Wars?", sortable: false, filterable: true },
            { key: "average_donations", label: "Donations", sortable: true, filterable: false },
        ]},
    { label: "Clan Games", children: [
            { key: "average_medals", label: "Medals", sortable: true, filterable: false },
        ]},
    { label: "War", children: [
            { key: "attacks", parentKey: "war_stats", label: "Attacks", sortable: true, filterable: false },
            { key: "stars", parentKey: "war_stats", label: "Stars", sortable: true, filterable: false },
            { key: "destruction", parentKey: "war_stats", label: "Destruction", sortable: true, filterable: false },
        ]},
    { label: "Clan War League", children: [
            { key: "attacks", parentKey: "cwl_stats", label: "Attacks", sortable: true, filterable: false },
            { key: "stars", parentKey: "cwl_stats", label: "Stars", sortable: true, filterable: false },
            { key: "destruction", parentKey: "cwl_stats", label: "Destruction", sortable: true, filterable: false },
        ]},
    { label: "Raid Weekend", children: [
            { key: "attacks", parentKey: "raid_stats", label: "Attacks", sortable: true, filterable: false },
            { key: "gold_looted", parentKey: "raid_stats", label: "Gold Looted", sortable: true, filterable: false }
        ]}
];

// add IDs dynamically
const columns = rawColumns.map(group => ({
    ...group,
    children: group.children.map(col => ({
        ...col,
        id: generateColumnId(col.key, col.parentKey)
    }))
}));


function SummaryTable({ data }) {
    const [displayData, setDisplayData] = useState(data)
    const [sortConfig, setSortConfig] = useState({key: null, parentKey: null, direction: null})
    // const [activeFilter, setActiveFilter] = useState(null); // stores { key, parentKey, options }
    const [openFilter, setOpenFilter] = useState(null)
    const [activeFilters, setActiveFilters] = useState({})
    console.log("activeFilters:", activeFilters);

    function getValue(item, key, parentKey = null) {
        return parentKey ? item[parentKey]?.[key] : item[key];
    }

    useEffect(() => {
        let processed = [...data];

        // 1. Apply filters
        Object.entries(activeFilters).forEach(([filterId, filter]) => {
            const selectedOptions = Object.entries(filter.options)
                .filter(([_, isSelected]) => isSelected)
                .map(([option]) => option);

            if (selectedOptions.length > 0) {
                processed = processed.filter(row => {
                    const value = getValue(row, filter.key, filter.parentKey);
                    return selectedOptions.includes(value);
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
                                    const filterKey = column.parentKey ? `${column.parentKey}-${column.key}` : column.key;
                                    // Ensure the filter exists in activeFilters
                                    if (!activeFilters[filterKey]) {
                                        const optionsArr = [...new Set(displayData.map(row => getValue(row, column.key, column.parentKey)))];
                                        const options = {};
                                        optionsArr.forEach(option => options[option] = false);
                                        setActiveFilters(prev => ({ ...prev, [column.id]: {options, key: column.key, parentKey: column.parentKey || null }}));
                                    }
                                    setOpenFilter(column.id); // only store the filterKey
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

export default SummaryTable