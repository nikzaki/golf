export class UserModel {
    userId: string;
    userName: string;
    name: string;
    userType: string;
    admin: boolean;
    clubId: string;
    playerId: string;
    organizerId:string;
    caddieId: string;
    roles: Array<string>;
    email?: string;
    password?: string;
    emailSettings?: any;
    pic?: any;
}
