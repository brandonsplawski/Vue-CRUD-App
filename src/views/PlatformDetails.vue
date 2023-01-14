<template>
  <div v-if="platform" class="platform-details">
    <form @submit.prevent="onSubmit">
      <div>
        <label class="form-label">Platform Name:</label>
        <input class="form-control" v-model="platform.platformName" />
        <span class="validation" v-if="errors.platformName">{{
          errors.platformName
        }}</span>
      </div>
      <div>
        <label class="form-label">Platform Type:</label>
        <input class="form-control" v-model="platform.platformType" />
        <span class="validation" v-if="errors.platformType">{{
          errors.platformType
        }}</span>
      </div>
      <div>
        <label class="form-label">Platform Link:</label>
        <input class="form-control" v-model="platform.platformLink" />
        <span class="validation" v-if="errors.platformLink">{{ errors.platformLink }}</span>
      </div>
      <div>
        <input class="btn btn-primary mx-1" type="submit" id="btnSubmit" name="submit button" />
        <input
          type="button"
          class="btn btn-primary"
          @click="$router.push({ name: 'Platforms' })"
          value="Cancel"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { PlatformDataAccess as da} from "@/api";

export default {
  props: ["platformId"],
  data() {
    return {
      platform: null,
      errors: {},
    };
  },
  mounted() {
    if (this.platformId > 0) {
      da.getPlatformById(this.platformId).then((resp) => {
        this.platform = resp.data;
      });
    } else {
      this.platform = { platformId: 0, platformName: "", platformType: "", platformLink: "" };
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        if (this.platformId > 0) {
          da.updatePlatform(this.platform).then((resp) => {
            this.$router.push({ name: "Platforms" });
          });
        } else {
          da.insertPlatform(this.platform).then((resp) => {
            this.$router.push({ name: "Platforms" });
          });
        }
      }
    },
    validate() {
      // clear our any error messages from the previous submit
      this.errors = {};
      var expression = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
      var regex = new RegExp(expression);

      if (!this.platform.platformName) {
        this.errors.platformName = "Please enter a valid name";
      }

      if (!this.platform.platformType) {
        this.errors.platformType = "Please enter a valid type";
      }

      if (!this.platform.platformLink.match(regex)) {
        this.errors.platformLink = "Please enter a valid link";
      }

      // if there are no keys in the errors object, then everything is valid
      return Object.keys(this.errors).length == 0;
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