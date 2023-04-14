export interface IUserLogin{
  userEmail: string;
  userPassword: string;
}

export interface IUserRegister{
  userFullname: string;
  userAddress: string;
  userEmail: string;
  userPassword: string;
  confirmPassword: string;
  userIsAdmin: boolean;

}
