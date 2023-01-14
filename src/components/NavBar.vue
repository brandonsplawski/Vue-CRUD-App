
<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark px-4">
    
    <!--If authenticated, say hello-->
    <span class="text-white p-1 m-1 text-end" v-if="GStore.currentUser">Hello {{GStore.currentUser.firstName}} &nbsp;</span>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link> 
        </li>

        <!--If the current user is an Admin, then show the link to edit users-->
        <li v-if="GStore.currentUser && GStore.currentUser.roleId == 2" class="nav-item">
          <router-link class="nav-link" :to="{name: 'Users'}">Users</router-link>
        </li>

        <!--
        Show 'Log In' if the user has NOT logged in,
        otherwise, show 'Log Out'        
        -->
        <li class="nav-item" v-if="GStore.currentUser == null">
            <router-link class="nav-link" :to="{name: 'Login'}">Log In</router-link>
        </li>
        <li v-else class="nav-item">
          <router-link class="nav-link" :to="{name: 'Login'}">Log Out</router-link>
        </li>
        <li class="nav-item">
              <router-link class='nav-link' :to="{name: 'Platforms'}">Platforms</router-link>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link" href="#">Link</a> -->
          <router-link class="nav-link" :to="{name: 'Dividends'}">Dividends</router-link>
        </li>
      </ul> 
    </div>
  </nav>
</template>

<script>
export default {
    inject: ['GStore'] 
}
</script>