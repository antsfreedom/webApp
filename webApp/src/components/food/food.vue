<template>
	<transition name="move">	
		<div class="food" v-show = "showFlag" ref="food">
			<div>
				<div class="food-cont">
					<!-- 图片 -->
					<div class="pic">
						<img :src="food.image" alt="">
					</div>
					<!-- 返回 -->
					<div class="back" @click="hide">
						<i class="icon icon-arrow_lift"></i>
					</div>
					<h2>{{food.name}}</h2>
					<!-- 月售 -->
					<div class="detail">
						<span class="counts">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
						<!-- 新旧价格 -->
					<div class="price">
						<span class="currentPrice">￥{{food.price}}</span>
						<span>{{food.oldPrice}}</span>
					</div>
					<!-- 购物车图标 -->
					<div class='control-wrapper'>
						<control :food='food'></control>		
					</div>	
					<transition name="fade">
						<div @click = "addFirst($event)" class="shopCar" v-show="!food.count||food.count===0">加入购物车</div>
					</transition>
				</div>
				<!-- 划线 -->
				<div class="gap"></div>
				<div class="foodIntro">
					<h2>商品介绍</h2>
					<p>{{food.info}}</p>			
				</div>
				<div class="gap"></div>
				<div class="ratingSort">
					<h2>商品评价</h2>
					<div class="ratingSelect-wrapper">
						<ratingSelect :ratings ="food.ratings" :selectType = "selectType" :onlyContent="onlyContent"></ratingSelect>						
					</div>
				</div>

				<div class="ratingCont">
					<ul>
						<li v-for="item in food.ratings" v-show="needShow(item.rateType,item.text)">
							<div class="content">
								<span class="time">{{formate(item.rateTime)}}</span>
								<!-- <span class="time">{{item.rateTime}}</span> -->
								<div class="user">
									<span>{{item.username}}</span>
									<img :src="item.avatar" alt="">
								</div>
								<div class="text">
								<!-- 	<i :class="{'icon icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i> -->
									<i class="icon icon-thumb_up" v-if="item.rateType===0"></i>
									<span class="icon icon-thumb_down" v-else></span>
									{{item.text}}
								</div>								
							</div>
						</li>
					</ul>			
				</div>			
			</div>
		</div>
	</transition>
</template>

<script>
import Vue from 'vue';
import shop from "../shop/shop.vue";
import control from "../control/control.vue";
import ratingSelect from "../ratingSelect/ratingSelect.vue";
import BScroll from 'better-scroll';
	export default{
		data(){
			return{
				showFlag:false,
				// ratings:[],
				selectType: 2,
				onlyContent:false,
				desc:{
					all:'全部',
					positive:"推荐",
					nagetive:"吐槽"
				},
			}
		},
		props:{
			food:{
				return:Object
			}
		},

		methods:{
			show(){
				this.showFlag = true;
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			hide(){
				this.showFlag = false
			},
			addFirst(event){
				if(event._construted){
					return 
				}
				Vue.set(this.food,"count",1)
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
			shop,
			control,
			ratingSelect
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
		.food-cont{	
			position:relative;		
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
			h2{
				margin:18px 0 8px 18px;
				line-height: 14px;
				font-size: 14px;
				font-weight:700;
			}
			.detail{
				margin-left:18px;
				span{
					line-height: 10px;
					font-size: 10px;
					color:rgb(147,153,159);
					&.counts{
						margin-right: 12px;
					}
				}				
			}
			.price{
				margin:18px 0 18px 18px;
				.currentPrice{
					font-size: 14px;
					font-weight:700;
					color:rgb(240,20,20);
					line-height: 24px;
				}
			}			
			.control-wrapper{
				position:absolute;
				right:35px;
				bottom:-5px;
			}
			.shopCar{
				margin-right: 18px;
				position:absolute;
				right:18px;
				bottom:-5px;
				width:74px;
				height: 24px;
				z-index: 100;
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
		.ratingSort{
			margin: 18px;
		// 	ul{
	 // 			margin-top: 18px;
	 // 			padding-bottom:18px;
	 // 			font-size: 0;
	 // 			@include border-1px(#ddd);
	 // 			li{
	 // 				display: inline-block;
	 // 				padding:8px 12px;
	 // 				margin-right: 8px;
	 // 				font-size: 12px;
	 // 				line-height: 16px;
	 // 				background:blue;
	 // 				span{
	 // 					font-size: 8px;
	 // 				}
	 // 			}
	 // 			li:first-child{
	 // 				background:#00a0dc;
	 // 			}
	 // 			li:nth-child(2){
	 // 				background:#ccecf8;
	 // 			}
	 // 			li:last-child{
	 // 				background:#e9ebec;
	 // 				margin-right:0;
	 // 			}
	 // 		}
		}
		.ratingCont{
			li{
				padding:16px 18px;
				.content{
					.user{
						float:right;
						.time{
							font-size: 10px;
							color:rgb(147,153,159);
							line-height: 12px;
						}				
						img{
							width:12px;
							height: 12px;
							border-radius:50%;
						}
					}
					.text{
						margin-top: 6px;
						i{
							padding-right:4px;
							color:#00a0dc;
						}
						span{
							color:#b7bbbf;
						}
					}
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