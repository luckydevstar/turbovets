import { Role } from './roles';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  organizationId: string;
  departmentId?: string;
}
