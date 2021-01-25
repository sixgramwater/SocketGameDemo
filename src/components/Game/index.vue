<template>
  <div>
    <my-chess-game ref="chess"></my-chess-game>
    <mu-container>
      <mu-flex justify-content="center">
        <mu-button @click="openAlertDialog">Open Dialog</mu-button>
      </mu-flex>
      <mu-dialog title="Wait for Players Join ..." width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
        <!-- <mu-flex justify-content="center">
          <mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>
        </mu-flex> -->
        <div class="user-display">
          <mu-flex justify-content="center">
            <!-- <mu-avatar color="teal" v-for="user in roomUserList" :key="user.userId">
              {{user.userName}}
            </mu-avatar> -->
            <div v-for="user in roomUserList" :key="user.socketId" class="user-item">
              <!-- socketId:{{user.socketId}} -->
              <div class="user-item-container">
                <mu-avatar color="teal">
                  {{user.userName[0] || 用户}}
                </mu-avatar>
                <div class="username">
                  <span class="">{{user.userName}}</span>
                  <span></span>
                </div>
              </div>
            </div>
          </mu-flex>
        </div>
        
        <div class="player-select">
          
          <div :class="['select-item', (playerList[index].joined )?'select-item-active':'']" v-for="(player, index) in playerList" :key="index">
            <div class="item-title">
              1P: 
            </div>
            <!-- <div class="player-avatar">
              <mu-avatar color="teal">
                
              </mu-avatar>
            </div> -->
            <div class="player-info">
              <span class="username gray-text" v-show="!player.joined">暂无用户</span>
              <span class="username" v-if="player.joined">
                {{player.user.userName}}
              </span>

              <!-- <span>{{user.userName}}</span> -->
            </div>
            <div class="function">
              <mu-button slot="action" v-show="player.joined" :disabled="!player.joined" color="red" @click="handleLeave(index)">离开</mu-button>
              <mu-button slot="action" v-show="!player.joined" :disabled="player.joined" color="primary" @click="handleJoin(index)">加入</mu-button>
              <!-- <mu-button slot="action" flat color="red" @click="handleLeave(0)">离开</mu-button> -->
            </div>
          </div>
          
        </div>
        
        <div class="btn">
          <mu-flex justify-content="center">
            <mu-button full-width :disabled="playersReady.length<2" color="primary" @click="closeAlertDialog">Start Game</mu-button>
          </mu-flex>
        </div>
        
        
      </mu-dialog>
    </mu-container>
  </div>
</template>

<script>
import Chess from './Chess';
import { mapState } from 'vuex';
export default {
  components: {
    [Chess.name]: Chess,
  },
  data(){
    return {
      openAlert: true,
      player: {
        userInfo: null,
        color: '',
      },
      winningChess:[],
      user:null,
      playersReady: [],
      playerList: [
        {
          joined: false,
          user: null,
          isMe: false,
        },
        {
          joined: false,
          user: null,
          isMe: false,
        }
      ],
      player1: {
        joined: false,
        user: null,
      },
      player2: {
        joined: false,
        user: null,
      },
      
    }
  },
  watch: {
    // '$store.state.chess.board': function(){
    //   console.log(this.getWinning(x, y));
    // }
  },
  computed: {
    // ...mapState('user',{
    //   user: state=>state.user,
    // }),
    ...mapState('app', {
      roomUserList: state=>state.roomUserList,
    }),
    ...mapState('chess',{
      board: state=>state.board,
      size: state=>state.size,
    })
  },
  methods: {
    openAlertDialog(){
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    handleJoin(index){
      const otherIndex = (index==0)?1:0;
      if(this.playerList[otherIndex].isMe){
        this.handleLeave(otherIndex);
      }
      const color = (index==0)?'black':'white';
      // console.log(color);
      this.playerList[index].user = this.user;
      this.playerList[index].joined = true;
      this.player.color = color;
      this.playerList[index].isMe = true;

    },
    handleLeave(index){
      
      this.playerList[index].user = null;
      this.playerList[index].joined = false;
    }
    
  },
  sockets: {
    connect: function () {
      console.log('#连接到服务器');
      // const userInfo = JSON.parse(sessionStorage.getItem('user'));
      // // const u = this.user || userInfo;
      // // console.log(u);
      // const u = userInfo;
      // this.$socket.emit('connection', u);
      
    },
    res: function(item) {
      this.$store.dispatch('chat/addMessage', item);
    },
    drop: function(para) {
      console.log('#Drop:',para);
      // console.log(para);
      const {x, y, player} = para;
      // const payload = {
      //   x,
      //   y,
      //   color: player.color,
      // }
      // this.$store.dispatch('chess/dropChess', payload);
      this.$refs.chess.dropChess(x, y, player);
      // console.log(this.getWinning(x, y));
    },
    online: function(para) {
      console.log('#online',para);
      para.user.socketId = para.socketId;

      this.$store.dispatch('app/addRoomUserList', para.user);
    },
    offline: function(para) {
      console.log('#offline',para);
      this.$store.dispatch('app/removeRoomUserList', para.socketId);
    },
    updateOnlineList: function(para) {
      const list = para.map(item=>{
        return {
          ...item.user,
          socketId: item.socketId,
        }
      })
      console.log('#updateOnlineList', list);
      this.$store.dispatch('app/updateRoomUserList', list);
    },
    
    
  },
  mounted() {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    this.user = userInfo;
      // const u = this.user || userInfo;
      // console.log(u);
      const u = userInfo;
      this.player.userInfo = u;
      this.$socket.emit('connection', u);
  },
  // beforeDestroy(){
  //   this.$socket.emit('disconnect', this.user);
  // },
}
</script>

<style lang="scss">
.user-display{
  padding: 25px 0;
  .user-item{
    flex: 1;
    display: flex;
    justify-content: center;
    // flex-flow: column;
    .user-item-container{

    }
  }
}

.btn{
  margin-top: 24px;
}

.player-select {

  .select-item{
    // &:hover{
    //   border: 1px solid #2196F3;
    // }
    display: flex;
    height: 72px;
    margin: 8px 0;
    align-items: center;
    padding: 5px 10px;
    // border-radius: 8px;
    // border-bottom: 1px solid #2196F3;
    // border: 1px solid #eeeeee;
    // border: 1px solid #dcdfe6;
    
    .item-title{
      font-size: 18px;
    }
    .player-avatar{
      display: flex;
      align-items: center;
      width: 64px;
    }
    .player-info{
      padding-left: 20px;
      display: flex;
      align-items: center;
      flex: 1;
      
      .gray-text{
        color: #dfdfdf;
      }
      .username{
        font-size: 18px;
        display: inline-block;
        
      }
      
    }
    .function{
      display: flex;
      flex-flow: column;
      // max-width: 60px;
    }
    // .select-item-active{
    //   border-bottom: 1px solid #2196F3;
    // }
    
  }
}
</style>