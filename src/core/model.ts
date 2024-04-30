import { Role } from "./roles";

export interface serializedAccount {
  id: Number;
  email: string;
  password: string;
  role: Role;
  companyId: Number;
}
