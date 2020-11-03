<template>
  <div id="perfil">

    <div class="postarea loading" v-if="loading">
        <h2>Buscando posts...</h2>
    </div>
    
    <div v-else>
        <div class="headerPerfil">
            <h2>Olá {{this.nome}}</h2>
            <span>Já fez <strong>{{this.posts.length}}</strong> posts</span>
        </div>  

        <div class="postarea">
            <article class="post" v-for="post in posts" :key="post.id">
                <h1>{{post.autor}}</h1>
                <p>
                    {{post.content | postLength}}
                </p>

                <div class="action-post">
                    <button @click="togglePostModal(post)">Veja post completo</button>
                </div>
            </article>  
        </div>
    </div>

    <Modal 
        v-if="showPostModal" 
        :post="fullPost" 
        @close="togglePostModal()">
    </Modal>
  

  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';  
import Modal from '../components/Modal';
export default {
    name: 'Perfil',
    props: ['userid'],
    components:{
        Modal,
    },
    data(){
        return{
            loading: true,
            showPostModal: false,
            fullPost:{},
            posts: [],
            user:{},
            nome: '',
   
        }
    },
    async created(){
     const user = await localStorage.getItem('sujeito');
     this.user = JSON.parse(user);

     console.log(this.userid);

    await firebase.firestore().collection('posts')
    .where('userId', '==', this.userid)
    .orderBy('created', 'desc') // Posts mais novos primeiro
    .onSnapshot((snapshot) => {
        this.posts = [];

        snapshot.forEach( doc => {
            this.posts.push({
                id: doc.id,
                autor: doc.data().autor,
                content: doc.data().content,
                likes: doc.data().likes,
                created: doc.data().created,
                userId: doc.data().userId
            });
        })

        this.nome = this.posts[0].autor;

    });

    
      this.loading = false;

    },
    methods:{
        togglePostModal(post) {
            this.showPostModal = !this.showPostModal;

            // if opening modal set selectedPost, else clear
            if (this.showPostModal) {
                this.fullPost = post
            } else {
                this.fullPost = {}
            }
        },
    },
    filters:{
      postLength(val){
        //Se o conteudo do post tiver mais que 200 caracteres colocar ...
        if (val.length < 200) { 
            return val 
        }
        return `${val.substring(0, 200)}...`
      }
  }
}
</script>

<style scoped>
    #perfil{
        display: flex;
        flex-direction: column;
        margin: 25px;
    }

    @import './home.css';
</style>