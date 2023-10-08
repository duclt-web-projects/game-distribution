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
  user: IUser;
  access_token: string;
  message: string;
}


export interface IAuthAdminResponse {
  admin: IUser;
  access_token: string;
  message: string;
}