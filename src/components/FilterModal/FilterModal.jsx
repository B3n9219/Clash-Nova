import {forwardRef, useEffect, useRef} from "react";

function FilterModal({is_open, options, setFilters, filterKey, onClose}) {
    const ref = useRef(null)
    console.log("FilterModal options:", options);
    useEffect(() => {
        if (is_open) {
            ref.current.showModal()
        } else {
            ref.current.close()
        }
    }, [is_open])
    function handleChange(e) {
        const { name, checked } = e.target;
        setFilters((prev) => {
            console.log("Prev filters:", prev);
            return {
                ...prev,
                [filterKey]: {
                    ...prev[filterKey],
                    options: {
                        ...(prev[filterKey]?.options || {}),
                        [name]: checked,
                    },
                },
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        onClose()
    }
    return (
        <dialog ref={ref}>
            <form method="dialog" onSubmit={handleSubmit}>
                {Object.entries(options).map(([option, isChecked]) => (
                    <div key={option}>
                        <input
                            id={option}
                            type="checkbox"
                            name={option}
                            checked={isChecked}
                            onChange={handleChange}
                        />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
                <button type="submit">Filter</button>
            </form>
        </dialog>
    );
}

export default FilterModal