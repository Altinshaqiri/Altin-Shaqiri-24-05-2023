<template>
  <div v-if="openViewModal" class="modal" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">View User</h5>
          <button class="close" @click="closeViewModal">&times;</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="id">ID:</label>
            <span id="id" class="form-control">{{ selectedItem.id }}</span>
          </div>
          <div class="form-group">
            <label for="name">Emri:</label>
            <span id="name" class="form-control">{{ selectedItem.name }}</span>
          </div>
          <div class="form-group">
            <label for="date">Data:</label>
            <span id="date" class="form-control">{{ selectedItem.date }}</span>
          </div>
          <div class="form-group">
            <label for="city">Qyteti:</label>
            <span id="city" class="form-control">{{ selectedItem.city }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeViewModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["openViewModal", "selectedItem"],
  methods: {
    closeViewModal() {
      this.$emit("close");
    },
  },
};
</script>
