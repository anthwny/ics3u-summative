<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';

const response = ref(null);

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

onMounted(async () => {
    const movieData = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    response.value = movieData.data.results;
})
</script>

<template>
    <h1>
        Featured Movies
    </h1>
    <div class="flexbox-container">
        <div v-if="response" class="movie-list">
            <div v-for="movie in shuffleArray(response).slice(0, 5)" :key="movie.id" class="flexbox-item"
                @click="getMovieDetails(movie.id)">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />
                <p class="movie-title">{{ movie.title }}</p>
            </div>
        </div>
    </div>
    <div class="movie-gallery"> 
    </div>
</template>

<style scoped></style>