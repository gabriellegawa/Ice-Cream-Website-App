export class Role {
    userType: string
    permissions: string[]

    constructor(obj?:Role) {
        this.userType = obj?.userType ?? ''
        this.permissions = obj?.permissions ?? []
    }
}