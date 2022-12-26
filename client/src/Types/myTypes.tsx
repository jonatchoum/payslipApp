export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
  service: string;
  admin: boolean;
};

export type Service = {
  service: string;
};

export type TBulletin = {
  id: number;
  user_id: number;
  filename: string;
  date: string;
};
