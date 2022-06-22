<template>
  <div class="container">
    <div class="w-full lg:w-1/2">
      <div class="overflow-hidden border rounded-lg">
        <div class="p-4 border-b bg-gray-50">
          {{ transaction.name }}
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="text-xs tracking-wider text-gray-500 uppercase">
              Amount
            </label>
            <div class="leading-relaxed text-gray-800">
              Rp. {{ transaction.amount }}
            </div>
          </div>
          <div class="mb-4">
            <label class="text-xs tracking-wider text-gray-500 uppercase">
              Stored
            </label>
            <div class="leading-relaxed text-gray-800">
              {{ transaction.when }}
            </div>
          </div>
          <div class="mb-4">
            <label class="text-xs tracking-wider text-gray-500 uppercase">
              Description
            </label>
            <div class="leading-relaxed text-gray-800">
              {{ transaction.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
import router from "@/router";
export default {
  setup() {
    const route = useRoute();
    let slug = route.params.slug;
    let transaction = ref([]);

    const getTransaction = async () => {
      try {
        let { data } = await axios.get(`api/cash/${slug}`);
        // console.log(data)
        transaction.value = data.data;
        console.log(transaction);
      } catch {
        router.replace("/cashes");
      }
    };
    // const coba =
    onMounted(() => {
      getTransaction();
    });

    return {
      transaction,
    };
  },
};
</script>

<style>
</style>