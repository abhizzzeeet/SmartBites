// Password is intentionally absent — the backend AuthResponse never returns it
export class User {
    id: number;
    name: string;
    email: string;
    userType: string;
    createdAt?: Date;

    constructor(id: number, name: string, email: string, userType: string, createdAt?: Date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.userType = userType;
      this.createdAt = createdAt;
    }
  }
  