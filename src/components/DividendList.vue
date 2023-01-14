<template>
  <div class="dividend-list">
    <table class="table" border="1">
      <tr>
        <th scope="col">Yield</th>
        <th scope="col">Rate</th>
        <th scope="col">Payment Date</th>
        <th></th>
      </tr>
      <tr v-for="d in dividends" :key="d.dividendId">
        <td>{{ d.dividendYield }}%</td>
        <td>{{ d.dividendRate}}%</td>
        <td>{{ d.dividendPaymentDate}}</td>
        <td>
          <button type="button" class="btn-outline-primary" @click="editDividend(d.dividendId)">Edit</button>
          <button type="button" class="btn-outline-danger" @click="deleteDividend(d.dividendId)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { DividendDataAccess as da} from "@/api"
export default {
  props: {
    dividends: {
      type: Array,
    },
  },
  methods: {
    editDividend(id) {
      this.$router.push({ name: "DividendDetails", params: { dividendId: id } });
    },
    deleteDividend(id){
      if(confirm("Are you sure you want to delete?"))
      {
        da.deleteDividend(id).then(() => {
          window.location.reload();
        });
      }
    }
  },
};
</script>