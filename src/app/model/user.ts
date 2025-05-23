export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  enabled: boolean;
  authorities: { authority: string }[];
}