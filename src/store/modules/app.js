
const state = {
    showAside: true,
    pageWidth:'',
    isMobile: null,
    roomId: '',
    roomUserList: [],
    
}

const mutations = {
    UPDATE_SHOW_ASIDE (state, visible){
        state.showAside = visible;
    },
    UPDATE_PAGE_WIDTH(state, width){
        state.pageWidth = width;
    },
    UPDATE_IS_MOBILE(state, value) {
        state.isMobile = value;
    },
    APPEND_ROOM_USERLIST(state, user) {
        if(!user) return;
        const socketId = user.socketId;
        const index = state.roomUserList.findIndex(item=>{
            return item.socketId === socketId;
        });
        if(index == -1) {
            state.roomUserList.push(user);
        }
        
    },
    REMOVE_ROOM_USERLIST(state, socketId) {
        // console.log(state.roomUserList);
        state.roomUserList = state.roomUserList.filter(user=>{
            return user.socketId !== socketId;
        })
        // console.log(state.roomUserList);
    },
    SET_ROOM_USERLIST(state, list) {
        state.roomUserList = list;
    }
    // SET_ONLINE_USERLIST(state, list) {

    // }
}

const getters = {

}
const actions = {
    showAside({  commit }) {
        // UPDATE_SHOW_ASIDE
        commit('UPDATE_SHOW_ASIDE', true);
    },
    hideAside({ commit }) {
        commit('UPDATE_SHOW_ASIDE', false);
    },
    toggleAside({ commit }){
        if(state.showAside){
            commit('UPDATE_SHOW_ASIDE', false);
        }
        else{
            commit('UPDATE_SHOW_ASIDE', true);
        }
    },
    setPageWidth({ commit }, payload) {
        commit('UPDATE_PAGE_WIDTH', payload);
    },
    setIsMobile({commit}, payload) {
        commit('UPDATE_IS_MOBILE', payload);
    },
    addRoomUserList({commit}, payload) {
        commit('APPEND_ROOM_USERLIST', payload);
    },
    removeRoomUserList({commit}, payload) {
        // const {socketId} = payload;
        commit('REMOVE_ROOM_USERLIST', payload);
    },
    updateRoomUserList({commit}, payload) {
        commit('SET_ROOM_USERLIST', payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }