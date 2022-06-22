<template>
  <div class="container">
    <!-- All Cashes -->

    <div class="flex">
      <div class="w-full mr-4 lg:w-8/12">
        <div class="w-full mb-8">
          <div class="transform bg-gray-200 -rotate-2 rounded-2xl">
            <div
              class="p-6 text-white transform bg-gradient-to-br from-blue-500 to-light-blue-400 rotate-2 rounded-2xl"
            >
              <label
                class="block mb-1 text-xs font-semibold tracking-wider text-blue-100 uppercase "
                >Balances</label
              >
              <div class="text-3xl font-semibold">Rp. {{ state.balances }}</div>
            </div>
          </div>
        </div>
        <div class="flex items-center -mx-2">
          <div class="w-full px-2">
            <div class="transform bg-gray-200 -rotate-3 rounded-2xl">
              <div
                class="p-6 text-white transform bg-gradient-to-br from-teal-500 to-cyan-400 rotate-3 rounded-2xl"
              >
                <label
                  class="block mb-1 text-xs font-semibold tracking-wider text-teal-100 uppercase "
                  >Debit</label
                >
                <div class="text-3xl font-semibold">Rp. {{ state.debit }}</div>
              </div>
            </div>
          </div>
          <div class="w-full px-2">
            <div class="transform bg-gray-200 -rotate-3 rounded-2xl">
              <div
                class="p-6 text-white transform bg-gradient-to-br from-red-500 to-yellow-400 rotate-3 rounded-2xl"
              >
                <label
                  class="block mb-1 text-xs font-semibold tracking-wider text-red-100 uppercase "
                  >Credit</label
                >
                <div class="text-3xl font-semibold">Rp. {{ state.credit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-10">
          <div class="overflow-hidden border rounded-lg">
            <div
              class="flex items-center justify-between px-6 py-4 border-b bg-gray-50"
            >
              <div>Transactions</div>
              <form @submit.prevent="getCashes" class="flex items-center">
                <input
                  type="date"
                  v-model="form.begin"
                  class="px-3 py-2 mr-2 bg-white border rounded"
                />
                <input
                  type="date"
                  v-model="form.to"
                  class="px-3 py-2 mr-2 bg-white border rounded"
                />
                <input
                  type="submit"
                  class="px-3 py-2 text-white rounded bg-gradient-to-br from-blue-500 to-light-blue-500 focus:outline-none"
                  value="Go"
                />
              </form>
            </div>
            <div class="overflow-y-scroll h-112">
              <div
                v-for="transaction in state.transactions"
                :key="transaction.id"
              >
                <router-link
                  :to="`/cashes/${transaction.slug}`"
                  class="flex items-center justify-between px-6 py-5 border-b hover:bg-gray-50"
                >
                  <span class="flex flex-col">
                    <span class="text-xs text-grey-500">{{
                      transaction.when
                    }}</span>
                    <span>{{ transaction.name }}</span>
                  </span>
                  <span
                    :class="
                      transaction.isCredit ? 'text-red-500' : 'text-green-500'
                    "
                    >{{ transaction.amount }}</span
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12">
        <h1 class="mb-5 text-lg font-semibold text-gray-800">
          Add Transaction History
        </h1>
        <form @submit.prevent="add">
          <div class="mb-5">
            <label for="name" class="block mb-2 text-xs font-medium uppercase">
              Name
            </label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="w-full h-10 px-4 transition duration-150 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div class="mb-5">
            <label
              for="amount"
              class="block mb-2 text-xs font-medium uppercase"
            >
              amount
            </label>
            <input
              v-model="form.amount"
              type="text"
              id="amount"
              class="w-full h-10 px-4 transition duration-150 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
            <!-- <div class="mt-2 text-sm text-red-500" v-if="errors['amount']"> -->
            <!-- {{ errors["amount"][0] }} -->
            <!-- </div> -->
          </div>
          <div class="mb-5">
            <label for="when" class="block mb-2 text-xs font-medium uppercase">
              When
            </label>
            <input
              v-model="form.when"
              type="date"
              id="when"
              class="w-full h-10 px-4 transition duration-150 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
            <!-- <div class="mt-2 text-sm text-red-500" v-if="errors['when']"> -->
            <!-- {{ errors["when"][0] }} -->
            <!-- </div> -->
          </div>
          <div class="mb-5">
            <label
              for="description"
              class="block mb-2 text-xs font-medium uppercase"
            >
              description
            </label>
            <textarea
              v-model="form.description"
              id="description"
              class="w-full px-4 transition duration-150 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            ></textarea>
            <!-- <div class="mt-2 text-sm text-red-500" v-if="errors['description']"> -->
            <!-- {{ errors["description"][0] }} -->
            <!-- </div> -->
          </div>
          <button
            class="h-10 px-4 text-white bg-blue-600 rounded-lg focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = ref([]);
    const form = reactive({
      begin: "",
      to: "",
      name: "",
      amount: "",
      when: "",
      description: "",
    });

    const getCashes = async () => {
      console.log("jalan");
      let { data } = await axios.get("api/cash", {
        params: {
          from: form.begin,
          to: form.to,
          
        },
      });
      // console.log(data);
      state.value = data;
      if (!form.begin || !form.to) {
        form.begin = data.firstOfMonth;
        form.to = data.now;
      }
    };

    const add = async () => {
      let response = await axios.post("api/cash/create", form);
      state.value.transactions.unshift(response.data.cash);
      console.log(state.value)
    };
    // console.log(state.balances)
    onMounted(() => {
      getCashes();
    });

    return {
      state,
      form,
      getCashes,
      add
    };
  },
};
</script>

<style>
</style>