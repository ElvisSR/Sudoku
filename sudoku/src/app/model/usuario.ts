export class Usuario{
    nick:string;
    email:string;
    pass:string;

    constructor(nick:string, email:string, pass:string){
        this.nick=nick;
        this.email=email;
        this.pass=pass;
    }
}