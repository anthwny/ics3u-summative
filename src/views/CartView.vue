<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useStore } from '../store';

const store = useStore();
</script>

<template>
  <Header />
  <div class="cart">
        <h1>Shopping Cart</h1>
        <div class="item" v-for="([key, value]) in store.cart">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
            <h1>{{ value.title }}</h1>
            <button @click="store.cart.delete(key)">Remove</button>
        </div>
    </div>
  <Footer />
</template>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  gap: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #69d8ff;
  text-align: center;
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
  width: 80%;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.item:hover {
  transform: scale(1.05);
  background-color: #111;
}

.item img {
  width: 100px;
  height: auto;
  border-radius: 5px;
}

.item h1 {
  font-size: 1.2rem;
  color: #fff;
  flex-grow: 1;
  padding: 0 15px;
}

button {
  background-color: #69d8ff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #428eaa;
}
</style>


