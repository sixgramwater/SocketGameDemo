<template>
  <div class="box">
		<div class="poster">
			<el-image :src="poster" fit="contain"></el-image>
		</div>
		<div class="operation">
			<span>{{name}}</span>
			<!-- <transition name="button-width">
			<div class="button like-button left-button" @mouseenter="showLikeArrow = true" @mouseleave="showLikeArrow = false">
				<span>Like</span>
				<transition name="button-hover">
				<i class="el-icon-thirdfavorites-fill" v-show="showLikeArrow"></i>
				</transition>
			</div>
			</transition> -->

			<transition name="button-width">
			<div class="button play-button right-button" @mouseenter="showPlayArrow = true" @mouseleave="showPlayArrow = false">
				<span>Play</span>
				<transition name="button-hover">
				<i class="el-icon-thirdRightarrow" v-show="showPlayArrow"></i>
				</transition>
			</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'my-box',
	data(){
		return{
			// poster: require('../../assets/zelda_poster.jpg'),
			// poster: 'https://tse3-mm.cn.bing.net/th/id/OIP.ekPqJkTCF6e6--duLv5hHgHaLH?w=179&h=268&c=7&o=5&pid=1.7',
			// poster2: 'https://cn.bing.com/images/search?view=detailV2&ccid=IFVQ6woC&id=671BAC51A0CD2E5C8AAB0FD2CB576FD5B6F4295D&thid=OIP.IFVQ6woClmZiTxvwAZxChwHaDt&mediaurl=https%3a%2f%2fstatic1.srcdn.com%2fwordpress%2fwp-content%2fuploads%2f2020%2f06%2fClubhouse-Games-51-Worldwide-Classics-Key-Art.jpg&exph=700&expw=1400&q=club+house+games+51&simid=608031936347177370&ck=359DDE021380DD5A13DDCCC23D9C6789&selectedIndex=2&FORM=IRPRST',
			desc: 'A famous games series developed by Nintendo Inc.',
			showPlayArrow: false,
			showLikeArrow: false,

		}
	},
	props: {
		poster: {
			type: String,
			default: require('../../assets/poster9.webp'),
		},
		name: {
			type: String,
			default: 'GameTitle'
		}
	}

}
</script>

<style lang="scss">
$box-width: 320px;
$poster-height: $box-width/1.8;

$play-button-background-color: #79ad9f;
.box{
	// margin: 0 auto;
	// position: absolute;
	// left: 50%;
	// // transform: translateX(-50%);
	// // transform: translateY(-50%);
	// top: 50%;
	z-index: 10;
	// border-radius: 8px;
	max-width: $box-width;
	// height: 250px;
	// border-radius: 5px;
	cursor: pointer;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	// margin: 10px 0;
	margin-bottom: 25px;
	overflow: hidden;
	&:hover{
		transform: translateY(-3px);
		box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.3);
		transition: 0.3s all ease-in;
	}
	.poster{
		height: $poster-height;
		width: $box-width;
		
		// background: rgb(65, 70, 65);
		// background-color: #ffeead;
		overflow: hidden;
		transition: filter 200ms ease-in-out 0s, transform 300ms cubic-bezier(0.095, 1.65, 0.775, 0.855) 0s, opacity 200ms linear 0s;;
		&:hover{
			// filter: blur(1px)
			filter: brightness(0.7);
			// filter: opacity(30%);
			// filter: sepia(30%);
			// filter: drop-shadow(8px 8px 10px);
		}
	}

	.operation{
		height: 52px;
		display: flex;
		padding: 0 8px;
		// justify-content: center;
		align-items: center;
		background-color: #ffffff;
		> span{
			font-weight: 500;
		}
		// background-color: #ffffba;
		.button{
			height: 32px;
			// line-height: 36px;
			box-sizing: border-box;
			display: inline-block;
			border-radius: 20px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
			padding: 6px 16px;
			color: #ffffff;
			// background-color: #74e0aa;
			transition: 0.25s width ease;
			// margin-right: 15px;
			span{
				// line-height: 36px;
				font-size: 14px;
			}
			&:hover{
				// width: 60px;
				// transform: scaleX(1.1);
				
			}
			
		}
		.play-button{
			color: #ffffff;
			background-color: #96ceb4;
			// background-color: $play-button-background-color;
			// background-color: #ff6f69;
		}

		.like-button{
			color: #ffffff;
			background-color: #ff6f69;
		}

		.operation-button{
			margin-right: 0;
		}

		.left-button{
			
		}
		.right-button{
			margin-left: auto;
			// margin-right: 0;
			// flex: 1;
			// text-align: right;
			// right: 0;;
		}
	}
	
	.button-hover-enter{
		opacity: 0;
		transform: translateX(-50%);
	}
	.button-hover-enter-active,
	.button-hover-leave-active{
		transition: 0.25s all ease;
	}
	.button-hover-leave-to{
		opacity: 0;
		transform: translateX(-50%);
	}

	
}
</style>