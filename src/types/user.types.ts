export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "USER" | "ADMIN";
  verified: false | true;
  adminKey?:string;
  createdAt: Date;
  updatedAt: Date;
}
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  adminKey?:string;
  verified: false | true;
}

export interface Profile {
  profile_id: string;
  bio?: string;
  photo?: Buffer;
  emailUpdates?: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name?: string;
}

export interface SafeProfile {
  profile_id: string;
  bio?: string;
  emailUpdates?: boolean;
  name?: string;
}

export interface UserWithProfile extends SafeUser {
  profile?: Profile;
}
