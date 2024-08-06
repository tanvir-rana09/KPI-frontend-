interface FormFieldOption {
    value: string;
    label: string;
}

export interface FormField {
    name: string;
    label: string;
    type: string;
    autoComplete: string;
    placeholder?: string;
    validation?: Record<string, any>;
    options?: FormFieldOption[];
}
