<template>
  <div class="container-xl">
    <SearchRegister />
    <div style="margin-top: 2%">
      <Table />
    </div>
  </div>
</template>

<script>
import Table from "@/components/shared/Table.vue";
import SearchRegister from "@/components/shared/SearchRegister.vue";
export default {
  components: { Table, SearchRegister },
};
</script>
