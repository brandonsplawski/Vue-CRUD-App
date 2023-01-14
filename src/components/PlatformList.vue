<template>
  <div class="platform-list">
    <table class="table" border="1">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Link</th>
        <th></th>
      </tr>
      <tr v-for="p in platforms" :key="p.platformId">
        <td>{{ p.platformName }}</td>
        <td>{{ p.platformType}}</td>
        <td>{{ p.platformLink}}</td>
        <td>
          <button type="button" class="btn-outline-primary" @click="editPlatform(p.platformId)">Edit</button>
          <button type="button" class="btn-outline-danger" @click="deletePlatform(p.platformId)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {PlatformDataAccess as da} from "@/api"
export default {
  props: {
    platforms: {
      type: Array,
    },
  },
  methods: {
    editPlatform(id) {
      this.$router.push({ name: "PlatformDetails", params: { platformId: id } });
    },    
    deletePlatform(id){
      if(confirm("Are you sure you want to delete?"))
      {
        da.deletePlatform(id).then(() => {
          window.location.reload();
        });
      }
    },
  },
};
</script>