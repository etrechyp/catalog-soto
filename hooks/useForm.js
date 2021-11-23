import { useState} from 'react'

const useForm = (initialValues) => {
    const [formValues, setFormValues] = useState(initialValues);

    return [
        formValues,
        (e) => {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            })
        }
    ];
}

export default useForm