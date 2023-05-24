import Vue from "vue";
import Vuex from "vuex";
import { getArchivedData } from "../../src/sortimi/soretedArchived.js";
import { getSortedData } from "../../src/sortimi/sortedData.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    archivedData: [],
    sort: {
      column: "", 
      type: "asc",
    },
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 5,
    filtereadArchived: [],
    filteredData: [],
  },

  getters: {
    sortedData: (state) => {
      
      return getSortedData(state);
    },
    totalSortedPages: (state) => {
      return Math.ceil(state.filteredData.length / state.itemsPerPage);
    },

    sortedArchivedData: (state) => {
      return getArchivedData(state);
    },

    totalArchivedPages: (state) => {
      return Math.ceil(state.archivedData.length / state.itemsPerPage);
    },
  },

  mutations: {
    SET_FILTERED_DATA(state, payload) {
      state.filteredData = payload;
    },
    SET_FILTERED_ARCHIVED(state, payload) {
      state.filtereadArchived = payload;
    },
    SET_DATA(state, payload) {
      state.data = payload;
      state.filteredData = payload;
      state.filtereadArchived = payload;
      state.totalPages = Math.ceil(payload.length / state.itemsPerPage);
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },

    ADD_ITEM(state, payload) {
      state.data.push(payload);
    },
    loadDataFromLocalStorage(state) {
      const data = localStorage.getItem("data");
      if (data) {
        state.data = JSON.parse(data);
        state.filteredData = JSON.parse(data);
        state.totalPages = Math.ceil(state.data.length / state.itemsPerPage);
      }
      const archivedData = localStorage.getItem("archivedData");
      if (archivedData) {
        state.archivedData = JSON.parse(archivedData);
        state.filtereadArchived = JSON.parse(archivedData);
        state.totalPages = Math.ceil(
          state.archivedData.length / state.itemsPerPage
        );
      }
    },

    SORT_DATA(state, payload) {
      const { column, type } = state.sort;
      if (payload === column) {
        state.sort.type = type === "asc" ? "desc" : "asc";
      } else {
        state.sort.column = payload;
        state.sort.type = "asc";
      }
    },

    EDIT_ITEM(state, payload) {
      const itemIndex = state.data.findIndex((item) => item.id === payload.id);
      if (itemIndex !== -1) {
        state.data[itemIndex] = payload.editedItem;
        localStorage.setItem("data", JSON.stringify(state.data));

      }
    },

    MODIFY_ITEM(state, payload) {
      const { id, action } = payload;

      const itemIndex = state.data.findIndex((item) => item.id === id);
      const archivedItemIndex = state.archivedData.findIndex(
        (item) => item.id === id
      );

      if (action === "delete" && itemIndex !== -1) {
        const deletedItem = state.data.splice(itemIndex, 1)[0];
        state.archivedData.push(deletedItem);
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem(
          "archivedData",
          JSON.stringify(state.archivedData)
        );
      } else if (action === "restore" && archivedItemIndex !== -1) {
        const restoredItem = state.archivedData.splice(archivedItemIndex, 1)[0];
        state.data.push(restoredItem);
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem(
          "archivedData",
          JSON.stringify(state.archivedData)
        );
      }
    },
  },

  actions: {
    modifyItem({ commit }, payload) {
      commit("MODIFY_ITEM", payload);
    },
    loadDataFromLocalStorage({ commit }, payload) {
      commit("loadDataFromLocalStorage", payload);
    },
    addItem({ commit, state }, payload) {
      commit("ADD_ITEM", payload);
      localStorage.setItem("data", JSON.stringify(state.data));
    },
    sortData({ commit }, payload) {
      commit("SORT_DATA", payload);
    },
    changePage({ commit }, page) {
      commit("SET_CURRENT_PAGE", page);
      commit("refreshSortedData");
    },
    refreshSortedData({ commit, state }) {
      const payload = {
        column: state.sort.column,
        type: state.sort.type,
      };
      commit("SORT_DATA", payload);
    },
    search({ commit, state }, searchTerm) {
      const filteredData = state.data.filter((item) => {
        if (
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.city &&
            item.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return true;
        }
      });
      commit("SET_FILTERED_DATA", filteredData);
      commit("SET_CURRENT_PAGE", 1);
    },

    searchArchived({ commit, state }, searchTerm) {
      const filteredArchived = state.archivedData.filter((item) => {
        if (
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.city &&
            item.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return true;
        }
      });
      commit("SET_FILTERED_ARCHIVED", filteredArchived);
      commit("SET_CURRENT_PAGE", 1);
    },
  },
});
