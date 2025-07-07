export enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER',
}

function isAdmin(role: UserRole) {
  return role === UserRole.Admin;
}