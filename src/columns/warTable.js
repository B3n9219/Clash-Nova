import { addIds } from "../utilities/columns.js";

const rawColumns = [
    { label: "General Info", children: [
        { key: "name", label: "Name", sortable: true, filterable: false },
    ]}
]


const children = [
        { key: "attacks", parentKey: "war_stats", label: "Attacks", sortable: true, filterable: false },
        { key: "stars", parentKey: "war_stats", label: "Stars", sortable: true, filterable: false },
        { key: "destruction", parentKey: "war_stats", label: "Destruction", sortable: true, filterable: false },
    ]

function getColumns(dates) {
    let columns = [...rawColumns]
    // Only try to iterate if dates exists and is iterable
    if (dates && Array.isArray(dates)) {
        for (let date of dates) {
            columns.push({
                label: date,
                children: [
                    {key: "attacks", parentKey: date, label: "Attacks", sortable: true, filterable: false},
                    {key: "stars", parentKey: date, label: "Stars", sortable: true, filterable: false},
                    {key: "destruction", parentKey: date, label: "Destruction", sortable: true, filterable: false}
                ]
            })
        }
    }

    return addIds(columns)
}


export default getColumns