<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { useStore } from '../store';
import { auth } from '../firebase';

const route = useRoute();
const router = useRouter();
const store = useStore();
let currentUserEmail = store.user?.email || '';

const current = computed(() => route.path);
const movieRoute = computed(() => route.name === "movie" || route.path.startsWith('/movies/'));

const currentUserFirstName = computed(() => {
    const userAccount = currentUserEmail;
    const fullName = store.user.displayName.split(" ")
    return userAccount ? fullName[0] : '';
});

const logout = () => {
    store.user = null;
    signOut(auth);
    router.push(`/`);
}

</script>

<template>
    <div class="topnav">
        <RouterLink v-if="currentUserEmail === ''" to="/"><img id="logo" src="../assets/better netflix.png">
        </RouterLink>
        <RouterLink v-if="currentUserEmail != ''" to="/movies"><img id="logo" src="../assets/better netflix.png">
        </RouterLink>
        <RouterLink v-if="current === '/register' || current === '/'" to="/login" class="right">Sign In</RouterLink>
        <RouterLink v-if="current === '/login' || current === '/'" to="/register" class="right">Register</RouterLink>
        <RouterLink v-if="movieRoute || current === '/settings' || current === '/movies'" to="/cart" class="right">Cart
        </RouterLink>
        <RouterLink v-if="movieRoute || current === '/cart' || current === '/movies'" to="/settings" class="right">
            Settings</RouterLink>
        <RouterLink v-if="movieRoute || current === '/settings' || current === '/cart' || current === '/movies'"
            @click.prevent="logout" to="/" class="right">Logout</RouterLink>
        <h5 v-if="currentUserEmail != ''"> Welcome, {{ currentUserFirstName }}! </h5>
    </div>
</template>

<style scoped></style>
