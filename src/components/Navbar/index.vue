<template>
	<div class="navbar-outer">
		<div id="mobile-bar" class="hide-sm-and-up">
			<div class="menu-button" @click="toggleAsideVisible">
				<img :src="barUrl" alt="">
			</div>
			
			<a class="logo">
				<img :src="logoUrl" alt="">
				<!-- Template -->
			</a>
		</div>
		<el-header id="header" class="hide-sm-and-down">
			
			<a href="#" id="logo">
				<span>Template</span>
				<!-- <el-image src></el-image> -->
			</a>
			
			<!-- <ul id="nav"> -->
				<transition-group id="nav" name="nav-slideLeft" tag="ul">
				<li v-for="(item, index) in navMenu" :key="index" :class="activeNavIndex===index?'active':''" @click="handleClickNav(item, index)">
					<span>{{item.name}}</span>
					<!-- <i class="el-icon-arrow" v-if="item.subNav.length>0"></i> -->
					<!-- <ul class="submenu" v-if="item.subNav.length>0">
						<li v-for="(subItem, _index) in item.subNav" :key="_index">
							<span>{{subItem.name}}</span>
						</li>
					</ul> -->
				</li>
				</transition-group>
			<!-- </ul> -->
			
		</el-header>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'my-navbar',
	data(){
		return {
			showMobileheader: true,
			activeNavIndex: null,
			navMenu: [
				{
					name: 'navGroup1',
					url: '',
					subNav: [
						{
							name: 'subNav1',
							url: ''
						},
						{
							name: 'subNav2',
							url: ''
						}
					]
				},
				{
					name: 'nav2',
					url: '',
					subNav: [],
				},
				{
					name: 'nav3',
					url: '',
					subNav: [],
				},
				{
					name: 'nav4',
					url: '',
					subNav: [],
				},
			],
			logoUrl: require('../../assets/logo.png'),
			barUrl: require('../../assets/sidebar.png')
		}
	},
	methods: {
		handleClickNav(navItem, index) {
			this.activeNavIndex = index;
			this.nav(navItem.url);
		},
		nav(route){
			console.log('nav to '+route);
			// this.$route.push(route);
		},
		toggleAsideVisible(){
			// console.log(this.showAside);
			// if(this.showAside){
			// 	this.$store.dispatch('app/hideAside');
			// }
			// else{
			// 	this.$store.dispatch('app/showAside');
			// }
			this.$store.dispatch('app/toggleAside')
		}
	},
	computed: {
		...mapState('app', {
			showAside: state=>state.showAside,

		})
	}
}
</script>

<style lang="scss">
$navbar-text-color: #000;
$navbar-item-border-active-color: #42b983;

.navbar-outer{
	
}

#header{
	position: fixed;
	// width: 100%;
	left: 210px;
	right: 0;
	top: 0;
	box-shadow: 0 0 1px rgba(0,0,0,0.25);
	height: 40px;
	padding: 10px 60px;
	box-shadow: 0px 1.6px 3.6px rgba(0, 0, 0, 0.13), 0px 0px 2.9px rgba(0, 0, 0, 0.11);
	z-index: 999;
	background-color: #ffffff;
}
#logo{
	display: inline-block;	
	color: $navbar-text-color;
	line-height: 40px;
	
}

#nav{
	// position: fixed;
	position: absolute;
	top: 12px;
	right: 30px;
	display: inline-block;
	// margin-right: 30px;
	height: 40px;
	line-height: 40px;
	
	> li{
		display: inline-block;
		margin: 0 10px;
		cursor: pointer;
		position: relative;
		// overflow: hidden;
		border-bottom: 3px solid #ffffff;
		transition: 0.2s ease-in all;
		// box-sizing: content-box;

		// overflow: visible;

		&:hover {
			// overflow: visible;
			border-bottom: 3px solid $navbar-item-border-active-color;
			// overflow: hidden;
		}
	}
	.active{
		border-bottom: 3px solid $navbar-item-border-active-color;
	}

	.submenu{
		background-color: #ffffff;
		position: absolute;
		top: 38px;
		right: 0;

		// display: inline-block;
		padding: 15px 15px;
		border-radius: 4px;
		z-index: 100;
		border: 1px solid #eaecef;
		// width: 100px;
		// display: inline-block;
		// display: none;
		// &:hover {
		>li {
			height: 32px;
			line-height: 32px;
			&:hover{
				color: $navbar-item-border-active-color;
			}
		}
		// }
	}
}

#mobile-bar{
	position: fixed;
	height: 40px;
	width: 100%;
	top: 0;
	background-color: #ffffff;
	box-shadow: 0px 1.6px 3.6px rgba(0, 0, 0, 0.13), 0px 0px 2.9px rgba(0, 0, 0, 0.11);
	z-index: 999;;
	.menu-button{
		position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    left: 16px;
		img{
			width: 30px;
			height: 30px;
		}
	}

	.logo {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 0;
		width: 32px;
		height: 40px;
		line-height: 40px;
		a{
			display: flex;
			justify-content: center;
			align-items: center;
			// display: inline-block;

		}
		img{
			margin-top: 5px;
			width: 32px;
			height: 32px;
		}
	}
}

.nav-slideLeft-enter{
	transform: translateX(-100%);
}

.nav-slideLeft-enter-active{
	transition: 0.2s ease-in-out all;
}
.nav-slideLeft-leave-active{
	// transform: translate(-100%);
	transition: 0.2s ease-in-out all;
}
.nav-slideLeft-leave-to{
	transform: translateX(-100%);
}

@media screen and (max-width: 780px) {
	.hide-sm-and-down{
		display: none;
	}
	// .aside{
	// 	top: 40px;
	// }
	// $aside-top

}

@media screen and (min-width: 781px) {
	.hide-sm-and-up{
		display: none;
	}

	// .aside{
	// 	top: 60px;
	// }

}
</style>