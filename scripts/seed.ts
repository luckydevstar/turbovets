#!/usr/bin/env ts-node

/**
 * Seed script for TurboVets Secure Tasks
 * Creates sample organizations, departments, users, and tasks
 */

interface Organization {
  id: string;
  name: string;
  parentId?: string;
  level: number;
}

interface Department {
  id: string;
  name: string;
  organizationId: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
  organizationId: string;
  departmentId?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  completed: boolean;
  organizationId: string;
  departmentId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const organizations: Organization[] = [
  {
    id: 'org1',
    name: 'TurboVets Corporation',
    level: 0
  },
  {
    id: 'org2',
    name: 'External Partner',
    level: 0
  },
  {
    id: 'org1-sub1',
    name: 'Engineering Division',
    parentId: 'org1',
    level: 1
  }
];

const departments: Department[] = [
  {
    id: 'dept1',
    name: 'Engineering',
    organizationId: 'org1'
  },
  {
    id: 'dept2',
    name: 'Product Management',
    organizationId: 'org1'
  },
  {
    id: 'dept3',
    name: 'External Operations',
    organizationId: 'org2'
  }
];

const users: User[] = [
  {
    id: '1',
    email: 'admin@test.com',
    password: 'password',
    role: 'admin',
    organizationId: 'org1',
    departmentId: 'dept1'
  },
  {
    id: '2',
    email: 'manager@test.com',
    password: 'password',
    role: 'manager',
    organizationId: 'org1',
    departmentId: 'dept1'
  },
  {
    id: '3',
    email: 'user@test.com',
    password: 'password',
    role: 'user',
    organizationId: 'org1',
    departmentId: 'dept2'
  },
  {
    id: '4',
    email: 'viewer@test.com',
    password: 'password',
    role: 'user',
    organizationId: 'org2',
    departmentId: 'dept3'
  }
];

const tasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive API documentation for the TurboVets task management system',
    assignedTo: '1',
    completed: false,
    organizationId: 'org1',
    departmentId: 'dept1',
    createdBy: '1',
    createdAt: new Date('2025-09-18T10:00:00Z'),
    updatedAt: new Date('2025-09-18T10:00:00Z')
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull request #123 for authentication improvements',
    assignedTo: '2',
    completed: true,
    organizationId: 'org1',
    departmentId: 'dept1',
    createdBy: '1',
    createdAt: new Date('2025-09-18T10:30:00Z'),
    updatedAt: new Date('2025-09-18T11:00:00Z')
  },
  {
    id: '3',
    title: 'Update user interface',
    description: 'Improve dashboard UI components and user experience',
    assignedTo: '3',
    completed: false,
    organizationId: 'org1',
    departmentId: 'dept2',
    createdBy: '2',
    createdAt: new Date('2025-09-18T11:30:00Z'),
    updatedAt: new Date('2025-09-18T11:30:00Z')
  },
  {
    id: '4',
    title: 'External collaboration task',
    description: 'Coordinate with external partner on integration requirements',
    assignedTo: '4',
    completed: false,
    organizationId: 'org2',
    departmentId: 'dept3',
    createdBy: '4',
    createdAt: new Date('2025-09-18T12:00:00Z'),
    updatedAt: new Date('2025-09-18T12:00:00Z')
  }
];

function printSeedData() {
  console.log('🌱 TurboVets Secure Tasks - Seed Data');
  console.log('=====================================\n');

  console.log('📊 Organizations:');
  organizations.forEach(org => {
    console.log(`  - ${org.name} (${org.id}) - Level ${org.level}`);
  });

  console.log('\n🏢 Departments:');
  departments.forEach(dept => {
    console.log(`  - ${dept.name} (${dept.id}) - Org: ${dept.organizationId}`);
  });

  console.log('\n👥 Users:');
  users.forEach(user => {
    console.log(`  - ${user.email} (${user.role}) - Org: ${user.organizationId}, Dept: ${user.departmentId || 'N/A'}`);
  });

  console.log('\n📋 Tasks:');
  tasks.forEach(task => {
    console.log(`  - ${task.title} - Assigned to: ${task.assignedTo}, Org: ${task.organizationId}`);
  });

  console.log('\n🔑 Demo Accounts:');
  console.log('  Admin:    admin@test.com / password');
  console.log('  Manager:  manager@test.com / password');
  console.log('  User:     user@test.com / password');
  console.log('  Viewer:   viewer@test.com / password (different org)');

  console.log('\n✅ Seed data ready for testing RBAC scenarios!');
}

if (require.main === module) {
  printSeedData();
}

export { organizations, departments, users, tasks };




