import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';


function FilterModal({is_open, options, setOptions, onClose}) {
    const ref = useRef(null)
    const [currentOptions, setCurrentOptions] = useState(options)
    useEffect(() => {
        setCurrentOptions(options);
    }, [options]);
    useEffect(() => {
        if (is_open) {
            ref.current.showModal()
        } else {
            ref.current.close()
        }
    }, [is_open])
    function handleChange(e) {
        const { name, checked } = e.target;
        setCurrentOptions({
            ...currentOptions, [name]: checked
        });
    }
    function handleSubmit(e) {
        e.preventDefault()
        setOptions(currentOptions)
        onClose()
    }
    return (
        <dialog ref={ref}>
            <form onSubmit={handleSubmit}>
                {Object.entries(currentOptions).map(([option, isChecked]) => (
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


FilterModal.propTypes = {
    is_open: PropTypes.bool,
    options: PropTypes.objectOf(PropTypes.bool),
    setOptions: PropTypes.func,
    onClose: PropTypes.func,
}

export default FilterModal