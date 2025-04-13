import {useState} from 'react'

function useFormInput() {
    const [value, setValue] = useState('')

    function handleChange(e) {
        setValue(e.target.value);
    }

    const inputProps = {
        value: value,
        onChange: handleChange
    };

    return inputProps;
}

export default useFormInput
