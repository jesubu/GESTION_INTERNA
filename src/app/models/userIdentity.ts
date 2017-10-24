export class UserIdentity {
    constructor(  public grant_type:string,public username:string,
        public password:string,public scope:string){
            }
}
