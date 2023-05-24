<template>
  <div class="container-xl">
    <SearchRegister :isArch="isArch" />
    <div style="margin-top: 2%">
      <Table :isArch="isArch" />
    </div>
  </div>
</template>

<script>
import SearchRegister from "@/components/shared/SearchRegister.vue";
import Table from "@/components/shared/Table.vue";
export default {
  name: "Archive",
  components: { SearchRegister, Table },
  data() {
    return {
      isArch: true,
    };
  },
};
</script>
