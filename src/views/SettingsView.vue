<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { ref, onMounted } from 'vue';

const router = useRouter();
const store = useStore();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
let user = auth.currentUser;

onMounted(() => {
  const fullName = store.user.displayName.split(" ")
  firstName.value = fullName[0] || '';
  lastName.value = fullName[1] || '';
  email.value = store.user.email || '';
});

function checkSignInMethod() {
  const user = auth.currentUser;

  if (user) {
    const providers = user.providerData;

    providers.forEach((provider) => {
      if (provider.providerId === "password") {
        console.log("User signed in with email/password.");
      } else if (provider.providerId === "google.com") {
        alert("You are signed in through Google. You will be redirected back to the movies page.");
        router.push("/movies");
      }
    });
  } else {
    console.error("No user is signed in.");
  }
}

function saveChanges() {
  updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
  alert('Changes saved');
}

checkSignInMethod()
</script>

<template>
  <div class="layout">
    <Header />
    <div class="settings-container">
      <div class="settings-input">
        <h2>Settings</h2>
        <div>
          <h4>First Name</h4>
          <input v-model="firstName" type="text" class="input-field" required />
        </div>
        <div>
          <h4>Last Name</h4>
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required />
        </div>
        <div>
          <h4>Email</h4>
          <input v-model="email" type="email" placeholder="Email" class="input-field-email" disabled />
        </div>
        <button class="btn btn-primary" @click="saveChanges">Save Changes</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}

.settings-container {
  margin-top: 100px;
  text-align: center;
}

.settings-input {
  text-align: center;
}

.input-field {
  padding: 15px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

.input-field-email {
  padding: 15px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
  color: #ccc
}

.input-field:focus {
  border-color: #69d8ff;
  outline: none;
}
</style>