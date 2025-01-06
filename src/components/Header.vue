<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useStore } from '../store';

const route = useRoute();
const store = useStore();

const current = computed(() => route.path);
const movieRoute = computed(() => route.name === "movie" || route.path.startsWith('/movies/'));

const currentUserFirstName = computed(() => {
    const userAccount = store.accounts.get(store.currentUserEmail);
    return userAccount ? userAccount.firstName : '';
});

function logout() {
    store.currentUserEmail = "";
    store.cart.clear();
}

</script>

<template>
    <div class="topnav">
        <RouterLink v-if="store.currentUserEmail === ''" to="/"><img id="logo" src="../assets/better netflix.png"></RouterLink>
        <RouterLink v-if="store.currentUserEmail != ''" to="/movies"><img id="logo" src="../assets/better netflix.png"></RouterLink>
        <RouterLink v-if="current === '/register' || current === '/'" to="/login" class="right">Sign In</RouterLink>
        <RouterLink v-if="current === '/login' || current === '/'" to="/register" class="right">Register</RouterLink>
        <RouterLink v-if="movieRoute || current === '/settings' || current === '/movies'" to="/cart" class="right">Cart</RouterLink>
        <RouterLink v-if="movieRoute || current === '/cart' || current === '/movies'" to="/settings" class="right">Settings</RouterLink>
        <RouterLink v-if="movieRoute || current === '/settings' || current === '/cart' || current === '/movies'" @click.prevent="logout" to="/" class="right">Logout</RouterLink>
        <h5 v-if="store.currentUserEmail != ''"> Welcome, {{ currentUserFirstName }}! </h5>
    </div>
</template>

<style scoped></style>

