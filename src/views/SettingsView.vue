<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { ref, computed, onMounted } from 'vue';

const store = useStore();

const currentUserDetails = computed(() => {
  return store.accounts.get(store.currentUserEmail) || {};
});

const firstName = ref('');
const lastName = ref('');
const email = ref('');

onMounted(() => {
  firstName.value = currentUserDetails.value.firstName || '';
  lastName.value = currentUserDetails.value.lastName || '';
  email.value = store.currentUserEmail || '';
});

function saveChanges() {
  const userAccount = store.accounts.get(store.currentUserEmail);

  if (userAccount) {
    userAccount.firstName = firstName.value;
    userAccount.lastName = lastName.value;

    store.accounts.set(store.currentUserEmail, userAccount);

    alert('Changes saved');
  }
}
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
  color:#ccc
}

.input-field:focus {
  border-color: #69d8ff;
  outline: none;
}
</style>