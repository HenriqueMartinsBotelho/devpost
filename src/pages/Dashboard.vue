<template>
  <div id="dashboard">
      <h2>Minha Conta</h2>
      <span>Atualize seu perfil</span>


      <form @submit.prevent="updatePerfil">
        <label for="name">Nome:</label>
        <input v-model.trim="nome" type="text" :placeholder="user.nome" id="name" />

        <button class="button">Atualizar Perfil</button>
      </form>

      <button class="button logout" @click="logOut">Deslogar</button>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';
export default {
  name:'Dashboard',
  data() {
    return {
      user: {},
      nome:'',
      title: '',
      showSuccess: false
    }
  },
  created(){
    const user = localStorage.getItem('sujeito');
    this.user = JSON.parse(user);
  },
  methods:{
    async updatePerfil() {
      if(this.nome === ''){
        return;
      }

      await firebase.firestore().collection('users')
      .doc(this.user.uid).update({
        nome: this.nome
      })

      // Atualizando todos os posts do usuario
      const postDocs = await firebase.firestore().collection('posts')
      .where('userId', '==', this.user.uid).get()

      
      //percorrendo todos posts para achar todos e mudar o nome dentro
      postDocs.forEach(async doc => {
        await firebase.firestore().collection('posts').doc(doc.id).update({
          autor: this.nome
        })
      })

      //Atualizar nosso localStorege
      localStorage.setItem('sujeito', JSON.stringify({uid: this.user.uid, nome: this.nome}));


      alert('Perfil atualizado :)');
    },
    async logOut(){

      const confirm = window.confirm('Você realmente deseja sair?');

      if(confirm){
        await firebase.auth().signOut()
        .then(async ()=>{
          await localStorage.removeItem('sujeito');
          this.$router.push('/login');
        })
      }else{
        return;
      }

    }
  }
}
</script>

<style scoped>
#dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding: 15px 20px;
  width: 500px;
  max-width: 600px;
  background: #4C5059;
  box-shadow: 0 0 10px rgba(0,0,0, 0.2);
}

h2{
  color:#FFF;
}

span{
  color:#FFF;
  margin-bottom: 25px;
}

form{
  width: 500px;
  display: flex;
  flex-direction: column;
}

form label{
  margin-right: 5px;
  font-size: 18px;
  color: #FFF;
  padding-bottom: 5px
}
form input{
  height: 30px;
  padding: 5px;
  font-size: 17px;
  margin-right: 5px;
  margin-bottom: 0px;
  background: #FAFAFA;
  border:0;
  outline: none;
}

button{
  cursor: pointer;
  margin-top:15px;
  height: 35px;
  border:0;
  background: #7289DA;
  color: #FFF;
  font-size: 16px;
}

button.logout{
  width: 500px;
  background: #E36D6D;
  color: #FFF;
  font-size: 16px;
}

::placeholder{
  opacity:1;
  color: #424242;
}


</style>