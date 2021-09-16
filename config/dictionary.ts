const services = {
  //Repositories
  UserRepository: Symbol.for("UserRepository"),
  RoleRepository: Symbol.for("RoleRepository"),

  //Services
  UserService: Symbol.for("UserService"),
};

const roles = {
  admin: Symbol.for("ADMIN"),
  teacher: Symbol.for("TEACHER"),
  student: Symbol.for("STUDENT"),
};

export { services, roles };
