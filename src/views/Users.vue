    <template>
  <div class="user-list">
    <h1>Users</h1>
    <button type="button" class="btn-outline-success" @click="$router.push({ name: 'AddUser' })">Add New User</button>
    <user-list :users="users" />
  </div>
</template>

    <script>
import UserList from "@/components/UserList.vue";
import { UserDataAccess as da } from "@/api";


export default {
  inject:["GStore"],
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
    };
  },
    mounted(){
        //if(this.GStore.currentUser?.roleName == "Admin"){
        if(this.GStore.currentUser?.roleId == 2){
            da.getAllUsers()
            .then(response => {
                console.log(response.data);
                this.users = response.data
            })
            .catch(error => console.log(error));
        }else{
            this.$router.push({name:"Login"});
        }
    }
};
</script>
