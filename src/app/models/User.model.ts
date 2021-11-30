export class User {
    uid?: string;
    displayName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    address?: string;
    admin?: boolean = false;
    photoURL?: string;
    constructor() {
    }
}