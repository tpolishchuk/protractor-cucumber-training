import { Customer } from "../models/customer";
import PropertiesReader from "properties-reader";

export class CustomerBuilder {

    private readonly projectPropsPath: string = 'resources/project.properties'
    private readonly customer: Customer

    constructor() {
        this.customer = new Customer()
    }

    setDefaultFirstName(): CustomerBuilder {
        let defaultFirstName = PropertiesReader(this.projectPropsPath).get('firstName')
        this.customer.firstName = String(defaultFirstName)
        return this
    }

    setDefaultLastName(): CustomerBuilder {
        let defaultLastName = PropertiesReader(this.projectPropsPath).get('lastName')
        this.customer.lastName = String(defaultLastName)
        return this
    }

    setDefaultPostCode(): CustomerBuilder {
        let defaultPostCode = PropertiesReader(this.projectPropsPath).get('postCode')
        this.customer.postCode = String(defaultPostCode)
        return this
    }

    build(): Customer {
        return this.customer
    }
}
