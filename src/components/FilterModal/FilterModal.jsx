import {forwardRef, useEffect, useRef} from "react";

function FilterModal({is_open, options, setFilters, filterId, onClose}) {
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
        setFilters((prev) => ({
            ...prev,
            [filterId]: {
                ...prev[filterId],
                options: {
                    ...(prev[filterId]?.options || {}),
                    [name]: checked,
                },
            },
        }));
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