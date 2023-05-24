<template>
    <div v-if="restoreModalOpen" class="modal" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Restore User</h5>
            <button @click="cancel" class="close">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to Restore the Selected User</p>
          </div>
          <div class="modal-footer">
            <button @click="restoreItem" class="btn btn-primary">
              Restore User
            </button>
  
            <button @click="cancel" class="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["restoreModalOpen","restoreItemId"],
    methods: {
      restoreItem() {
        this.$emit("restore", this.restoreItemId);
      },
  
    
      cancel() {
        this.$emit("cancel");
      },
    
    },
  };
  </script>
  