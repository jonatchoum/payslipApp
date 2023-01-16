export type User = {
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

export type Societe = {
  societe: string;
};

export type TBulletin = {
  id: number;
  user_id: number;
  filename: string;
  date: string;
};
