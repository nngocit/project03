import { ValidationRules } from 'aurelia-validation';
export class Banner {
    ID: number
    Img: string
    Status: string
    Note: string
    Position: number
    constructor(item?) {
        // if(item) this = item
    }
}
export const bannerValidationRules =
    ValidationRules
        .ensure((i: Banner) => i.Img).required()
        .ensure(i => i.Status).required()
        .rules
