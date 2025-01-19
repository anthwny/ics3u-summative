<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from "../store";
import { ref } from 'vue';

const router = useRouter();
const store = useStore();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');

async function registerByEmail() {
  try {
    const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error creating a user with email!");
  }
}

async function registerByGoogle() {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error creating a user with Google!");
  }
}

const checkPasswords = () => {
  if (password.value === confirm.value) {
    registerByEmail();
  }
  else {
    alert("Your passwords do not match");
  }
};
</script>

<template>
  <Header />
  <div class="hero">
    <div class="overlay">
      <div class="form-container">
        <h2>Create an Account</h2>
        <form @submit.prevent="checkPasswords">
          <div class="form-group">
            <input v-model:="firstName" type="text" placeholder="First Name" class="input-field" required>
          </div>
          <div class="form-group">
            <input v-model:="lastName" type="text" placeholder="Last Name" class="input-field" required>
          </div>
          <div class="form-group">
            <input v-model:="email" type="email" placeholder="Email" class="input-field" required>
          </div>
          <div class="form-group">
            <input v-model:="password" type="password" placeholder="Password" class="input-field" required>
          </div>
          <div class="form-group">
            <input v-model:="confirm" type="password" placeholder="Confirm Password" class="input-field" required>
          </div>
          <div class="form-group">
            <button type="submit" class="button register">Register</button>
            <button @click="registerByGoogle()" class="button register">Register by Google</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
}

.form-container {
  text-align: center;
  margin-top: 50px;
}

.form-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.input-field {
  padding: 15px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #69d8ff;
  outline: none;
}

.register {
  background-color: #69d8ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.register:hover {
  background-color: #428eaa;
  transform: scale(1.05);
}

button {
  margin-left: 10px;
}

@media (max-width: 600px) {
  .input-field {
    width: 90%;
  }

  .navbar h1 {
    font-size: 1.5rem;
  }
}
</style>