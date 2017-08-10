<template>
  <div class='ratings' ref="ratings">
  	<div> 
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
	    				<span>商品评分</span>
	    				<div class='star-wrapper'>
	              <star :star='seller.score' :size='36'></star>
	            </div>
	            <span class='scores'>3.9</span>
	    			</li>
	    			<li><span>送达时间</span> 40分钟</li>
	    		</ul>
	    	</div>
	    </div>
	    <div class='gap'></div>
	    <!-- 组件 -->
	    <div class="ratingSelect-wrapper">
				<ratingSelect :desc="desc" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>						
			</div>

			<!-- 评价内容 -->
	    <div class='satisf-wrapper'>
	    	<ul>
	    		<li class='satisf-list border1px' v-for='item in ratings' v-show = needShow(item.rateType,item.text)>
	    			<div class='pic'>
	    				<img :src="item.avatar" alt="">
	    			</div>
	    			<div class="content">
	    				<div class='user'>{{item.username}}
	    					<span>{{formate(item.rateTime)}}</span>
	    				</div>
	    				
	    				<div class='star-wrapper'>
	              <star :star='item.score' :size='12'></star>
	            </div>
	            <span class='time' v-show = "item.deliveryTime">{{item.deliveryTime}}分钟</span>
	            <p class='text'>{{item.text}}</p>
	            <!-- 点赞 -->
	            <div class='thumb'>
	            	<i class="icon icon-thumb_up" v-if ="item.score>3" ></i>
	            	<span class='icon icon-thumb_down' v-else></span>
		            <!-- 推荐 -->
		            <ul>
		            	<li v-for='list in item.recommend' v-show="list.length>4">
		            		<span>{{list}}</span>
		            	</li>
		            </ul>
	            </div>
	    			</div>
	    		</li>
	    	</ul>
	    </div>
	  </div>
    <div class='shop-wrapper'>
  		<shop :delivery="seller.deliveryPrice" :minPrice="seller.minPrice"></shop>
  	</div>	
  </div>
</template>

<script>
import star from '../star/star.vue';
import shop from '../shop/shop.vue';
import BScroll from 'better-scroll';
import ratingSelect from "../ratingSelect/ratingSelect.vue"
export default {
	data(){
		return {
			ratings:[],
			isActive:false,
			selectType:2,
			onlyContent:false,
			desc:{
				all:'全部',
				positive:"满意",
				nagetive:"不满意"
		}
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
			this.$nextTick(()=>{
				this.scroll = new BScroll(this.$refs.ratings,{
					click:true
				})			
			})
		});
	},

	methods:{
		show(){
			this.isActive = !this.isActive
			if(this.isActive){				
			}
		},
		needShow(type,text){
			if(this.onlyContent&&!text){
				return false
			}
			if(this.selectType==2){
				return true
			}else{
				return type === this.selectType;
			}

		},
		//时间转换
		formate(date){
			var date = new Date(date);//如果date为13位不需要乘1000
			var Y = date.getFullYear() + '-';
		  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
		  return Y+M+D+h+m+s;
		}
	},

	watch:{
		'selectType'(type){
			this.$nextTick(()=>{
				this.scroll.refresh();
			})
		},
		'onlyContent'(onlyContent){
			this.$nextTick(()=>{
				this.scroll.refresh();
			})
		}
	},
  components:{
  	star,
  	shop,
  	ratingSelect
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' scoped>
@import '../../common/mixins.scss';
 .ratings{
 	position:fixed;
 	top:180px;
 	bottom:0;
 	width:100%;
 	overflow: hidden;
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
 	.ratingSelect-wrapper{
 		margin-left:18px;
 	}
 	.satisf-wrapper{
 		margin-bottom:48px;
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
		 				display: inline-block;
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
			 			ul{
			 				font-size:0;
			 				margin-top:-11px;
				 			li{
				 				display: inline-block;
				 				margin-right: 8px;
				 				span{
				 					padding:0 6px;
				 					border:1px solid #ccc;
				 					border-radius:2px;
				 					font-size: 9px;
				 					color:rgb(147,153,159);
				 					line-height: 16px;

				 				}
				 			}			 				
			 			}
		 			}
		 		}
	 		}			
 		}
 	}
	.shop-wrapper{
		position:fixed;
		bottom:0;
		width:100%;
	}
}

</style>