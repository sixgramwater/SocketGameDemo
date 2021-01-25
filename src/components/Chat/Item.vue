<template>
	<div class="chat-item">
		<!-- <div class="avatar">
			avatar
		</div> -->
		<div class="avatar-container">
			<mu-avatar :color="item.avatar" >	
				{{item.userName.slice(0, 1).toUpperCase()}}
			</mu-avatar>
		</div>
		
		<div class="chat-item-details">
			<div class="detail-header">
				<!-- <div ></div> -->
				<span class="name">{{item.userName}}</span>
				<span class="id"></span>
				<span class="date">{{item.date}}</span>
			</div>
			<div class="detail-main">
				<span>{{item.message}}</span>
				<!-- <span>I think this message will show below, and I am going to test the view when it is multiple lines and let us see what is going to look like when </span> -->
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'my-message-item',
	data() {
		return {
			// item: {
			// 	avatar:'indigo',
			// 	userName: 'sixgramwater',
			// 	date: '2020-12-10 12:23',
			// 	message: 'I think this message will show below, and I am going to test the view when it'
			// }
		}
	},
	props: {
		item: {
			// required: true,
			type: Object,
			default: ()=>{
				return {
					avatar:'indigo',
					userName: 'sixgramwater',
					date: '2020-12-10 12:23',
					message: 'I think this message will show below, and I am going to test the view when it'
				}
			},
		}
	}
}
</script>

<style lang="scss">
$chat-item-background-color: #fff;

.chat-item{
	display: flex;
	width: 100%;
	justify-content: left;
	align-items: center;
	
	.chat-item-details{
		background-color: $chat-item-background-color;
		margin-left: 15px;
		padding: 10px 15px;
		border-radius: 12px;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
		.detail-header{
			// display: inline-block;

			span + span{
				margin-right: 8px;
			}
			.name{
				font-size: 16px;
				font-weight: 500;
			}

			.id{
				font-size: 14px;
			}
			.date{
				font-size: 14px;
				color: #bdbdbd;
			}
			// height: ;
		}
		.detail-main{
			display: inline-block;
			line-height: 18px;
		}
	}
	// padding: 
}
</style>