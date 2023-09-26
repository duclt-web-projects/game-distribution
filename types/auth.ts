export interface IUser {
  id: string;
  email: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}

export interface IAuthResponse {
  access_token: string;
  message: string;
  type_token: string;
  user: IUser;
}
