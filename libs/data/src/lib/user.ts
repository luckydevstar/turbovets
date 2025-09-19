export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  organizationId: string;
  departmentId?: string;
}

export interface Organization {
  id: string;
  name: string;
  parentId?: string;
  level: number;
}

export interface Department {
  id: string;
  name: string;
  organizationId: string;
}
