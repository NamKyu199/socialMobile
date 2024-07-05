export class LoginResponseModel {
    constructor (userId, message, role) {
        this.userId = userId;
        this.message = message;
        this.role = role;
    }
}