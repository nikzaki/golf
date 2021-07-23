const template_ref = {
    name: {
        label: "Name",
        controlType: "text",
        autofillOff: true,
        required: true,
    },
    contactPerson: {
        label: "Phone No.",
        controlType: "text",
        required: true,
        autofillOff: true,
        pattern: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
    },
    description: {
        controlType: "textarea",
        label: "Description",
    },
    website: {
        label: "Website URL",
        controlType: "text",
        autofillOff: true,
        pattern: "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
    },
    status: {
        label: "Status",
        controlType: "radio",
        defaultValue: "Active",
        options: ["Active", "Inactive"],
    },
    country: {
        label: "Country",
        controlType: "dropdown",
        required: true,
        defaultValue: "AFG",
    },
    image: {
        controlType: "fileUploader",
        // required: true,
    },
};

const segment = {
    sponsorForm: {
        fields: [
            "name",
            "contactPerson",
            "description",
            "website",
            "status",
            "country",
            "image",
        ],
    },
};

export { segment, template_ref };
