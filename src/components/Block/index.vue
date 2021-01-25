<template>
  <div class="block-app" ref="block-app">
    <div class="block-bg bg1" ref="block-bg1" v-show="showBg1">
      <div class="block-line" v-for="(blockIndex, row) in blocks" :key="row">
        <div :class="['block-item',(blockIndex===col)?'block-target':'', (wrongCol === col && curRow === row)?'wrong-col':'']"
         v-for="col in line" 
         :key="col"
         @click="handleClick(row, col, 1)">
          <!-- <div :class="['block',(pos===blockIndex)?'block-target':'']" @click="handleClick(line, blockIndex)">

          </div> -->
        </div>
      </div>
    </div>
    <div class="block-bg bg2" ref="block-bg2" v-show="showBg2">
      <div class="block-line" v-for="(blockIndex, row) in blocks_2" :key="row">
        <div :class="['block-item',(blockIndex===col)?'block-target':'']"
         v-for="col in line" 
         :key="col"
         @click="handleClick(row, col, 2)">
          
        </div>
      </div>
    </div>
    <div class="block-score">
      <h1>Time: {{remainTime | timeFormat}}</h1>
      <h1>Points: {{score}}</h1>
    </div>
    <!-- <div class="dialog"> -->
      <mu-dialog title="Start Game" class="dialog" overlay-close="false" width="360" :open.sync="showStart">
        <mu-flex justify-content="center">
          <span>Do not tap white block!</span>
        </mu-flex>
        <!-- <div class="dialog-text">
          
        </div> -->
        <mu-flex justify-content="center">
          <mu-button color="primary" @click="restart">Start</mu-button>

          <!-- <mu-button @click="openAlertDialog">Open Dialog</mu-button> -->
        </mu-flex>
        <!-- <mu-button color="primary" @click="restart">Start</mu-button> -->
      </mu-dialog>
    <!-- </div> -->
    <!-- <div class="dialog"> -->
      <mu-dialog title="GameOver" class="dialog" overlay-close="false" width="360" :open.sync="showStop">
        <mu-flex justify-content="center">
          <p>Your score: {{score}}</p>
          <p>High score: {{highScore}}</p>
        </mu-flex>
          <!-- <p>Your score: {{score}}</p>
          <p>High score: {{highScore}}</p>
        </div> -->
        <mu-flex justify-content="center">
          <mu-button color="primary" @click="restart">Restart</mu-button>

          <!-- <mu-button @click="openAlertDialog">Open Dialog</mu-button> -->
        </mu-flex>
        <!-- <mu-button color="primary" @click="restart">Restart</mu-button> -->
      </mu-dialog>
    <!-- </div> -->

    <!-- <div class="block-"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: [0,1,2,2,3,3,1,2,3,1],
      blocks_2: [0,1,2,2,3,3,1,2,3,1],
      line: [0, 1, 2, 3],
      score: 0,
      offset1: 0,
      offset2: -1000,
      clientHeight: 0,
      safeDistance: 0,
      blocksHeight: 1000,
      blockHeight: 150,
      blockNum: 20,
      showBg1: true,
      showBg2: true,
      timer: null,
      interval: null,
      showStart: true,
      showStop: false,
      highScore: 0,
      startTime: null,
      remainTime: 0,
      totalTime: 20,
      playing: false,
      wrongCol: -2,
      curRow: 0,
    }
  },
  methods: {
    handleClick(row, coloum, bg){
      if(!this.playing)  return false;
      // const temp_offset = (bg===1)?this.offset1: this.offset2;
      let curRow = this.curRow;
      let temp_block = (bg===1)?this.blocks: this.blocks_2;
      // const curRow = row;
      // let curRow = Math.floor(temp_offset/this.blockHeight);
      if(curRow === -1){
        temp_block = this.blocks;
        curRow = 0;
      }
      // temp_block = (curRow === -1)? this.blocks: temp_block;
      if ( temp_block[curRow] !== coloum){
        // alert(`row: ${row};rightRow: ${curRow};col: ${coloum}; rightCol: ${temp_block[row]}`);
        this.wrongCol = coloum;
        this.gameover();
        return false;
      }
      this.score++;
      if(bg===1){
        this.blocks[curRow] = -1;
      }else{
        this.blocks_2[curRow] = -1;
      }
      // console.log(bg);
      this.curRow = (this.curRow + 1)%this.blockNum;
      console.log(row, coloum);
     
      this.offset1 += this.blockHeight;
      this.offset2 += this.blockHeight;

      this.$refs["block-bg1"].style.transform = `translate3d(0,${this.offset1}px,0)`;
      this.$refs["block-bg2"].style.transform = `translate3d(0,${this.offset2}px,0)`;
      const totalHeight = this.blockHeight*this.blockNum;
      if(this.offset1 >= -(totalHeight-2*this.blockHeight)){
        this.showBg1 = true;
      }
      if(this.offset2 >= -(totalHeight-2*this.blockHeight)){
        this.showBg2 = true;
      }


      if(this.offset1>=totalHeight){
        this.showBg1 = false;
        // this.$refs["block-bg1"].style.display = `hidden`;
        this.$refs["block-bg1"].style.transform = `translateY(${totalHeight}px)`;
        // this.$refs["block-bg1"].style.display = `flex`;
        // this.$refs["block-bg1"].style.transition = ``;
        // this.$refs["block-bg1"].style.bottom = `1000px`;
        this.offset1 = -totalHeight;
        this.blocks = this.createRandomArray(this.blockNum);
        // console.log("block1", this.blocks);
      }
      if(this.offset2>=totalHeight){
        this.showBg2 = false;
        // this.$refs["block-bg2"].style.display = `hidden`;
        this.$refs["block-bg2"].style.transform = `translateY(${totalHeight}px)`;
        // this.$refs["block-bg2"].style.bottom = `1000px`;
        this.offset2 = -totalHeight;
        this.blocks_2 = this.createRandomArray(this.blockNum);
        // console.log("block2", this.blocks_2);
      }
      
      
      // this.safeDistance -= 100;
    },
    createRandomArray(num){
      let temp = [];
      for(let i = 0; i < num; i++){
        let random = Math.floor(Math.random()*4);
        temp.push(random);
      }
      return temp;
    },
    restart(){
      this.init();
      this.playing = true;
      this.showStop = false;
      this.showStart = false;
      if(this.timer){
        clearTimeout(this.timer);
      }
      this.startTime = (new Date()).getTime();
      const total = this.totalTime*1000;
      this.timer = setTimeout(()=>{
        this.gameover();
      }, total);
      if(this.interval){
        clearInterval(this.interval);
      }
      this.interval = setInterval(()=>{
        this.remainTime = total - this.getSpendedTime();
      }, 100);
    }, 
    getSpendedTime(){
      return (new Date()).getTime() - this.startTime;
    },
    gameover(){
      this.playing = false;
      this.remainTime = 0;
      clearTimeout(this.timer);
      clearInterval(this.interval);
      if(this.score>this.highScore){
        this.highScore = this.score;
      }
      this.showStop = true;
    },
    init(){
      this.blocks = this.createRandomArray(this.blockNum);
      this.blocks_2 = this.createRandomArray(this.blockNum);
      this.offset1 = 0;
      this.offset2 = -(this.blockHeight*this.blockNum);
      // this.points = 0;
      this.score = 0;
      this.wrongCol = -2;
      this.curRow = 0;
      this.$refs["block-bg1"].style.transform = `translateY(${this.offset1}px)`;
      this.$refs["block-bg2"].style.transform = `translateY(${this.offset2}px)`;
    }
  },
  filters: {
    timeFormat(time){
      const sec = Math.floor(time/1000);
      const res = (time-sec*1000);
      return `${sec}' ${res}"`

      // const sec = Math.floor(time/1000);
      // const rest = Math.floor(time-sec*1000)
    },
  },
  mounted() {
    this.init();
    // this.clientHeight = document.documentElement.clientHeight;
    // console.log("clientHeight", this.clientHeight);
    // this.blocks = this.createRandomArray(this.blockNum);
    // this.blocks_2 = this.createRandomArray(this.blockNum);
    // this.safeDistance = this.blocksHeight - this.clientHeight + 1000;
    // this.offset1 = 0;
    // this.offset2 = -(this.blockHeight*this.blockNum);
    // this.$refs["block-bg1"].style.transform = `translateY(${this.offset1}px)`;
    // this.$refs["block-bg2"].style.transform = `translateY(${this.offset2}px)`;
  },
  beforeDestroy(){
    clearTimeout(this.timer);
    this.timer = null;

  }

}
</script>

<style lang="scss">
$blockHeight: 150px;
.block-app{
  position: relative;
  display: flex;
  flex-flow: column-reverse;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .block-bg{
    position: absolute;
    // height: 100vh;
    // transform: translateY(-200px);
    transition: 0.16s linear all;
    // bottom: 0;
    // overflow: hidden;
    max-width: 640px;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-flow: column-reverse;
    // min-width: 280px;
    .block-line{
      // height: 100px;
      height: $blockHeight;
      display: flex;
      .block-item{
        flex: 1;
        border: 1px #4f4f4f solid;
        transition: 0.15s ease-out all;
      }
      .block-item .active{
        border-color: aqua;
      }
      .block-target{
        background-color: #B1C2DE;
      }

      .wrong-col{
        background-color: red;
      }
    }
  }
  .bg1{
    // transform: translateY(0);
    bottom: 0;
    z-index: 1;
  }
  .bg2{
    bottom: 0;
    z-index: 2;
    // bottom: 1000px;
    // transform: translateY(-1000);
  }
  .block-score{
    z-index: 3;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    h1{
      text-align: center;
      font-weight: 500;
      font-size: 24px;
    }
  }
  
  .dialog{
    .dialog-text{
      display: flex;

      justify-content: center;
      align-items: center;
      height: 120px;
      padding: 30px 5px;
    }
  }
  
}
</style>