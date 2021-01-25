<template>
	<div class="chat-container" ref="chat">
    
    <transition-group name="fadeup">
    <div class="message-container" v-for="(item) in msgList" :key="item.id">
      <my-message-item :item="item"></my-message-item>
    </div>
    </transition-group>
    
    <div :class="['input-container',(!isMobile && showAside)?'input-has-margin':'input-no-margin']">
      <my-message-input></my-message-input>
    </div>
		<!-- <el-input data></el-input> -->
	</div>
</template>

<script>
// 什么时候需要靠左？!mobile且showAside
// 什么时候不需要？ 
// pageWidth>780: showAside, !showAside,
// pageWidth<780: showAside, !showAside,
import Item from './Item.vue'
import Input from './Input.vue'
import { mapState } from 'vuex'
export default {
  components: {
    [Item.name] : Item,
    [Input.name]: Input,
  },
  computed: {
    ...mapState('chat', {
      msgList: state=>state.msgList,
    }),
    ...mapState('app',{
      pageWidth: state=>state.pageWidth,
      showAside: state=>state.showAside,
      isMobile: state=>state.isMobile,
    }),
    returnMsgList() {
      return this.msgList.length;
    }
  },
	mounted(){
    // this.$socket.emit('')
  },
  data(){
    return{
      msg: '',
      socket: null,
      respond: '',
    
    }
  },
  sockets: {
    connect: function () {
      console.log('#连接到服务器')
      
    },
    res: function(item) {
      this.$store.dispatch('chat/addMessage', item);
    },
    
  },
  watch: {
    returnMsgList(){
      this.handleScroll()
    }
  },
	methods: {
    handleSend(){
      this.$socket.emit('chat', this.msg);
      
      // this.socket.emit('ping', this.msg);
      // this.$socket.emit('ping', this.msg);
    },
    handleScroll() {
      console.log("滚动")
      this.$nextTick(()=>{
        // this.$refs.chat.scrollTop = 1000
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        // console.log(this.$refs.chat.scrollTop);
        // console.log(this.$refs.chat.scrollHeight);
      })
    },
  
// 		init(){
// 			const log = console.log;
//       const socket = io('http://localhost:7001/', {

//     // 实际使用中可以在这里传递参数
//       query: {
//         room: 'demo',
//         userId: `client_${Math.random()}`,
//       },

      
//     });

//     socket.on('connect', () => {
//       const id = socket.id;

//       log('#connect,', id, socket);

//       // 监听自身 id 以实现 p2p 通讯
//       socket.on(id, msg => {
//         log('#receive,', msg);
//       });
//     });

//     // 接收在线用户信息
//     socket.on('online', msg => {
//       log('#online,', msg);
//     });

//     // 系统事件
//     socket.on('disconnect', msg => {
//       log('#disconnect', msg);
//     });

//     socket.on('disconnecting', () => {
//       log('#disconnecting');
//     });

//     socket.on('error', () => {
//       log('#error');
//     });

//     window.socket = socket;
//     this.socket = socket;
// // window.onload = function() {
// //   // init
  
// // };
//     },
//     init2(){
      
//       this.socket = socket;
//       socket.on('connect', () => {
//         const id = socket.id;

//         log('#connect,', id, socket);

//         // 监听自身 id 以实现 p2p 通讯
//         // socket.on('res', msg => {
//         //   log('#receive,', msg);
//         // });
//       });
      
//     },
//     handleSend() {
//       console.log(this.msg);
//       this.socket.emit('ping', this.msg);
//     }
	},
}
</script>

<style lang='scss'>
  .message-container{
    width: 100%;
    padding: 12px 10px;
  }
  // scroll 相关知识：设定max-height:100%; 然后overflow-y:scroll.
  // 这样就不会将父元素高度撑开
  .chat-container{
    // padding-top: 30px;
    // height: 100vh;
    padding-top: 15px;
    max-height: 100%;

    // height: calc(100vh-64px);

    overflow-y: scroll;
    background-color: #F9F9F9;
    padding-bottom: 64px;
    // margin-top: 30px;
  }
  .input-container{
    // width: 100%;
    position: fixed;
    // left: ;
    left: 210px;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .20), 0 0 6px rgba(0, 0, 0, .14)
    // box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.25);
  }
  .fadeup-enter{
    transform: translateY(40%);
    opacity: 0;
  }
  .fadeup-enter-active,
  .fadeup-leave-active{
    transition: 0.2s ease all;
  }
  .input-has-margin{
    left:210px;
  }
  .input-no-margin{
    left: 0;
  }
  // fadeup-{

  // }
</style>