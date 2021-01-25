<template>
  <div class="random-container">
    <div class="random-view">
      <h1 class="title">What's for food?</h1>
      <!-- <transition name='random'> -->
        <div class="random-item">
          <transition-group name='random'>
          <div v-for="item in renderList" :key=item.id>
            <span>{{item.text}}</span>
          </div>
          
          </transition-group>
        </div>
      <!-- <div v-for="(idx, index) in renderList" :key="index" class="random-list"> -->
        <!-- <span>{{baseList[idx]}}</span> -->
        <!-- <span v-if="prepare">What is today's food?</span> -->
        <!-- <span>{{baseList[idx]}}</span> -->
      <!-- </div> -->
      <!-- </transition> -->
      <mu-flex justify-content="center" class="random-btn">
        <mu-button color="primary" @click="roll">Roll</mu-button>
      </mu-flex>
    </div>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      idx: 0,
      curText: 'Ready to Roll?',
      renderList: [
        {
          id: -1,
          text: 'Ready to roll?'
        },
        // {
        //   id: -1,
        //   text: 'hidden'
        // }
      ],
      prepare: true,
      baseList : [
        {
          id: 0,
          text: '汉堡',
        },
        {
          id: 1,
          text: '饺子'
        },
        {
          id: 2,
          text: '牛肉面'
        },
        {
          id: 3,
          text: '火锅'
        },
        {
          id: 4,
          text: '宫保鸡丁'
        },
        {
          id: 5,
          text: '炒饭'
        },
        {
          id: 6,
          text: '麻辣香锅'
        },
        {
          id: 7,
          text: '炸鸡'
        },
        {
          id: 8,
          text: '汤圆'
        },
      ]
    }
  },
  methods: {
    roll() {
      const len = this.baseList.length;
      let temp = this.getRandomIndex(len);
      while(temp == this.idx) {
        temp = this.getRandomIndex(len);
      }
      this.idx = temp;
      // this.idx = this.getRandomIndex(this.baseList.length);
      this.curText = this.baseList[this.idx].text;
      this.pushItem(this.baseList[this.idx]);
      // this.renderList.unshift(this.baseList[this.idx]);
      // this.renderList[0] = this.baseList[this.idx];
    },
    pushItem(item){
      this.renderList.unshift(item);
      this.renderList.pop();
    },
    getRandomIndex(length){
      return Math.floor(Math.random() * length);
    }
  },
}
</script>

<style lang="scss">
.random-view{
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translateX(-50%);
  // transform: translateY(-50%);
  // width: 100%;
  width: 100vw;
  // height: 100vh;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  // align-items: center;
}
.title{
  text-align: center;
  // h1 {
  //   text-align: center;
  // }
}
.random-item{
  // padding-top: 20px;
  // height: 240px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // display: inline-block;
  // width: 320px;

  text-align: center;
  span{
    display: inline-block;
    // overflow: hidden;
    height: 30px;
    line-height: 30px;
    // text-align: center;
    font-size: 22px;
  }
  // width: ;
  // position: relative;
}
.random-btn{
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
}

.random-enter{
  opacity: 0;
  transform: translateY(-200%);
}


.random-leave-active{
  opacity: 1;
  transition: 0.1s linear all;
}
.random-enter-active{
  opacity: 1;
  transition: 0.2s linear all;
  // transition-delay: 0.25s;
}
.random-leave-to{
  opacity: 0;
  transform: translateY(200%);
}
</style>