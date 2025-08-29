import { addIds } from "../utilities/columns.js";

const rawColumns = [
    { label: "General Info", children: [
            { key: "name", label: "Name", sortable: true, filterable: false },
        ]}
]

function getColumns(dates) {
    let columns = [...rawColumns]
    // Only try to iterate if dates exists and is iterable
    if (dates && Array.isArray(dates)) {
        for (let date of dates) {
            columns.push({
                label: date,
                children: [
                    { key: "attacks", parentKey: date, label: "Attacks", sortable: true, filterable: false },
                    { key: "gold_looted", parentKey: date, label: "Gold Looted", sortable: true, filterable: false },
                ]
            })
        }
    }
    return addIds(columns)
}


export default getColumns