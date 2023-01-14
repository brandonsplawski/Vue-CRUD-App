<template>
  <div class="platform-list">
    <h1>Platforms</h1>
    <button type="button" class="btn-outline-success" @click="$router.push({ name: 'AddPlatform' })">Add New Platform</button>
    <platform-list :platforms="platforms" />
  </div>
</template>

    <script>
import PlatformList from "@/components/PlatformList.vue";
import {PlatformDataAccess as da } from "@/api";

export default {
  components: {
    PlatformList,
  },
  data() {
    return {
      platforms: [],
    };
  },
  mounted() {
    da.getAllPlatforms()
      .then((response) => {
        console.log(response.data);
        this.platforms = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>