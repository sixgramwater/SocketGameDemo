
const state = {
  msgList: [
    {
      id: 0,
      avatar:'indigo',
      userName: 'sixgramwater',
      date: '2020-12-10 12:23',
      message: 'I think this message will show below, and I am going to test the view when it'
    },
    {
      id: 1,
      avatar:'teal',
      userName: 'Ryuk',
      date: '2020-12-10 12:23',
      message: 'I reply to the layer 1, this is toally bullshit'
    }
    
  ]
}

const mutations = {
  PUSH_MSGLIST(state, item) {
    let newId = state.msgList.length;
    item.id = newId;
    state.msgList.push(item);
    console.log(item);
  },
  CLEAR_MSGLIST(state) {
    state.msgList = [];
  }
}

const getters = {

}
const actions = {
  addMessage({commit}, payload){
    commit('PUSH_MSGLIST', payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}