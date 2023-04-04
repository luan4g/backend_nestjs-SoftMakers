export interface IUserCreate {
  name: string;
  email: string;
  imagem: string;
  pass: string;
}

export interface IUserUpdate {
  name?: string;
  imagem?: string;
}