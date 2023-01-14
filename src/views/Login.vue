    <template>
  <div class="login">
    <form @submit.prevent="onSubmit">
      <span class="validation">{{ errors.login }}</span>
      <div>
        <label>Email:</label>
        <input v-model="email" />
        <span class="validation" v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
        <span class="validation" v-if="errors.password">{{
          errors.password
        }}</span>
      </div>
      <div>
        <input type="submit" id="btnSubmit" name="submit button" />
      </div>
    </form>
  </div>
</template>

    <script>
import { UserDataAccess as da } from "@/api";
export default {
  inject: ["GStore"],
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.errors = {};
	      da.login(this.email, this.password)
          .then((resp) => {
            // this is what we had previously...
            //console.log("Logged in!", resp.data);
            //this.GStore.currentUser = resp.data;
            //this.$router.push({name: "home"});

            const sessionId = resp.headers['x-id'];
            if(sessionId){
              const userData = resp.data;
              userData.sessionId = sessionId;
              sessionStorage.setItem("currentUser", JSON.stringify(userData));
              this.GStore.currentUser = userData;
            this.$router.push({name: "home"});
            }else{
              console.log("missing header")
            }
          })
          .catch((error) => {
            this.errors.login = "Invalid Login";
          });
      }
    },
    validate() {
      var isValid = true;
      this.errors = {};

      if (this.email == "") {
        this.errors.email = "Enter your login email";
        isValid = false;
      }

      if (this.password == "") {
        this.errors.password = "Enter your password";
        isValid = false;
      }

      return isValid;
    },
  },
  mounted() {
    da.logout().finally(() => {
      this.GStore.currentUser = null;
      console.log("the current user has been logged out");
    });
  },
};
</script>

    <style scoped>
label,
.validation {
  display: block;
}
.validation {
  color: red;
}
</style>