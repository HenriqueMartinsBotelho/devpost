<template>
  <header id="header">
     <router-link to="/" exact>SujeitoPost</router-link>
     <div>
         <router-link tag="button" to="/dashboard" exact>Dashboard</router-link>
     </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
  #header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    background-color: #202225;
    box-shadow: 0 0 10px rgba(0,0,0, 0.2);
  }

  #header a{
    text-decoration: none;
    font-size: 30px;
    color: #FFF;
    cursor: pointer;
    font-weight: bold;
  }

  button{
    cursor: pointer;
    border:0;
    color: #FFF;
    background: transparent;
    padding: 5px 15px;
    outline: none;
    border-radius: 5px;
    font-weight: bold;
  }
</style>