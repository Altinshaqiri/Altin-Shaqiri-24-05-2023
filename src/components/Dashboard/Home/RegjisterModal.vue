<template>
  <div v-if="isModalOpen" class="modal" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Regjistro User</h5>
          <button @click="closeModal" class="close">&times;</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="name">Emri:</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="newUser.name"
              @input="checkFormCompletion"
            />
          </div>
          <div v-if="internalShowError" class="alert alert-danger">
            Emri egziston në një artikull tjetër. Ju lutem përdorni një emër të
            tjeter.
          </div>
          <div class="form-group">
            <label for="date">Data:</label>
            <input
              type="date"
              id="date"
              class="form-control"
              v-model="newUser.date"
              @input="checkFormCompletion"
            />
          </div>
          <div class="form-group">
            <label for="city">Qyteti:</label>
            <input
              type="text"
              id="city"
              class="form-control"
              v-model="newUser.city"
              @input="checkFormCompletion"
            />
          </div>
          <div v-if="internalShowError" class="alert alert-danger">
            Ju lutem plotësoni të gjitha fushat.
          </div>
        </div>
        <div class="modal-footer">
          <button @click="saveChanges" class="btn btn-primary">
            Regjister Userin
          </button>
          <button @click="closeModal" class="btn btn-secondary">Anulo</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  validateFields,
  isDuplicateName,
} from "../../../validation/validation.js";
export default {
  props: ["isModalOpen", "newUser", "showError"],
  data() {
    return {
      internalShowError: this.showError,
    };
  },
  methods: {
    saveChanges() {
      if (validateFields(this.newUser)) {
        this.internalShowError = false;

        this.$emit("save-changes");
      } else {
        this.internalShowError = true;
      }
    },

    checkFormCompletion() {
      if (this.newUser.name && this.newUser.city && this.newUser.date) {
        const isDuplicate = isDuplicateName(
          this.$parent.sortedData,
          this.newUser,
          this.newUser.name
        );
        this.internalShowError = isDuplicate;
      } else {
        this.internalShowError = true;
      }
      if (!this.internalShowError && !this.newUser.name) {
        this.internalShowError = false;
      }
    },

    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
