export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    userType: string;
    createdAt: Date;
  
    constructor(
      id: number,
      name: string,
      email: string,
      password: string,
      userType: string,
      createdAt: Date
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.userType = userType;
      this.createdAt = createdAt;
    }
  }
  