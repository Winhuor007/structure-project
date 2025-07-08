export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  profile: {
    id: string;
    name: string;
    role: string;
  };
}

// src/features/auth/login/interface/index.ts

export interface LoginFormInput {
  email: string;
  password: string;
}


export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  username?:string;
  lastName?:string;
  firstName?:string;
}
export interface LoginFormData  {
  username: string;
  password: string;
};
