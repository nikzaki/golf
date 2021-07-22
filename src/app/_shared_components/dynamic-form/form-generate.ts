import { FormControl, FormGroup, Validators } from "@angular/forms";
import { template_ref } from "./fields";

export const generateForm = (fields) => {
    let group = {};
    fields.forEach((field) => {
        let f = template_ref[field];

        let validations = [];
        if (f.required == true) {
            validations.push(Validators.required);
        }
        if (f.emailRequired == true) {
            validations.push(Validators.email);
        }

        if (f.pattern) {
            validations.push(Validators.pattern(f.pattern));
        }

        group[field] = [f.defaultValue || "", validations];
    });
    return group;
};
