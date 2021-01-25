<template>
  <div class="message-input">
    <div class="inner-input">
      <mu-text-field v-model="input" placeholder="please input..." action-icon="send" :action-click="handleSend"></mu-text-field>
    </div>
    <div class="input-func">
      <!-- func -->
      <i class="el-icon-thirdsmile icon"></i>
      <i class="el-icon-thirdall icon"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'my-message-input',
  data() {
    return {
      input:'',
    }
  },
  methods: {
    handleSend() {
      let payload = {
        userName: this.user.userName,
        avatar: 'teal',
        message: this.input,
        date: Date.now(),
      }
      this.$store.dispatch('chat/addMessage', payload);
      // let para = {
      //   user: this.user,
      //   msg: this.input,
      // }
      this.$socket.emit('chat', payload);
      this.$message({
        type: 'success',
        message: '发送成功',
      })
      this.input = '';
      this.$emit('scrollchat');
    }
  },
  computed: {
    ...mapState('user', {
      user: state =>state.user
    })
  }

}
</script>

<style lang='scss'>
.message-input{
  width: 100%;
  display: flex;
  padding: 6px 8px;
  height: 48px;
  .icon {
    height: 36px;
    width: 36px;
  }
  // background: #dcdcdc;
  
}
.inner-input{
  padding-left: 12px;
  flex:1;
  border-radius: 24px;
  background-color: #ffff;
  transform:translateY(-2px)
}
.input-func{
  // display: inline-block;
  width:  80px;
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  .icon{
    font-size: 32px;
    height: 32px;
    width: 40px;
    display: inline-block;
    // line-height: ;
    // line-height: s24px;
  }
}
</style>