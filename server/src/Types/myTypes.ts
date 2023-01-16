export type TUser = {
  id: number;
  username: string;
  hash_password: string;
  prenom: string;
  nom: string;
  role: string;
  email: string;
  societe: string;
  password: string; // for register only
  admin: boolean;
};

export type Service = {
  service: string;
};
