<template>
  <div v-if="deleteModalOpen" class="modal" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete User</h5>
          <button @click="cancel" class="close">&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete the Selected User</p>
        </div>
        <div class="modal-footer">
          <button @click="deleteData" class="btn btn-primary">
            Delete User
          </button>

          <button @click="cancel" class="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deleteModalOpen", "deleteItemId"],
  methods: {
    deleteData() {
      this.$emit("delete", this.deleteItemId);
    },

    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
