<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`);
</script>

<template>
    <div class="movie-detail">
        <h1 class="movie-title">{{ response.data.original_title }}</h1>
        <p class="movie-overview">{{ response.data.overview }}</p>
        <p class="movie-release-date">Release Date: {{ response.data.release_date }}</p>
        <p class="movie-rating">Rating: {{ Math.round(response.data.vote_average * 10) / 10 }}/10</p>
        <p class="movie-runtime">Length: {{ response.data.runtime }} minutes</p>
        <div>
            <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
                class="movie-poster" />
        </div>
        <a class="movie-site" :href="response.data.homepage" target="_blank">Official Movie Site</a>
        <h2 class="trailers-title">Trailers</h2>
        <div class="trailers-container">
            <div v-for="trailer in response.data.videos.results" :key="trailer.id" class="trailer-tile">
                <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
                    <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
                        class="trailer-thumbnail" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-detail {
    padding: 100px;
    color: white;
    background-color: #141414;
}

.movie-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #69d8ff;
}

.movie-overview {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.movie-runtime {
    font-size: 1rem;
    margin-bottom: 20px;
}

.movie-site {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #69d8ff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.movie-site:hover {
    background-color: #428eaa
}

.movie-poster {
    width: 20%;
    border-radius: 10px;
    margin-bottom: 20px;
}

.trailers-title {
    font-size: 2rem;
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
}

.trailers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.trailer-tile {
    background-color: #222;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.2s;
    width: 200px;
}

.trailer-tile:hover {
    transform: scale(1.05);
}

.trailer-thumbnail {
    width: 100%;
    height: auto;
}
</style>