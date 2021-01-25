<template>
  <div class="home">
    <!-- <my-navbar></my-navbar> -->
    <div :class="['bar', (!isMobile && showAside)?'bar-has-margin':'bar-no-margin']">
      <mu-appbar color="teal">
        <mu-button icon slot="left" @click="toggleAsideVisible">
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        Menu
      </mu-appbar>
    </div>
    
    <my-aside :visible="showAside"></my-aside>
    <div :class="['main-container', (!isMobile && showAside)?'main-has-main':'main-no-margin']" id="main">
      <transition name="fade">
         <router-view></router-view>
      </transition>
      <!-- <my-main-container></my-main-container> -->
     
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar/index.vue'
import Aside from '@/components/Aside/index.vue'
// import debounce from '@/utils/index.js'
// import MainContainer from '@/components/Main/index.vue'

export default {
  name: 'Home',
  components: {
    [Navbar.name]: Navbar,
    [Aside.name]: Aside,
    // [MainContainer.name]: MainContainer,
  },
  data(){
    return {
      timer: null,
      isMobile: false,
    }
  },
  computed: {
    ...mapState('app', {
      showAside: state=> state.showAside,
      pageWidth: state=>state.pageWidth,
    })
  },
  watch: {
    
    pageWidth(val){
      if(val<780){
        this.isMobile = true;
        this.$store.dispatch('app/setIsMobile', true);
        this.$store.dispatch('app/hideAside');
      }
      else {
        this.isMobile = false;
        // if()
        this.$store.dispatch('app/setIsMobile', false);
        this.$store.dispatch('app/showAside');
      }
      // if(!this.timer) {
      //   this.pa
      // }
    },
    methods: {
      windowResize(){
        let pageWidth = document.body.clientWidth;
        this.$store.dispatch('app/setPageWidth', pageWidth);
      }
    }
  },
  methods: {
    toggleAsideVisible(){
      this.$store.dispatch('app/toggleAside');
    },
    pageResize() {
      let pageWidth = document.body.clientWidth;
      // debounce(()=>{console.log(pageWidth)},200,true)
      console.log(pageWidth);
      this.$store.dispatch('app/setPageWidth', pageWidth);
    }
  },
  mounted(){
    // 监听窗口大小
    // let that = this;
    let pageWidth = document.body.clientWidth;
    this.$store.dispatch('app/setPageWidth', pageWidth);
    let resizeTag = true;
    window.onresize = () => {
      // 防抖 debounce
      if(resizeTag) {
        console.log(pageWidth);
        pageWidth = document.body.clientWidth;
        resizeTag = false;
        setTimeout(()=>{
          resizeTag = true;
        }, 500);
      }
      // debounce(that.pageResize(), 200, true);
      // debounce(function(){
      //   let pageWidth = document.body.clientWidth;
      //   // debounce(()=>{console.log(pageWidth)},200,true)
      //   console.log(pageWidth);
      //   that.$store.dispatch('app/setPageWidth', pageWidth);
      // }, 500, true)
      // return (()=> {
      //   // console.log()
      //   let pageWidth = document.body.clientWidth;
      //   // debounce(()=>{console.log(pageWidth)},200,true)
      //   console.log(pageWidth);
      //   this.$store.dispatch('app/setPageWidth', pageWidth);
      // })();
    }
  },
  destroyed() {
    window.onresize = null;
  }
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active{
  opacity: 1;
  transition: 0.2s ease all;
}
.fade-enter{
  opacity: 0;
}
.fade-leave-to{
  opacity: 0;
}
.main-container{
  padding-top: 56px;
  padding-left: 210px;
  // width: 100%;
  height: 100vh;
  z-index: 0;
  overflow-y: hidden;
  // background-color: beige;
}
.home{
  height: 100%;
}
.bar{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  margin-left: 210px;
  transition: 0.25s all ease;
}
.bar-has-margin{
  margin-left: 210px;
}
.bar-no-margin{
  margin-left: 0;
}
.main-has-margin{
  padding-left: 210px;;
}
.main-no-margin{
  padding-left: 0;
}
@media screen and (max-width: 780px) {
  .main-container{
    // margin-top: 56px;
    // margin-left: 0;
    padding-top: 56px;
    padding-left: 0;;
  }
  .bar{
    margin-left: 0;;
  }
  

}
</style>