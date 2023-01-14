<template>
  <div v-if="user" class="user-details">
    <form @submit.prevent="onSubmit">
      <div>
        <label class="form-label">First Name:</label>
        <input class="form-control" v-model="user.firstName" />
        <span class="validation" v-if="errors.firstName">{{
          errors.firstName
        }}</span>
      </div>
      <div>
        <label class="form-label">Last Name:</label>
        <input class="form-control" v-model="user.lastName" />
        <span class="validation" v-if="errors.lastName">{{
          errors.lastName
        }}</span>
      </div>
      <div>
        <label class="form-label">Email:</label>
        <input class="form-control" v-model="user.email" />
        <span class="validation" v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <label class="form-label">Password:</label>
        <input class="form-control" type="password" v-model="user.password" />
        <span class="validation" v-if="errors.password">{{
          errors.password
        }}</span>
      </div>
      <div>
        <label class="form-label">Role:</label>
        <select class="form-select" v-if="roles" @change="updateUserRole">
          <option hidden value=null></option>
          <option value=1>1</option>
          <option value=2>2</option>
        </select>
      </div>
      <div>
        <label class="form-label">Active:</label>
        <input
          type="checkbox"
          :checked="user.active == 'yes'"
          @change="updateActiveStatus"
        />
      </div>
      <div>
        <input
          class="btn btn-primary mx-1"
          type="submit"
          id="btnSubmit"
          name="submit button"
        />
        <input
          type="button"
          class="btn btn-primary"
          @click="$router.push({ name: 'Users' })"
          value="Cancel"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { UserDataAccess as uda, RoleDataAccess as rda } from "@/api";
export default {
  inject: ["GStore"],
  props: ["userId"],
  data() {
    return {
      user: null,
      errors: {},
      roles: [],
    };
  },
  mounted() {
    //if(this.GStore.currentUser?.roleName == "Admin"){
    if (this.GStore.currentUser?.roleId == 2) {
      if (this.userId > 0) {
        uda.getUserById(this.userId).then((resp) => {
          this.user = resp.data;
        });
      } else {
        this.user = { id: 0, roleId: "", active: "yes" };
      }
    } else {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        if (this.userId > 0) {
          uda
            .updateUser(this.user)
            .then((resp) => {
              this.$router.push({ name: "Users" });
            })
            .catch(this.handleDataAccessError);
        } else {
          uda
            .insertUser(this.user)
            .then((resp) => {
              this.$router.push({ name: "Users" });
            })
            .catch(this.handleDataAccessError);
        }
      }
    },
    updateUserRole(evt) {
      this.user.roleId = evt.target.value;
      console.log("roleId updated to " + this.user.roleId);
    },
    updateActiveStatus(evt) {
      this.user.active = evt.target.checked ? "yes" : "no";
      console.log("active updated to " + this.user.active);
    },
    validate() {
      // clear our any error messages from the previous submit
      this.errors = {};

      if (!this.user.firstName) {
        this.errors.firstName = "First name is required";
      }

      if (!this.user.lastName) {
        this.errors.lastName = "Last name is required";
      }

      const emailRegExp =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!this.user.email) {
        this.errors.email = "Email is required";
      } else if (emailRegExp.test(this.user.email) == false) {
        this.errors.email = "The email address is not valid";
      }

      if (!this.user.password && !this.userId > 0) {
        this.errors.password = "Password is required";
      }

      if(this.user.roleId == null)
      {
        this.errors.roleId = "Please select a role";
      }

      // if there are no keys in the errors object, then everything is valid
      return Object.keys(this.errors).length == 0;
    },
    handleDataAccessError(err) {
      const statusText = err?.response.statusText;
      if (statusText && statusText.includes("Duplicate entry")) {
        this.errors.email = "Please choose another email address";
        alert("Your user did not create. Please enter in valid data with a unique email");
      } else {
        console.log("unable to update/insert user");
        alert("Your user did not create. Please enter in valid data with a unique email");
      }
    },
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