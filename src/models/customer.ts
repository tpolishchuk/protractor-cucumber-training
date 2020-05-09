export class Customer {

    public firstName: string
    public lastName: string
    public postCode: string
    public currency: string;
    public accountNumber: string;

    public getFullName(): string {
        return this.firstName + " " + this.lastName
    }
}
