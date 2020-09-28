import Vue from "vue";
import Vuex from "vuex";
/* NEW PART */
/* CALENDAR POPUP */
// import moment from 'moment'
/* ------- */
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {},
    token: null,
    userRoles: [],
    messages: [],
    loadingComponentsCount: 0,
    manager: null,
    /* NEW PART */
    /* CALENDAR POPUP */
    selectedStartDate: null,
    selectedEndDate: null,
    startDateSelectedFlag: false
    /* ------- */
  },

  getters: {
    getUser: function(state) {
      return state.user;
    },
    getToken: function(state) {
      return state.token;
    },
    getUserRoles: function(state) {
      return state.userRoles;
    },
    successMessage: function(state) {
      return state.messages.find(m => m.type === "success");
    },
    errorMessage: function(state) {
      return state.messages.find(m => m.type === "error");
    },
    getLoadingComponentsCount: function(state) {
      return state.loadingComponentsCount;
    },
    isManager: function(state) {
      return state.manager;
    },
    /* NEW PART */
    /* CALENDAR POPUP */
    getSelectedStartDate: function(state){
      return state.selectedStartDate;
    },
    getSelectedEndDate: function(state){
      return state.selectedEndDate;
    },
    getStartDateSelectedFlag: function(state){
      return state.startDateSelectedFlag;
    }
    /* ------- */
  },

  mutations: {
    setUser: function(state, theUser) {
      state.user = theUser;
    },
    removeUser: function(state) {
      state.user = {};
      state.token = null;
    },
    setToken: function(state, thetoken) {
      state.token = thetoken;
    },
    setUserRoles: function(state, theRoles) {
      state.userRoles = theRoles;
    },
    ADD_ERROR_MESSAGE: function(state, message) {
      state.messages.push({
        id: state.messages.length,
        message,
        type: "error"
      });
    },
    ADD_SUCCESS_MESSAGE: function(state, message) {
      state.messages.push({
        id: state.messages.length,
        message: [message],
        type: "success"
      });
    },
    DELETE_MESSAGE: function(state, message) {
      const messages = state.messages;
      state.messages = messages.filter(m => m.id !== message.id);
    },
    SET_MANAGER: function(state, manager) {
      state.manager = manager;
    },
    setLoadingComponentsCount: function(state, count) {
      state.loadingComponentsCount = count;
    },
    /* NEW PART */
    /* CALENDAR POPUP */
    SET_SELECTED_START_DATE: function(state, selectedStartDate){
      // console.log(selectedStartDate);
      state.selectedStartDate = selectedStartDate;
    },
    SET_SELECTED_END_DATE: function(state, selectedEndDate){
      state.selectedEndDate = selectedEndDate;
    },
    SET_START_DATE_SELECTED_FLAG: function(state, startDateSelectedFlag){
      state.startDateSelectedFlag = startDateSelectedFlag;
    }
    /* ------- */
  },

  actions: {
    addSuccessMessage(context, payload) {
      context.commit("ADD_SUCCESS_MESSAGE", payload);
    },
    addErrorMessage(context, payload) {
      context.commit("ADD_ERROR_MESSAGE", payload);
    },
    deleteMessage(context, payload) {
      context.commit("DELETE_MESSAGE", payload);
    },
    setManager(context, payload) {
      context.commit("SET_MANAGER", payload);
    }
  }
});
