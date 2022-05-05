export interface IFormData {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    county?: string;
}

export type SessionProps = {
  id: string
  name: string
  email: string
  isAdmin: boolean
  role: string
}