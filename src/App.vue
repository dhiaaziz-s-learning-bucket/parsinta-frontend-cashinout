<!-- import './index.css' -->

<template>
  <!-- <div> -->
  <!-- <div class="bg-gray-100">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, expedita!
  </div> -->
  <div>
    <navbar />
    <div class="mt-8"></div>
    <router-view />
  </div>

  <!-- </div> -->
  <!-- <div></div> -->
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: { Navbar },
};
</script>

<style>
</style>