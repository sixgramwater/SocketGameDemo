
const state = {
  board:[],
  size: 14,
  myTurn: false,
  curDrop: {
    x: null,
    y: null,
  },
  color: 'white',
  colorValue: 0,
  winningChess: [],
}

const mutations = {
  UPDATE_CURDROP(state, x, y){
    state.curDrop.x =  x;
    state.curDrop.y = y;
  },
  UPDATE_COLOR(state, color) {
    state.color = color;
    state.colorValue = (color==='white')?0:1;
  },
  SET_BOARD_SIZE(state, size) {
    state.size = size;
  },
  CLEAR_BOARD(state){
    for(let i=0;i<state.size;i++){
      for(let j=0; j<state.size;j++){
          state.board[i][j] = -1;
      }
    }
  },
  INIT_BOARD(state){
    const size = state.size || 14;
    for(let i=0;i<size;i++){
      state.board[i] = new Array();
      for(let j=0;j<size;j++){
          state.board[i][j] = -1;
      }
    }
  },
  UPDATE_BOARD(state, para) {
    const {x, y, color} = para;
    // if(x>=state.size || y>=state.size)  return false;
    const value = (color==='white')?0:1;
    state.board[x][y] = value;
    console.log('#update_board',{
      x,
      y,
      value
    })
  },
  UPDATE_MYTURN_TRUE(state) {
    state.myTurn = true;
  },
  UPDATE_MYTURN_FALSE(state) {
    state.myTurn = false;
  },
  CHANGE_MYTURN(state) {
    state.myTurn = !state.myTurn;
  }
  // IS_MY_TURN(state) {
  //   return 
  // }
}

const getters = {
  // myTurn: state=>state.myTurn,
}
const actions = {
  dropChess({commit}, payload) {
    // if(!state.myTurn) return false;
    console.log('action_payload', payload);
    // const { x, y, color } = payload;
    // console.log(y);
    commit('UPDATE_BOARD', payload);

  },
  initBoard({commit}, payload) {
    const { size } = payload;
    commit('SET_BOARD_SIZE', size);
    commit('INIT_BOARD');
  },
  // getWinning({state}, payload) {
  //   const {x, y} = payload;
  //   this.checkByStep()
  // },
  // checkByStep({state}, payload) {

  // }
  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}