<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">About</router-link>
    </div> -->
    
    <router-view/>
  </div>
</template>

<style>
*{
  margin: 0;
  padding: 0;
}
body,html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
