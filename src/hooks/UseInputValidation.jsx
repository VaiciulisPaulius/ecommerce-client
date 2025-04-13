import {useState} from 'react';

const useInputValidation = (initialValue, rules) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(null);

    const validate = (val) => {
        for (let rule of rules) {
            const errorMessage = rule(val);
            if (errorMessage) {
                setError(errorMessage);
                return false;
            }
        }
        setError(null);
        return true;
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        validate(newValue);
    };

    return {
        value,
        error,
        onChange: handleChange,
        validate: () => validate(value),
        reset: () => {
            setValue(initialValue);
            setError(null);
        },
    };
};

export default useInputValidation;
