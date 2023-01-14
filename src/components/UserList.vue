<template>
  <div class="user-list">
    <table class="table" border="1">
      <tr>
        <th scope="col">User</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Active</th>
        <th></th>
      </tr>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.firstName + " " + u.lastName }}</td>
        <td>{{ u.email }}</td>
        <td>{{ u.roleId }}</td>
        <td>{{ u.active }}</td>
        <td>
          <button type="button" class="btn btn-outline-primary" @click="editUser(u.id)">Edit</button>
          <button type="button" class="btn btn-outline-danger" @click="deleteUser(u.id)">Deactivate</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {UserDataAccess as da} from "@/api"
import {RoleDataAccess as rda} from "@/api"
export default {
  props: {
    users: {
      type: Array,
    },
    roles: []
  },
  methods: {
    editUser(id) {
      //alert("TODO: edit user: " + id);
      this.$router.push({ name: "UserDetails", params: { userId: id } });
    },
    deleteUser(id){
      if(confirm("Are you sure you want to deactivate this user?"))
      {
        da.deleteUser(id).then(() => {
          window.location.reload();
        });
      }
    },
    mounted(){
      rda.getAllRoles().then(resp => {
        this.roles = resp.data;
      });
    },
    getRoleName(roleId){
      for(let x = 0; x < this.roles.length; x++){
        if(roleId == this.roles[x].id){
          return this.roles[x].name;
        }
      }
    },

  },
};
</script>