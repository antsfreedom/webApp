<template>
	<div class='shop'>
		<div class='content'>
			<div class='left' @click = "toggleList">
				<div class='logo-wrapper'>
					<div class='logo' :class="{heighLight:totalCount>0}">
						<i class='icon icon-shopping_cart'></i>
					</div>
					<div class='num' v-show ='totalCount'>{{totalCount}}</div>						
				</div>
				<div class='price'>￥{{totalPrice}}</div>
				<div class='delivary'>另需配送费{{delivery}}元</div>
			</div>

			<div class='right'>
				<div class='pay' :class='{enough:this.totalPrice >=this.minPrice}'>
					{{pay}}
				</div>
			</div>
			<transition name="fold">
				<div class="shop-list" v-show ="fold"> 
					<div class="shop-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click = "empty">清空</span>
					</div>
					<div class="shop-content" ref ="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>{{food.price*food.count}}</span>
								</div>
								<div class='control-wrapper'>
									<control :food='food'></control>
								</div>
							</li>
						</ul>
					</div>
				</div>
				
			</transition>	
		</div>
		<transition name="fade">
    	<div class="list-mask" v-show="fold" @click="hideList"></div>  
    </transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import control from '../control/control.vue';
	export default{
		data(){
			return{
				fold:false
			}	
		},
		props:{
			delivery:{
				return:Number,
				default:0,
			},
			minPrice:{
				return:Number,
				default:0
			},
			selectFoods:{
				return:Array,
				default(){
					return[{
						price:10,
						count:0
					}]
				}
			},
		},

		computed:{
			totalPrice(){
				let price = 0;
				this.selectFoods.forEach((goods)=>{
					price+=goods.price*goods.count
				})
				return price
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((goods)=>{
					count+=goods.count
				})
				return count
			},

			pay(){
				if(this.totalPrice ===0){
					return `￥${this.minPrice}起送`
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}`
				}else{
					return '去结算'
				}
			}
		},

		methods:{
			toggleList(){
				if(!this.totalCount){		
					return
				}
				this.fold = !this.fold;

				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.listContent,{
								click:true
						})						
					}else{
						this.scroll.refresh();
					}
				})
			},
			empty(){
				this.selectFoods.forEach((item)=>{
					item.count=0;
					this.fold = false
				})
			},
			hideList(){
				this.fold = false
			}
		},
		components:{
			control
		}
	}
</script>

<style lang='scss' scoped>
@import '../../common/mixins.scss';
	.shop{
		height: 48px;
		background:#141d27;
		.content{
			display: flex;
			.left{
				flex:1;
				.logo-wrapper{
					float:left;
					position: relative;
					left:12px;
					top:-10px;
					width:56px;
					height:56px;
					border-radius:50%;
					background:#141d27;
					.logo{
						position:absolute;
						left:6px;
						top:6px;
						height:44px;
						width:44px;
						line-height: 44px;
						color:#fff;
						text-align: center;
						border-radius: 50%;
						background:rgba(255,255,255,.2);
						i{
							font-size: 20px;
							color:#fff;
						}
						&.heighLight{
							background:#00a0dc;
						}
					}
					.num{
						position:absolute;
						top:-5px;
						right:0;
						padding:5px 5px;
						box-sizing:border-box;
						font-size: 12px;
						border-radius:5px;
						text-align: center;
						color:#fff;
						background:red;
					}
				}
				.price{
					float:left;
					margin-left:18px;
					margin-top:12px;
					padding-right:12px;
					line-height: 24px;										
					font-size: 12px;
					color:#fff;
					border-right:1px solid #ccc;
				}	

				.delivary	{
					float:left;
					padding-left:12px;
					padding-top:12px;
					line-height: 24px;	
					font-size: 12px;
					color:#fff;
				}
			}
			.right{
				flex:0 0 105px;
				width:105px;
				.pay{					
					line-height: 48px;
					font-size: 12px;
					color:#fff;
					text-align: center;
					font-weight: 700;
					background:#2b333b;
					&.enough{
						color:#fff;
						background:#00b43c
					}
				}
			}
		}
		//购物车的缓动效果
		.fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }

		.shop-list{
			position:absolute;
			bottom:48px;
			left:0;
			z-index:-1;
			width:100%;
			.shop-header{
	      padding: 0 18px;
	      height: 40px;
	      line-height:40px;
	      background: #f3f5f7;
	      border-bottom: 1px solid rgba(7,17,27,.1);
	      .title{
	        float:left;
	        font-size: 14px;
	        color: rgb(7,17,27);
	      }
	      .empty{
	        float: right;
	        font-size: 12px;
	        color:rgb(0, 160, 220);
	      }
	    }
		}

		.shop-content{
			padding: 0 18px;
			max-height:217px;
			overflow: hidden;
			background:#fff;
			.food{
				position: relative;
				padding: 12px 0;
				box-sizing: border-box;
				@include border-1px(rgba(7, 17, 27,.1));
				.name{
					line-height:24px;
					font-size:14px;
					color:rgb(7,17,27);
				}
				.price{
					position: absolute;
					right:90px;
					bottom:12px;
					line-height: 24px;
					font-size:14px;
					font-weight:700;
					color:rgb(240,20,20);
					span{
						padding-right:10px;
					}
				}
				.control-wrapper{
					position: absolute;
					right:0;
					bottom: 6px;
				}
			}
		}
		.list-mask{
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    z-index: -2;
	    background:rgba(7,17,27,.6);
	    background-filter: blur(10px);
	  }
	  .fade-enter-active, .fade-leave-active {
	    transition: all .5s;
	  }
	  .fade-enter, .fade-leave-active {
	    opacity:0;
	  }
	}
</style>