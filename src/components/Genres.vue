<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store";

const props = defineProps(["genres"]);
const route = useRoute();
const router = useRouter();
const selectedGenre = ref(28);
const response = ref(null);
const store = useStore();

async function getMovieByGenre() {
    response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
    router.push(`/movies/${id}`)
}

function addToCart(movie, title, url) {
    if (store.cart.has(String(movie)) || store.cart.has(movie)) {
        return;
    }
    else {
        store.cart.set(movie, { title: title, url: url })
        localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
    }
}

onMounted(async () => {
    response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
    const storedCart = localStorage.getItem(`cart_${store.user.email}`);
    if (storedCart) {
        store.cart = new Map(Object.entries(JSON.parse(storedCart)));
    }

});
</script>

<template>
    <div class="movie-gallery">
        <select v-model="selectedGenre" @change="getMovieByGenre()">
            <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
        </select>
        <div v-if="response" class="movie-list">
            <div v-for="movie in response.data.results" :key="movie.id" class="movie-card"
                @click="getMovieDetails(movie.id)">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster"
                    class="movie-poster" />
                <p class="movie-title">{{ movie.title }}</p>
                <button class="btn btn-success"
                    @click.stop="addToCart(movie.id, { title: movie.title, url: movie.poster_path })">
                    {{ store.cart.has(String(movie.id)) || store.cart.has(movie.id) ? "In Cart" : "Buy" }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-gallery {
    padding: 100px;
    color: white;
    background-color: #141414;
}

.movie-gallery h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2.5rem;
}

.movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.movie-card {
    background-color: #222;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.2s;
    width: 200px;
}

.movie-card:hover {
    transform: scale(1.05);
}

.movie-poster {
    width: 100%;
    height: auto;
}

.movie-title {
    padding: 10px;
    text-align: center;
    font-size: 1.1rem;
    color: #69d8ff;
}

.movie-title:hover {
    color: #428eaa;
}

select {
    background-color: #333;
    color: white;
    padding: 10px;
    border: 2px solid #444;
    border-radius: 5px;
    font-size: 1rem;
    width: 200px;
    margin: 10px 0;
}

select:focus {
    border-color: #69d8ff;
    outline: none;
}
</style>