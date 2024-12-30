export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  trips: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse extends Omit<IUser, 'password'> {}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginCredentials {
  name: string;
}