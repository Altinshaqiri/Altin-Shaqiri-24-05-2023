<template>
  <div>
    <div
      v-if="!isArch"
      class="d-flex justify-content-between"
      style="margin-top: 10px"
    >
      <div class="search-bar">
        <input
          type="text"
          v-model="searchTerm"
          @input="search"
          placeholder="Kërko..."
        />
        <i class="bi bi-search"></i>
      </div>
      <div class="input-group-append">
        <button
          @click="openRegistrationModal"
          class="btn btn-outline-secondary"
          type="button"
        >
          Register New Student
        </button>
      </div>
    </div>

    <div
      v-if="isArch"
      class="d-flex justify-content-between"
      style="margin-top: 10px"
    >
      <div class="search-bar">
        <input
          type="text"
          v-model="searchTerm"
          @input="search"
          placeholder="Kërko..."
        />
        <i class="bi bi-search"></i>
      </div>
    </div>
    <RegjisterModal
      :isModalOpen="isModalOpen"
      :newUser="newUser"
      :showError="showError"
      @save-changes="registerUser"
      @close-modal="closeRegistrationModal"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import RegjisterModal from "../Dashboard/Home/RegjisterModal.vue";
import { isDuplicateName } from "../../validation/validation.js";

export default {
  components: { RegjisterModal },
  props: ["isArch"],
  data() {
    return {
      showError: false,
      searchTerm: "",
      isModalOpen: false,
      newUser: {
        name: "",
        date: "",
        city: "",
      },
    };
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters(["sortedData"]),
    sortedData() {
      return this.$store.getters.sortedData; // Merr të dhënat e renditura nga store
    },
  },

  mounted() {
    this.loadDataFromLocalStorage();
  },

  methods: {
    ...mapActions(["addItem", "search", "loadDataFromLocalStorage"]),

    search() {
      if (this.isArch) {
        this.$store.dispatch("searchArchived", this.searchTerm);
      } else {
        this.$store.dispatch("search", this.searchTerm);
      }
    },

    openRegistrationModal() {
      this.isModalOpen = true;
    },
    closeRegistrationModal() {
      this.isModalOpen = false;
      this.resetNewUser();
    },

    registerUser() {
      this.showError=false;
      this.isDuplicate = isDuplicateName(
        this.sortedData,
        this.newUser,
        
      );

      if (this.isDuplicate) {
        this.showError = true;
        return;
      }
      const newUser = {
        id: Math.random().toFixed(4).substr(2, 9),
        ...this.newUser,
      };
      this.addItem(newUser);
      this.closeRegistrationModal();
      this.loadDataFromLocalStorage();
    },

    resetNewUser() {
      this.newUser = {
        name: "",
        date: "",
        city: "",
      };
    },
  },
};
</script>

<style>
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 5px;
  width: 25%;
}

.search-bar input {
  border: none;
  outline: none;

  flex: 1;
  padding: 5px;
}

.search-bar i {
  margin-left: 5px;
  cursor: pointer;
}
</style>
