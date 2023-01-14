    <template>
  <div class="dividend-list">
    <h1>Dividends</h1>
    <button type="button" class="btn-outline-success" @click="$router.push({ name: 'AddDividend' })">Add New Dividend</button>
    <dividend-list :dividends="dividends" />
  </div>
</template>

    <script>
import DividendList from "@/components/DividendList.vue";
import {DividendDataAccess as da } from "@/api";

export default {
  components: {
    DividendList,
  },
  data() {
    return {
      dividends: [],
    };
  },
  mounted() {
    da.getAllDividends()
      .then((response) => {
        console.log(response.data);
        this.dividends = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>