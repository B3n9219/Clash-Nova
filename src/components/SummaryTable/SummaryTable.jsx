import {useEffect, useState} from "react";
import SortButton from "../SortButton/SortButton.jsx";

const columns = [
    {label: "General Info", children: [
            {key: "name", label: "Name", sortable: true, filterable: false},
            {key: "town_hall", label: "Town Hall", sortable: true, filterable: true},
            {key: "role", label: "Role", sortable: false, filterable: true},
            {key: "war_opted_in", label: "Wars?", sortable: false, filterable: true},
            {key: "average_donations", label: "Donations", sortable: true, filterable: false},
        ]},
    {label: "Clan Games", children: [
            {key: "average_medals", label: "Medals", sortable: true, filterable: false},
        ]},
    {label: "War", children: [
            {key: "attacks", parentKey: "war_stats", label: "Attacks", sortable: true, filterable: false},
            {key: "stars", parentKey: "war_stats", label: "Stars", sortable: true, filterable: false},
            {key: "destruction", parentKey: "war_stats", label: "Destruction", sortable: true, filterable: false},
        ]},
    {label: "Clan War League", children: [
            {key: "attacks", parentKey: "cwl_stats", label: "Attacks", sortable: true, filterable: false},
            {key: "stars", parentKey: "cwl_stats", label: "Stars", sortable: true, filterable: false},
            {key: "destruction", parentKey: "cwl_stats", label: "Destruction", sortable: true, filterable: false},
        ]},
    {label: "Raid Weekend", children: [
            {key: "attacks", parentKey: "raid_stats", label: "Attacks", sortable: true, filterable: false},
            {key: "gold_looted", parentKey: "raid_stats", label: "Gold Looted", sortable: true, filterable: false}
        ]}
]


function SummaryTable({ data }) {
    const [displayData, setDisplayData] = useState(data)
    const [sortConfig, setSortConfig] = useState({key: null, parentKey: null, direction: null})
    useEffect(() => {
        if (!sortConfig.key || !sortConfig.direction) {
            setDisplayData(data)
            return
        }
        const sorted = [...data.sort((a, b) => {
            const aVal = sortConfig.parentKey ? a[sortConfig.parentKey][sortConfig.key] : a[sortConfig.key];
            const bVal = sortConfig.parentKey ? b[sortConfig.parentKey][sortConfig.key] : b[sortConfig.key];
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortConfig.direction === "asc"? aVal - bVal: bVal - aVal
            }
            return sortConfig.direction === "asc"
            ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal))
        })]
        setDisplayData(sorted)
    }, [sortConfig])
    return (
        <table>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.label} colSpan={column.children.length}>{column.label}</th>
                    ))}
                </tr>
                <tr>{columns.map(parentColumn => (
                    parentColumn.children.map(column => (
                        <th key={`${parentColumn.label}-${column.key}`}>
                            {column.label}{column.sortable &&
                            <SortButton columnKey={column.key} parentKey={column.parentKey || null} config={sortConfig}
                                         setConfig={setSortConfig}/>}
                        </th>
                    ))
                ))}</tr>
            </thead>
            <tbody>
                {displayData.map(row => (
                    <tr key={row.tag}>
                        {columns.map(parentColumn => (
                        parentColumn.children.map(column => (
                            <td key={`${parentColumn.label}-${column.key}-${row.tag}`}>{column.parentKey? row[column.parentKey][column.key] : row[column.key]}</td>
                        ))
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SummaryTable