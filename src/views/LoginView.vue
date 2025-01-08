<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { RouterLink, useRouter } from 'vue-router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref } from 'vue';

const router = useRouter();
const password = ref('');

const loginByEmail = async () => {
  try {
    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    console.log(error);
    alert("There was an error signing in with email!");
  }
};

const loginByGoogle = async () => {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    alert("There was an error signing in with Google!");
  }
};
</script>

<template>
  <Header />
  <div class="hero">
    <div class="overlay">
      <div class="form-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="loginByEmail()">
          <div class="form-group">
            <input type="email" placeholder="Email" class="input-field" required />
          </div>
          <div class="form-group">
            <input v-model:="password" type="password" placeholder="Password" class="input-field" required />
          </div>
          <button type="submit" class="button login">Login</button>
          <button @click="loginByGoogle()" type="submit" class="button login">Login by Google</button>
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

.password-field {
  margin-top: 15px;
}

.login {
  background-color: #69d8ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.login:hover {
  background-color: #428eaa;
  transform: scale(1.05);
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
