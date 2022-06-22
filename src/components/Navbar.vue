<template>
  <div class="border-b lg:py-3">
    <div class="flex flex-col justify-between lg:flex-row">
      <div
        class="flex justify-between px-6 py-4 border-b lg:border-b-0 lg:pr-0"
      >
        <router-link
          exact-active-class="bg-transparent"
          class="font-semibold tracking-widest uppercase"
          to="/"
        >
          Cashinout
        </router-link>
        <button
          v-on:click="isOn = !isOn"
          class="block lg:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5d"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              :class="!isOn ? 'block' : 'hidden'"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              :class="isOn ? 'block' : 'hidden'"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        :class="isOn ? 'block' : 'hidden'"
        class="flex-col justify-between w-full px-4 py-4 lg:flex lg:py-0 lg:items-center lg:flex-row"
      >
        <div class="flex flex-col lg:flex-row lg:items-center">
          <router-link :class="className" to="/about"> About </router-link>
          <router-link :class="className" to="/cashes"> Cash </router-link>
        </div>
        <div v-if="authenticated" class="flex items-center">
            <router-link :class="className" to="/login"> {{user.name}}</router-link>
            <button class="focus:outline-none" :class="className" @click="logout"> Logout </button>
          </div>
        <div v-else class="flex flex-col lg:items-center lg:flex-row">
          <router-link :class="className" to="/login"> Login </router-link>
          <router-link :class="className" to="/register">
            Register
          </router-link>
        </div>
      </div>
    </div>
    <!-- Navbar -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import store from "@/store";
import router from "@/router";
export default {
  setup() {
    const className = "px-4 py-2";
    const isOn = ref(true);

    const authenticated = computed(() => store.getters["auth/authenticated"]);
    const user = computed(() => store.getters["auth/user"]);
    // console.log(user.value)
    // console.log(user.value)
    const logout = async() => {
      // console.log('abc')
      await store.dispatch("auth/logout");
      router.push("/login");
    };

    return {
      className,
      isOn,
      authenticated,
      user,
      logout
    };
  },
};
</script>

<style>
</style>