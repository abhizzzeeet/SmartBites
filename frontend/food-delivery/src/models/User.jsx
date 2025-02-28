class User {
  constructor(id, name, email, password, userType, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.createdAt = createdAt;
  }
}

export default User;
