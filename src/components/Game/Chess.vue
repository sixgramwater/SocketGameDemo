<template>
  <div class="outer-canvas">
    <div id="canvas-container">
      <canvas id="chess"></canvas>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'my-chess-game',
  data() {
    return {
      op: {

      },
      canvas: null,
      ctx: null,
      cellWidth: 30,
      numOfCells: 15, //14
      boardWidth: 450,
      margin: 15,

      openAlert: false,
      winningChess: [],
      
    }
  },
  computed: {
    ...mapState('chess',{
      board: state=>state.board,
      size: state=>state.size,
    }),
    ...mapState('app', {
      pageWidth: state=>state.pageWidth,
      showAside: state=>state.showAside,
      
    })
  },
  // watch: {
  //   '$store.state.app.pageWidth': function(oldVal, newVal) {

  //   }
  // },
  methods: {
    canvasInit() {
      // let opts = op || {};
      // if(opts.boardWidth && opts.boardWidth%15 !== 0) {
      //   console.log('#WIDTH ERROR');
      // }  
      
      // this.col = (opts.width && opts.width/30) || 15;
      let oCanvas = document.getElementById('chess');
      oCanvas.width = 450;
      oCanvas.height = 450;
      this.canvas = oCanvas;
      this.ctx = oCanvas.getContext('2d');
      this.canvas.addEventListener('click', (e)=>{
        this.handleClick(e);
      })
    },
    drawBoard() {
      this.ctx.strokeStyle = "#bfbfbf";
      this.ctx.strokeStyle = "#000000";
      let margin = this.cellWidth/2;
      let cell = this.cellWidth;
      for(let i=0;i<this.numOfCells;i++){
        this.ctx.moveTo(margin+cell*i, margin);
        this.ctx.lineTo(margin+cell*i, cell*this.numOfCells-margin);
        this.ctx.stroke();
        this.ctx.moveTo(margin, margin+cell*i);
        this.ctx.lineTo(cell*this.numOfCells-margin, margin+cell*i);
        this.ctx.stroke();
      }
      // for(let i=0;i<this.col;i++)
    },
    drawChess(x, y, color) {
      x = this.margin + x*this.cellWidth;
      y = this.margin + y*this.cellWidth;
      this.ctx.beginPath();
      // let radius = this.cellWidth * 13/15;
      let radius = 13;
      let offset = 2;
      this.ctx.arc(x, y, radius, 0, Math.PI*2);

      var grd = this.ctx.createRadialGradient(x+offset, y-offset, radius, x+offset, y-offset, 0);
      if(color==='white'){
        grd.addColorStop(0, '#d1d1d1');
        grd.addColorStop(1, '#f9f9f9');
      }
      else{
        grd.addColorStop(0, '#0a0a0a');
        grd.addColorStop(1, '#636766');
      }
      this.ctx.fillStyle = grd;
      this.ctx.fill();
    },  
    handleClick(e){
      let x = Math.round((e.offsetX-this.margin)/this.cellWidth);
      let y = Math.round((e.offsetY-this.margin)/this.cellWidth);
      const userInfo = JSON.parse(sessionStorage.getItem('user'));
      const para = {
        x,
        y,
        player: {
          color: 'white',
          userInfo,
        }
      }
      const player = {
        color: 'white',
        userInfo,
      }
      this.$socket.emit('drop', para);
      this.dropChess(x, y, player);
      // this.drawChess(x, y, 'white');
      
      console.log(`x:${x}; y:${y}`);
    },
    dropChess(x, y, player={}){
      // let para = {
      //   x,
      //   y,
      //   player
      // }
      // this.$socket.emit('drop', para);
      const payload = {
        x,
        y,
        color: player.color,
      }
      // console.log(payload)
      this.$store.dispatch('chess/dropChess', payload);
      // console.log(this.board)
      this.drawChess(x, y, player.color);
      // console.log(this.getWinning(x, y));
    },
    openAlertDialog(){
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    getWinning(x, y) {
      if(this.checkByStep(1, 0, x, y))  return true;
      if(this.checkByStep(0, 1, x, y))  return true;
      if(this.checkByStep(1, 1, x, y))  return true;
      if(this.checkByStep(-1, 1, x, y))  return true;
      return false;
    },
    checkByStep(xdiff, ydiff, x, y){
      const color = this.board[x][y];
      // const color = 0;
      this.winningChess = [];
      for(let i=0;i<5;i++){
        let tempx = x+xdiff*i;
        let tempy = y+ydiff*i;
        if(tempx<0 || tempx>=this.size)  continue;
        if(tempy<0 || tempy>=this.size)  continue;
        // if(x+xdiff*flag<0 || x+xdiff*flag>=this.size)  continue;
        // if(y+ydiff*flag<0 || y+ydiff*flag>=this.size)  continue;
        if(this.board[tempx][tempy]===color){
          this.winningChess.push({
              x: tempx,
              y: tempy,
          })
          // console.log(winningChess);
        }
        else{
          break;
        }
      }
      for(let i=1;i<5;i++){
        let tempx = x-xdiff*i;
        let tempy = y-ydiff*i;
        if(tempx<0 || tempx>=this.size)  continue;
        if(tempy<0 || tempy>=this.size)  continue;
        // if(x+xdiff*flag<0 || x+xdiff*flag>=this.size)  continue;
        // if(y+ydiff*flag<0 || y+ydiff*flag>=this.size)  continue;
        if(this.board[tempx][tempy]===color){
            this.winningChess.push({
                x: tempx,
                y: tempy,
            })
        }
        else{
            break;
        }
      }
      if(this.winningChess.length>=5)  console.log(this.winningChess);
      return this.winningChess.length>=5;
    }
    // 1. read container width 2. choose a close canvas and then decide cell width
    // 3. 
    
  },
  mounted() {
    const payload = {
      size: 14,
    }
    this.$store.dispatch('chess/initBoard', payload);
    this.canvasInit();
    this.drawBoard();
    // window.onresize = () => {
    //   console.log(`canvas: ${document.getElementById('canvas-container').clientWidth}`);
    //   // let that = this;
    //   // this.windowResize();
    //   // return (()=> {
    //   //   // console.log()

    //   //   let containerWidth = document.getElementById('canvas-container').clientWidth;
    //   //   console.log(containerWidth);
    //   //   let canvasWidth = parseInt(containerWidth/15)*15;
    //   //   console.log(canvasWidth);
    //   //   // this.$store.dispatch('app/setPageWidth', pageWidth);
    //   // })();
    // }
  }

}
</script>

<style lang='scss'>
.outer-canvas{
  width: 100%;
  height: 100%;
  #canvas-container{
    width: 100%;
    // height: 100%;
    display: flex;
    // align-items: center;
    justify-content: center;
    // canvas{
    //   // display: absolute;
    //   margin: 0 auto;
    // }
    canvas {
      background-image: url('../../assets/board2.jpg');
    }
  }
}
</style>