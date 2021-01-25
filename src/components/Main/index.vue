<template>
  <div class="box-container">
		<!-- <div class="inner-box">
			<div v-for="(item, index) in boxList" :key="index">
				<my-box :poster="item.poster" :name="item.name">
				</my-box>
			</div>
		</div> -->
		<el-row align="middle" :gutter="15">
			<div v-for="(item, index) in boxList" :key="index">
				<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
						<my-box :poster="item.poster" :name="item.name">
						</my-box>
				</el-col>
			</div>
		</el-row>
	</div>
</template>

<script>
import Box from './Box.vue'

export default {
	name: 'my-main-container',
	data(){
		return{
			boxList: [
				{
					poster: require('../../assets/poster2.jpg'),
					routes: '',
					name: 'Super Mario Maker2',
				},
				{
					poster: require('../../assets/poster3.jpg'),
					routes: '',
					name: 'Super Mario Party',
				},
				{
					poster: require('../../assets/poster4.jpg'),
					routes: '',
					name: 'Super Smash Bros',
				},
				{
					poster: require('../../assets/poster5.jpg'),
					routes: '',
					name: 'RingFit Adventure',
				},
				{
					poster: require('../../assets/poster6.jpeg'),
					routes: '',
					name: 'Hades',
				},
				{
					poster: require('../../assets/poster7.jpg'),
					routes: '',
					name: 'Just Dance 2021',
				},
				{
					poster: require('../../assets/poster8.jpg'),
					routes: '',
					name: 'Xenoblade Chronicles',
				}
			]
		}
	},
	components: {
		[Box.name]:Box,
	}
}
</script>

<style lang="scss">
.box-container{
	// width: 100%;
	padding: 20px 20px;
	// margin: 0 auto;
	// display: flex;
	// justify-content: center;
	// background-color: #f0f2f5;

	.inner-box{
		display: flex;
		flex-wrap: wrap;
		// margin: 0 auto;
	}
}



@media screen and (max-width: 640px) {
	
	.box-container {
		display: flex;
		justify-content: center;
		padding: 0;
		// margin-top: 20px;	
		// padding: 20px 20px;
		// .box
	}
	// $aside-top

}
</style>