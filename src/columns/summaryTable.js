import { addIds } from "../utilities/columns.js";

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

const columns =  addIds(rawColumns)

export default columns