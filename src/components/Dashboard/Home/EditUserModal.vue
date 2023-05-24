<template>
  <div v-if="editModalOpen" class="modal" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit User</h5>
          <button @click="closeModal" class="close">&times;</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="name">ID:</label>
            <input
              type="text"
              id="id"
              class="form-control"
              v-model="editedItem.id"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="name">Emri:</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="editedItem.name"
            />
          </div>
          <div v-if="showError" class="alert alert-danger" role="alert">
            Emri egziston në një artikull tjetër. Ju lutem përdorni një emër të
            tjeter.
          </div>
          <div class="form-group">
            <label for="date">Data:</label>
            <input
              type="date"
              id="date"
              class="form-control"
              v-model="editedItem.date"
            />
          </div>
          <div class="form-group">
            <label for="city">Qyteti:</label>
            <input
              type="text"
              id="city"
              class="form-control"
              v-model="editedItem.city"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="saveChanges" class="btn btn-primary">
            Update Userin
          </button>
          <button @click="closeModal" class="btn btn-secondary">Anulo</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["editModalOpen", "editedItem","showError"],

  methods: {
    saveChanges() {
      this.$emit("save-changes");
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
