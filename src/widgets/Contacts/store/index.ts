import { defineStore } from "pinia";
import type { IContact } from "../model";

interface IContactStore {
  contacts: IContact[];
}

export const useContactStore = defineStore("contacts", {
  state: (): IContactStore => ({
    contacts: [],
  }),
  getters: {
    getContacts(): IContact[] {
      return this.contacts;
    },
  },
  actions: {
    refreshContacts() {
      this.contacts = [];
      let localContacts = localStorage.getItem("contacts");
      this.contacts = localContacts !== null ? JSON.parse(localContacts) : [];
    },
    updateContact(id: number, newValue: IContact) {
      this.contacts.forEach((el, index) => {
        if (el.id === id) {
          this.contacts.splice(index, 1);
          el = newValue;
          this.contacts.push(newValue);

          localStorage.setItem("contacts", JSON.stringify(this.contacts));
        }
      });
    },
    addContact(value: IContact) {
      localStorage.setItem(
        "contacts",
        JSON.stringify([...this.contacts, value])
      );
    },
    deleteContact(id: number) {
      this.contacts.forEach((el, index) => {
        if (el.id === id) {
          this.contacts.splice(index, 1);
          localStorage.setItem("contacts", JSON.stringify(this.contacts));
          this.refreshContacts()
        }
      });
    },
  },
});
