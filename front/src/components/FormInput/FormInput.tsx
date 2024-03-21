
// This TypeScript file defines a React functional component, `FormInput`, that renders a labeled input field.
// It uses CSS modules for styling, indicated by the import of `style` from a local CSS module file. The component
// is designed to be reusable and customizable for different types of input fields such as email, password, and text.
// The `FormInputProps` interface specifies the expected props: `label`, `placeholder`, `name`, `type`, and `onChange`.
// The `label` prop defines the text label for the input field. The `placeholder` prop provides a placeholder text
// within the input field, with a default value of an empty string if not specified. The `name` prop is used both as
// the name attribute of the input element and the htmlFor attribute of the label, linking the label to the input.
// The `type` prop determines the input field type, restricted to 'email', 'password', or 'text'. The `onChange` prop
// is a function that handles changes to the input field, receiving the input's current value as its argument.
// The component returns a div containing a label and an input element, applying styling from the CSS module.

import React from 'react'
import style from './style.module.css'

interface FormInputProps {
  label: string
  placeholder?: string
  name: string
  type: 'email' | 'password' | 'text'
  onChange: (value: string) => void
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder = '',
  name,
  type,
  onChange,
}) => {
  return (
    <div className={style.formItem}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        name={name}
      />
    </div>
  )
}

export default FormInput
