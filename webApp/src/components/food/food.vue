<template>
	<transition name="move">	
		<div class="food" v-show = "showFlag">
			<!-- <p @click="hide">返回</p> -->
			<div class="food-cont">
				<div class="pic">
					<img :src="food.image" alt="">
				</div>
				<div class="back" @click="hide">
					<i class="icon icon-arrow_lift"></i>
				</div>
				<div class="desc">
					<h2>{{food.name}}</h2>
					<span class="counts">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}</span>					
					<div class="price">
						<span class="currentPrice">￥{{food.price}}</span>
						<span>{{food.oldPrice}}</span>
					</div>
					<div class="shopCar">加入购物车</div>
				</div>
			</div>
			<div class="gap"></div>
			<div class="foodIntro">
				<h2>商品介绍</h2>
				<p>{{food.info}}</p>			
			</div>
			<div class="gap"></div>
			<div class="Allratings">
				<h2>商品评价</h2>
				<ul class="border1px">
	    		<li>全部 <span>57</span></li>
	    		<li>推荐 <span>47</span></li>
	    		<li>吐槽 <span>10</span></li>
    		</ul>			
			</div>			
		</div>
	</transition>
</template>

<script>
import shop from "../shop/shop.vue"
	export default{
		data(){
			return{
				showFlag:false
			}
		},
		props:{
			food:{
				return:Object
			}
		},

		methods:{
			show(){
				this.showFlag = true
			},
			hide(){
				this.showFlag = false
			}
		},

		components:{
			shop
		}
	}
</script>

<style lang="scss" scoped>
@import '../../common/mixins.scss';
	.food{
		position: fixed;
		width:100%;
		height: 100%;
		background:#fff;
		overflow: auto;
		.food-cont{				
			.pic{
				// width:100vw;
				// height: 100vw;  //也能实现图片的长宽相等
				position:relative;
				width:100%;
				height:0;
				padding-top: 100%;
				img{
					position:absolute;
					left:0;
					top:0;
					width:100%
				}
			}

			.desc{
					// margin-top: 18px;
					// margin-left:18px;
					margin:18px;
					overflow: hidden;
				h2{
					margin-bottom:8px;
					line-height: 14px;
					font-size: 14px;
					font-weight:700;
				}
				.counts,.rating{
					margin-bottom:18px;
					line-height: 10px;
					font-size: 10px;
					color:rgb(147,153,159);
					&.counts{
						margin-right: 12px;
					}
				}
				.price{
					.currentPrice{
						font-size: 14px;
						font-weight:700;
						color:rgb(240,20,20);
						line-height: 24px;
					}
				}			
			}
			.shopCar{
				float:right;
				width:74px;
				height: 24px;
				line-height: 24px;
				text-align: center;
				color:#fff;
				font-size: 10px;
				// line-height: 12px;
				border-radius: 12px;
				background:rgb(0,160,220);
			}
			.back{
				position:absolute;
				top:10px;
				left:10px;

				i{
					display: block;
					font-size:20px;
					color:#fff;
				}
			}
		}
		.gap{
			width:100%;
			height: 16px;
			background:#f3f5f7;
		}
		.foodIntro{
			margin:18px;
			h2{
				margin-bottom:6px;
			}
			p{
				padding:0 8px 0;
				font-size: 12px;
				font-weight: 200;
				color:rgb(77,85,93);
				line-height: 24px;
			}
		}
		.Allratings{
			margin: 18px;
			ul{
 			// margin:18px 18px auto 18px;
 			margin-top: 18px;
 			padding-bottom:18px;
 			font-size: 0;
 			@include border-1px(#ddd);
 			li{
 				display: inline-block;
 				padding:8px 12px;
 				margin-right: 8px;
 				font-size: 12px;
 				line-height: 16px;
 				background:blue;
 				span{
 					font-size: 8px;
 				}
 			}
 			li:first-child{
 				background:#00a0dc;
 			}
 			li:nth-child(2){
 				background:#ccecf8;
 			}
 			li:last-child{
 				background:#e9ebec;
 				margin-right:0;
 			}
 		}
		}
	}
	.move-enter-active, .move-leave-active{
	  transition: all 0.2s linear;
	  transform: translate3D(0,0,0);
  }
  .move-enter,.move-leave-active{
    transform: translate3D(100%,0,0);
  }
</style>