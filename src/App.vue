<template>
  <div id="app">
    <nav>
      <ul>
      <router-link to="/">Home</router-link>
      <router-link to="/videos">Videos Diversos</router-link>
    </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>

nav{
  width: 100%;
  background: rgb(113,190,28);
  background: linear-gradient(90deg, rgba(113,190,28,1) 0%, rgba(255,201,0,1) 100%);
  margin: 0%
}

ul{
  display: flex;
  padding: 2rem;
  gap: 1rem;
  text-decoration: none;
  cursor: pointer !important;
}

a{
  text-decoration: none;
  color: blue;
}

</style>