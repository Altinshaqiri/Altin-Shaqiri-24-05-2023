<template>
  <div>
    <table class="table table-bordered width: 80%">
      <thead>
        <tr>
          <th @click="sortData('index')">
            Index {{ sortColumn === "index" ? sortType : "" }}
          </th>
          <th @click="sortData('name')">
            Name {{ sortColumn === "name" ? sortType : "" }}
          </th>
          <th @click="sortData('date')">
            Data {{ sortColumn === "date" ? sortType : "" }}
          </th>
          <th @click="sortData('city')">
            City {{ sortColumn === "city" ? sortType : "" }}
          </th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in combinedData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.city }}</td>

          <td v-if="isArch">
            <button class="btn btn-primary" @click="isViewModal(item)">
              View
            </button>
            <button
              class="btn btn-secondary"
              @click="openRestoreModal(item.id)"
            >
              Restore
            </button>
          </td>
          <td v-else>
            <button class="btn btn-primary" @click="openEditModal(item)">
              Edit
            </button>
            <button class="btn btn-secondary" @click="openDeleteModal(item.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item">
            <a @click="goToPage(page)" class="page-link">{{ page }}</a>
          </li>

          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    <ViewModal
      :openViewModal="openViewModal"
      :selectedItem="selectedItem"
      @close="closeViewModal"
    />

    <EditUserModal
      :editModalOpen="editModalOpen"
      :editedItem="editedItem"
      :showError="showError"
      @save-changes="saveChanges"
      @close-modal="closeEditModal"
    />
    <DeleteUserModal
      :deleteModalOpen="deleteModalOpen"
      :deleteItemId="deleteItemId"
      @delete="deleteItem"
      @cancel="closeDeleteModal"
    />
    <RestoreUserModal
      :restoreModalOpen="restoreModalOpen"
      :restoreItemId="restoreItemId"
      @restore="restoreItem"
      @cancel="closeRestoreModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import EditUserModal from "../Dashboard/Home/EditUserModal.vue";
import DeleteUserModal from "../Dashboard/Home/DeleteUserModal.vue";
import ViewModal from "../Dashboard/Archive/ViewModal.vue";
import RestoreUserModal from "../Dashboard/Archive/RestoreUserModal.vue";
import { isDuplicateName } from "../../validation/validation.js";
export default {
  components: { EditUserModal, DeleteUserModal, ViewModal, RestoreUserModal },
  props: ["isArch"],

  data() {
    return {
      showError: false,
      openViewModal: false,
      selectedItem: {
        id: null,
        name: null,
        date: null,
        city: null,
      },

      restoreItemId: null,
      restoreModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
      editedItem: {
        id: null,
        name: "",
        date: "",
        city: "",
      },

      deleteItemId: null,
    };
  },

  mounted() {
    this.$store.dispatch("refreshSortedData");
  },

  computed: {
    ...mapGetters([
      "sortedData",
      "totalSortedPages",
      "sortedArchivedData",
      "totalArchivedPages",
    ]),

    combinedData() {
      if (this.isArch) {
        return this.sortedArchivedData;
      } else {
        return this.sortedData;
      }
    },
    totalPages() {
      if (this.isArch) {
        return this.totalArchivedPages;
      } else {
        return this.totalSortedPages;
      }
    },
    sortColumn() {
      return this.$store.state.sort.column;
    },
    sortType() {
      return this.$store.state.sort.type === "asc" ? "↑" : "↓";
    },
  },

  created() {
    this.$store.commit("loadDataFromLocalStorage");
  },

  methods: {
    ...mapActions(["editItem", "deleteItem", "changePage", "sortData"]),

    refreshDataFromLocalStorage() {
      const localStorageData = localStorage.getItem("data");
      if (localStorageData) {
        this.$store.commit("SET_DATA", JSON.parse(localStorageData));
      }
    },

    goToPage(page) {
      this.$store.commit("SET_CURRENT_PAGE", page);
      this.$store.dispatch("refreshSortedData");
    },

    changePages(e) {
      const page = parseInt(e.target.value);
      this.changePage(page);
    },

    openEditModal(item) {
      this.editedItem.id = item.id;
      this.editedItem.name = item.name;
      this.editedItem.date = item.date;
      this.editedItem.city = item.city;
      this.editModalOpen = true;
    },
    closeEditModal() {
      this.editModalOpen = false;
    },

    

    saveChanges() {
      this.showError=false;
      const isDuplicate = isDuplicateName(this.sortedData,this.editedItem);
      if(isDuplicate) {
        this.showError=true;
        return;
      }
      this.$store.commit("EDIT_ITEM", {
        id: this.editedItem.id,
        editedItem: { ...this.editedItem },
      });

      localStorage.setItem("data", JSON.stringify(this.$store.state.data));
      this.closeEditModal();
      this.refreshDataFromLocalStorage();
    },
    openDeleteModal(itemId) {
      this.deleteItemId = itemId;
      this.deleteModalOpen = true;
    },
    closeDeleteModal() {
      this.deleteModalOpen = false;
    },
    deleteItem(id) {
      this.$store.dispatch("modifyItem", { id, action: "delete" });
      this.closeDeleteModal();
      this.refreshDataFromLocalStorage();
    },
    openRestoreModal(itemId) {
      this.restoreItemId = itemId;
      this.restoreModalOpen = true;
    },
    closeRestoreModal() {
      this.restoreModalOpen = false;
    },
    restoreItem(id) {
      this.$store.dispatch("modifyItem", { id, action: "restore" });
      this.closeRestoreModal();
      this.refreshDataFromLocalStorage();
      this.$store.commit("loadDataFromLocalStorage");
    },

    isViewModal(item) {
      this.selectedItem.id = item.id;
      this.selectedItem.name = item.name;
      this.selectedItem.date = item.date;
      this.selectedItem.city = item.city; // Vendos elementin e zgjedhur
      this.openViewModal = true; // Trego modalin
    },
    closeViewModal() {
      this.openViewModal = false;
    },
  },

  saveDataToLocalStorage() {
    localStorage.setItem("data", JSON.stringify(this.data)); // Ruaj të dhënat në localStorage
  },
};
</script>
<style>
button.active {
  font-weight: bold;
  color: blue;
}
</style>
