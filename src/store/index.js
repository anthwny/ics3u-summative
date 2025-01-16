import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
    const currentUserEmail = ref("");
    const cart = ref(new Map());
    
/*
    const accounts = ref(new Map());
    const firstName = ref("");
    const lastName = ref("");

    const addAccount = (email, details) => {
        accounts.value.set(email, details);
    }

    const addToCart = (id, movieData) => {
        cart.value.set(id, movieData);
    }

    const removeFromCart = (id) => {
        cart.value.delete(id);
    }

    const updateNames = (newFirstName, newLastName) => {
        firstName.value = newFirstName;
        lastName.value = newLastName;
    };
*/
    return { currentUserEmail, cart };
});

export const userAuthorized = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, currentUserEmail => {
      try {
        const store = useStore();
        store.currentUserEmail = currentUserEmail;
        const storedCart = localStorage.getItem(`cart_${store.currentUserEmail}`);
  
        store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
        resolve();
      } catch (error) {
        reject();
      }
    })
  })