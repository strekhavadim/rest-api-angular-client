import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {

    constructor() {
    }

    getErrors(errors) {
        let errorMessages = [];
        Object.keys(errors).forEach(key => {
            let value = errors[key];
            value.forEach((item) => {
                errorMessages.push(item);
            });
        });
        return errorMessages;
    }
}
