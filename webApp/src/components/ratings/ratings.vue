<template>
  <div class='ratings'>
    <div class="mark-wrapper">
    	<div class='score'>
    		<div class='mark'>
    		<span class='num'>3.9</span>
    		<span class='title'>综合评分</span>
    		<span class="desc">高于周边商家</span></div>
    	</div>

    	<div class='markStar'>
    		<ul>
    			<li>
    				<span>服务态度</span>
    				<div class='star-wrapper'>
              <star :star='seller.score' :size='36'></star>
            </div>
            <span class='scores'>4.3</span>
    			</li>
    			<li>
    				<span>服务态度</span>
    				<div class='star-wrapper'>
              <star :star='seller.score' :size='36'></star>
            </div>
            <span class='scores'>3.9</span>
    			</li>
    			<li><span>送达时间</span> 40分钟</li>
    		</ul>
    	</div>
    </div>
    <div class='gap'>
    	
    </div>
    <div class='approve'>
    	<ul>
    		<li>全部57</li>
    		<li>满意47</li>
    		<li>不满意10</li>
    	</ul>
    </div>
    <div class='choose'>
    	<i class='icon icon-check_circle'></i>
    	<span>只看内容的评价</span>
    </div>
    <div class='satisf-wrapper'>
    	<ul>
    		<li  class='satisf-list' v-for='item in ratings'>
    			<div class='pic'>
    				<img :src="item.avatar" alt="">
    			</div>
    			<div class="content">
    				<div class='user'>{{item.username}}<span>2016-07-13 20:00</span></div>
    				
    				<div class='star-wrapper'>
              <star :star='item.score' :size='12'></star>
            </div>
            <span class='time'>{{item.deliveryTime}}分钟</span>
            <p class='text'>{{item.text}}</p>
            <div class='thumb'>
            	<i class="icon icon-thumb_up"></i>
            	<span class='icon icon-thumb_down' v-if="item.rateType<=3"></span>
            </div>
    			</div>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
import star from '../star/star.vue';
export default {
	data(){
		return {
			ratings:[]
		}
	},
	props:{
  	seller:{
  		return:Object
  	}
  },
	created(){
		this.$http.get('/api/ratings').then(response=>{
			this.ratings = response.body.data;
		})
	},

	// methods:{
	// 	item.rateType = 1;
	// 	icon-thumb_up
	// }

  components:{
  	star,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' scoped>
@import '../../common/mixins.scss';
 .ratings{
 	.mark-wrapper{
 		display: flex;
 		.score{
 			flex:0 0 137px;
 			width:137px;
 			margin:18px auto;
 			border-right:1px solid #ccc;
 			.mark{
 				span{
 					display: block;
 					text-align: center;
 					&.num{
 						font-size: 24px;
 						color:rgb(255,153,0);
 						line-height: 28px;
 					}
 					&.title{
 						padding:6px 0 8px 0;
 						font-size: 12px;
 						color:rgb(7,17,27);
 						line-height: 18px;
 					}
 					&.desc{
 						padding-bottom:6px;
 						font-size: 10px;
 						color:#bbb;
 						line-height: 10px;
 					}
 				}
 			}
 		}
	 	.markStar{
	 		flex:1;
	 		margin:18px auto;
	 		ul{
	 			padding-left:24px;
	 			li{
	 				padding-bottom: 8px;
	 				font-size: 12px;
	 				color:rgb(7,17,27);
	 				span{
	 					padding-right:12px;
	 					display: inline-block;
	 					line-height: 18px;
	 					&.scores{
	 						color:orange;
	 					}
	 				}
	 				.star-wrapper{
	 					display: inline-block;
	 					vertical-align: top;
	 				}
	 			}
	 		}
	 	}
 	}
 	.gap{
 		width:100%;
 		height: 30px;
 		background: #eee;
 	}
 	.approve{
 		ul{
 			margin:18px 18px auto 18px;
 			padding-bottom:18px;
 			font-size: 0;
 			@include border-1px(#ddd);
 			li{
 				display: inline-block;
 				margin-right: 10px;
 				font-size: 16px;
 				padding:13px 10px;
 				background:blue;
 			}
 			li:first-child{
 				background:#00a0dc;
 			}
 			li:nth-child(2){
 				background:#ccecf8;
 			}
 			li:last-child{
 				background:#e9ebec;
 			}
 		}
 	}

 	.choose{
 		padding-top:18px;
 		padding-left:18px;
 		padding-bottom:18px;
 		line-height: 50px;
 		@include border-1px(#ccc);
 		i{
 			display: inline-block;
 			font-size: 20px;
 			color:#bbb;
 		}
 		span{
 			display: inline-block;
 			color:#bbb;
 		}
 	}
 	.satisf-wrapper{
 		ul{
 			margin:0 18px;
	 		.satisf-list{
	 			display: flex;
	 			padding:18px 0;
	 			@include border-1px(#ddd);
		 		.pic{
		 			flex:0 0 28px;
		 			margin-right: 12px;
		 			width:28px;
		 			img{
		 				width:100%;
		 			}
		 		}
		 		.content{
		 			flex:1;
		 			.user{
		 				font-size: 10px;
		 				line-height: 12px;
			 			span{
			 				float:right;
			 				font-size: 10px;
			 				font-weight: 200;
			 				line-height: 12px;
			 			}
		 			}
		 			.star-wrapper{
		 				display: inline-block;
		 				padding-top:4px;
		 				padding-bottom:6px;
		 			}
		 			.time{
		 				font-size: 10px;
		 				font-weight:200;
		 				color:rgb(147,153,159);
		 				line-height: 12px;
		 			}
		 			.text{
		 				padding-bottom:8px;
		 				line-height: 18px;
		 				font-size: 12px;
		 				color:rgb(7,17,27);
		 			}
		 			.thumb{
			 			i{
			 				line-height: 16px;
			 				font-size: 12px;
			 				color:rgb(0,160,220);
			 				color:#00a0dc;
			 			}	
			 			span{
			 				font-size: 12px;
			 				color:rgb(183,187,191);
			 				line-height: 16px;

			 			} 				
		 			}
		 		}
	 		}			
 		}
 	}
}

</style>