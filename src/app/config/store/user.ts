import type { IUserModel } from "@/widgets/Auth/model/IUserModel";
import { defineStore } from "pinia";

interface IUser {
  users: IUserModel[];
  user: IUserModel | null;
}

export const useUser = defineStore("user", {
  state: (): IUser => ({
    users: [],
    user: null,
  }),
  getters: {
    getUsers(): IUserModel[] {
      return this.users;
    },
    getUser(): IUserModel | null {
      return this.user;
    },
  },
  actions: {
    refreshUsers() {
      this.users = [];
      let avialableUsers = localStorage.getItem("users");
      this.users = avialableUsers !== null ? JSON.parse(avialableUsers) : [];
    },
    setUser(val: IUserModel) {
      this.user = val;
    },
    addUser(val: IUserModel, token: string) {
      //   this.users.push(val);
      localStorage.setItem(
        "users",
        JSON.stringify([
          ...this.users,
          {
            ...val,
            token,
          },
        ])
      );
    },
  },
});
