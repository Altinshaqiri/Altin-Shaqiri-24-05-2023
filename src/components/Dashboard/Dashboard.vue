<template>
  <div>
    <Headers />
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Headers from "./Headers.vue";
import Navigation from "./Navigation.vue";

export default {
  name: "Dashboard",
  components: { Headers, Navigation },
};
</script>
