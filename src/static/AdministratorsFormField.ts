import { FormField } from "./FormFieldType";


export const AdministratorsFormField: FormField[] = [
    {
        name: "name",
        label: "Full name",
        type: "text",
        autoComplete: "given-name",
        placeholder: "Enter full name",
        validation: { required: "This field is required" },
    },
    {
        name: "email",
        label: "Email address",
        type: "email",
        autoComplete: "email",
        placeholder: "Enter email",
        validation: { required: "This field is required" },
    },
    {
        name: "number",
        label: "Phone Number",
        type: "number",
        autoComplete: "number",
        placeholder: "Enter phone number",
        validation: {
            required: "This field is required",
            minLength: { value: 10, message: "Minimum number 10" },
        },
    },
    {
        name: "address",
        label: "Address",
        type: "text",
        autoComplete: "address",
        placeholder: "Enter address",
        validation: { required: "This field is required" },
    },
    {
        name: "pastInstitute",
        label: "Past Institute name",
        type: "text",
        autoComplete: "institute-name",
        placeholder: "Enter past institute name",
    },
    {
        name: "education",
        label: "Education",
        type: "text",
        autoComplete: "education",
        placeholder: "Enter education",
        validation: { required: "This field is required" },
    },
    {
        name: "department",
        label: "Department",
        type: "text",
        autoComplete: "department",
        placeholder: "Enter department",
        validation: { required: "This field is required" },
    },
    {
        name: "gender",
        label: "Gender",
        type: "select",
        autoComplete: "gender",
        options: [
            { value: "", label: "Select gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
        ],
        validation: { required: "This field is required" },
    },
    {
        name: "position",
        label: "Position",
        type: "text",
        autoComplete: "position",
        placeholder: "Enter position",
        validation: { required: "This field is required" },
    },
    {
        name: "shift",
        label: "Shift",
        type: "text",
        autoComplete: "shift",
        placeholder: "Enter shift",
        validation: { required: "This field is required" },
    },
    {
        name: "joiningDate",
        label: "Joining Date",
        type: "date",
        autoComplete: "joiningDate",
        placeholder: "Enter joining date",
        validation: { required: "This field is required" },
    },
];
