<template>
  <div v-if="dividend" class="dividend-details">
    <form @submit.prevent="onSubmit">
      <div>
        <label class="form-label">Dividend Yield:</label>
        <input class="form-control" v-model="dividend.dividendYield" />
        <span class="validation" v-if="errors.dividendYield">{{
          errors.dividendYield
        }}</span>
      </div>
      <div>
        <label class="form-label">Dividend Rate:</label>
        <input class="form-control" v-model="dividend.dividendRate" />
        <span class="validation" v-if="errors.dividendRate">{{
          errors.dividendRate
        }}</span>
      </div>
      <div>
        <label class="form-label">Dividend Payment Date:</label>
        <input class="form-control" v-model="dividend.dividendPaymentDate" />
        <span class="validation" v-if="errors.dividendPaymentDate">{{ errors.dividendPaymentDate }}</span>
      </div>
      <div>
        <input class="btn btn-primary mx-1" type="submit" id="btnSubmit" name="submit button" />
        <input
          type="button"
          class="btn btn-primary"
          @click="$router.push({ name: 'Dividends' })"
          value="Cancel"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { DividendDataAccess as da} from "@/api";

export default {
  props: ["dividendId"],
  data() {
    return {
      dividend: null,
      errors: {},
    };
  },
  mounted() {
    if (this.dividendId > 0) {
      da.getDividendById(this.dividendId).then((resp) => {
        this.dividend = resp.data;
      });
    } else {
      this.dividend = { dividendId: null, dividendYield: null, dividendRate: null, dividendPaymentDate: "" };
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        if (this.dividendId > 0) {
          da.updateDividend(this.dividend).then((resp) => {
            this.$router.push({ name: "Dividends" });
          });
        } else {
          da.insertDividend(this.dividend).then((resp) => {
            this.$router.push({ name: "Dividends" });
          });
        }
      }
    },
    validate() {
      // clear our any error messages from the previous submit
      this.errors = {};
      var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

      if (!this.dividend.dividendYield || isNaN(parseFloat(this.dividend.dividendYield) && isFinite(this.dividend.dividendYield))) {
        this.errors.dividendYield = "Please enter a valid Yield";
      }

      if (!this.dividend.dividendRate|| isNaN(parseFloat(this.dividend.dividendRate) && isFinite(this.dividend.dividendRate))) {
        this.errors.dividendRate = "Please enter a valid Rate";
      }

      if (!this.dividend.dividendPaymentDate.match(date_regex))
      {
        this.errors.dividendPaymentDate = "Please enter a valid Date";
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