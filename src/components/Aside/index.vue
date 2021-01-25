<template>
	
	<div>
		<transition name="aside-transition">
		<aside class="aside" v-show="visible">
			<div class="aside-inner">
				<ul class="menu top-menu">
					<li v-for="(item, index) in asideMenu" :key="index">
						<i :class="item.icon"></i>
						<span>{{item.name}}</span>
					</li>
					<!--  -->
				</ul>
			</div>
		</aside>
		</transition>
		<div class="aside-mask hide-sm-and-up"  v-show="visible" @click.stop.prevent="handleClickMask"></div>
	</div>
	
</template>

<script>
export default {
	name: 'my-aside',
	data() {
		return {
			asideMenu: [
				{
					name: 'Products',
					icon: 'el-icon-thirdproduct',
					subMenu: [
						{}
					]
				},
				{
					name: 'Chatting',
					icon: 'el-icon-thirdservice',
				},
				{
					name: 'Competetion',
					icon: 'el-icon-thirdvs',
				},
				{
					name: 'Vip',
					icon: 'el-icon-thirdvip',
				}
			]

		}
	},
	computed: {

	},
	methods: {
		handleClickMask(){
			this.$store.dispatch('app/hideAside');
		}
	},
	props: {
		visible: {
			type: Boolean,
			default: true,
		}
	}
}
</script>

<style lang="scss">
$aside-background-color: #304156;
$aside-text-color: #bfcbd9;
$aside-background-color-hover: #263445;
$aside-text-color-hover: #fff;
$aside-text-color-active:#409EFF;
$aside-width: 210px;
$aside-top: 0;

.aside{
	width: $aside-width;
	height: 100%;
	position: fixed;
	// top: 60px;
	left: 0;
	bottom: 0;
	z-index: 1001;

	// padding-top: 60px;
}
.aside-inner{
	padding-top: 60px;
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
	// box-sizing: border-box;
	background-color: $aside-background-color;
	
}
.menu{
	// padding-top: 60px;
	list-style: none;
	padding: 0;
	width: 100%;
	user-select: none;
	cursor: default;
	> li {
		// color: ;
		display: inline-block;
		height: 56px;
		line-height: 56px;
		padding: 0 15px;
		box-sizing: border-box;;
		width: 100%;
		cursor: pointer;
		transition: background-color 0.25s ease;
		&:hover{
			background-color: $aside-background-color-hover;
			// color: $aside-text-color-hover;
		}

		> i{
			// padding: 8px 10px;
			display: inline-block;
			padding: 0 16px;
			font-size: 22px;
			transform: translateY(3px);
			color: $aside-text-color;
		}

		> span {
			font-size: 16px;
			color: $aside-text-color;
		}
		
	}
	.active{

	}
}

.aside-mask{
	// position:absolute;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	// left: $aside-width;
	z-index: 1000;
	cursor: pointer;
	background:rgba(0, 0, 0, 0.4);
	filter:alpha(opacity=60);
	// buttom: 0;
}

.aside-transition-enter, 
.aside-transition-leave-to {
	transform: translateX(-100%);
}
.aside-transition-enter-active,
.aside-transition-leave-active{
	transition: 0.25s all ease;
}

// @media screen and (max-width: 900px) {
// 	.hide-sm-and-down{
// 		display: none;
// 	}

// }

// @media screen and (min-width: 901px) {
// 	.hide-sm-and-up{
// 		display: none;
// 	}

// }

@media screen and (max-width: 780px) {
	
	.aside{
		top: 0;
	}
	// $aside-top

}

@media screen and (min-width: 781px) {

	.aside{
		top: 0;
	}

}
</style>