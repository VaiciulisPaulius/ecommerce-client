export const validationRules = {
    minLength: (min) => (value) => {
        return value.length < min ? `Must be at least ${min} characters` : null
    },
    required: (value) => (!value ? "This field is required" : null)
}