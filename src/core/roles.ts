export enum Role {
  ADMIN = "ADMIN", // 0
  SUPPLIER = "SUPPLIER", // 1
  CUSTOMER = "CUSTOMER", // 2
  NORIGHTS = "NORIGHTS", // 3 | nothing
}

export function getRoleByNumber(roleNumber: number): Role {
  switch (roleNumber) {
    case 0:
      return Role.ADMIN;
    case 1:
      return Role.SUPPLIER;
    case 2:
      return Role.CUSTOMER;
    default:
      return Role.NORIGHTS;
  }
}
