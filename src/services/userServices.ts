import { httpClient as client } from "@/api/httpClient";
import type { User } from "@/types";

export const userService = {
  // getAll: (companyId: string) =>
  //   client.get<User[]>("/users", { params: { companyId } }),

  getCurrentUser: (): Promise<User> => client.get("auth/me"),

  // updateUserData: (
  //   data: Partial<Pick<User, "first_name" | "last_name" | "email">>,
  // ): Promise<User> => client.patch("/users/me/", data),

  // update: (userId: string, data: Partial<User>): Promise<User> =>
  //   client.patch(`/users/${userId}`, data),

  // changePassword: (data: { oldPassword: string; newPassword: string }) =>
  //   client.patch("/users/me/password", data),

  // changeEmail: (data: { password: string; newEmail: string }) =>
  //   client.patch("/users/me/email", data),

  // getByEmail: (email: string) =>
  //   client.get<User>("/users/by-email", { params: { email } }),
};
