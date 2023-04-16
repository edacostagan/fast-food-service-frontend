export interface IUserLogin{
  userEmail: string;
  userPassword: string;
}

export interface IUserRegister{
  userFullname: string;
  userAddress: string;
  userEmail: string;
  userMobilePhone: string;
  userPassword: string;
  confirmPassword: string;
  userIsAdmin: boolean;

}

export interface IUserUpdate{
  userFullname: string;
  userAddress: string;
  userMobilePhone: string;
}
