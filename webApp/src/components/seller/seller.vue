<template>
  <div class='seller' ref ="sellers">
  	<div>
	   	<div class='seller-wrapper'>
	   		<div class="seller-name border1px">
	   			<h3>{{seller.name}}</h3>
	   			 <div class='desc'>
		   			<div class='star-wrapper'>
		          <star :star='seller.score' :size='36'></star>
		         </div>	        
		         <span>(661)</span>
		         <span class="count">月售{{seller.sellCount}}单</span>
	         </div>
	         <div class='collect' >
	         	<i class='icon icon-favorite'  :class="{active:isActive}" @click="change"></i>
	         	<span v-text='text'>收藏</span>
	         </div>
	   		</div>
	   		<div class='price'>
	   			<ul>
	   				<li>
	   					<div>起送价</div>
	   					<span class='minPrice'>{{seller.minPrice}}</span>
	   					<span>元</span>
	   				</li>
	   				<li>
	   					<div>商家配送</div>
	   					<span class='minPrice'>{{seller.deliveryPrice}}</span>
	   					<span>元</span>
	   				</li>
	   				<li>
	   					<div>平均配送时间</div>
	   					<span class='minPrice'>{{seller.deliveryTime}}</span>
	   					<span>分钟</span>
	   				</li>
	   			</ul>
	   		</div>
	   	</div>
	   	<div class='gap'></div>
	   	<div class='bulletin border1px'>
	   		<h3>公告与活动</h3>
	   		<p>{{seller.bulletin}}</p>
	   	</div>

	   	<div class="supports-wrapper">
	      <supports v-if='seller.supports' :supports ='seller.supports' :className="big"></supports>
	    </div>
	    <div class=gap></div>
	    <div class='scene'>
	    	<h3>商家实景</h3>
	    	<div class = "pics" ref="picWrapper">
		    	<ul ref="picWidth">
		    		<li v-for='(item,index) in seller.pics'><img :src="seller.pics[index]" alt=""></li>
		    	</ul>    		
	    	</div>
	    </div>
	    <div class='gap'></div>
	    <div class='message'>
	    	<h3 class="border1px">商家信息</h3>
	    	<ul>
	    		<li v-for='item in seller.infos' class="border1px">
	    			<span>{{item}}</span>
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
import BScroll from 'better-scroll';
import star from '../star/star.vue';
import supports from '../supports/supports.vue';
import shop from '../shop/shop.vue';
export default {
	data(){
		return{
			big:'big',
			isActive:false,
			text:'收藏'
		}
	},
  props:{
  	seller:{
  		return:Object
  	}
  },
  watch:{
  	'seller'(){
  		this._scroll();
  	}
  },

  methods:{
  	_scroll(){
  		if(this.seller.pics){
  			let picWidth = 120;
  			let picMargin = 6;
  			let outerWidth = (picWidth+picMargin)*this.seller.pics.length - picMargin + 'px';
  			this.$refs.picWidth.style.width = outerWidth;

  			this.$nextTick(()=>{
  				this.scrollX = new BScroll(this.$refs.picWrapper,{
  				scrollX: true,
  				})
  			})
  			// this.picScroll = new BScroll(this.$refs.picWrapper,{
  			// 	scrollX: true,
  			// })
  		}
  	},
  	change(){
  		this.isActive = !this.isActive
  		if(this.isActive){
  			this.text = "已收藏"
  		}else{
  			this.text = '收藏'
  		}
  	},
  },
  components:{
  	star,
  	supports,
  	shop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '../../common/mixins.scss';
.seller{
	.seller-wrapper{
		.seller-name{
			position:relative;
			margin:18px 18px 0;
			@include border-1px(#ccc);
			h3{
				padding-bottom:8px;
				font-size: 14px;
				line-height: 14px;
			}
			.desc{
				.star-wrapper{
					padding-bottom:18px;
					display: inline-block;
				}
				span{
					padding-left:8px;
					font-size: 10px;
					color:rgb(77,85,93);
					&.count{
						padding-left:0;
						margin-left:12px;
						line-height: 18px;
					}
				}				
			}
			.collect{
				position:absolute;
				top:0;
				right:0;
				line-height: 24px;
				text-align: center;
				i{
					display: block;
					font-size: 24px;
					line-height: 24px;
				}
				.active{
					color:red;
				}		
				span{
					margin-top: 4px;
					display: block;
					font-size: 10px;
					line-height: 10px;
				}
			}
		}
		.price{
			ul{
				display: flex;
				li{
					flex:1;
					margin:18px;
					text-align: center;
					border-right:1px solid #ccc;
					div{
						padding-bottom:4px;
						font-size: 10px;
						color:rgb(147,153,159);
						line-height: 10px;
					}
					span{
						font-size: 10px;
						font-weight: 200;
						color:rgb(7,17,27);
						line-height: 24px;
						&.minPrice{
							font-size: 24px;
						}
					}
				}
				li:last-child{
					border-right:0;
				}
			}
		}
	}
	.gap{
		height: 23px;
		background: #f3f5f7;
	}
	.bulletin{
		margin:18px 18px 0;
		padding-bottom:16px;
		@include border-1px(#eee);
		p{
			padding:8px 12px 0;
			font-size: 12px;
			font-weight:200;
			color:rgb(240,20,20);
			line-height: 24px;
		}
	}
	.supports-wrapper{
		color:#000;
		font-size: 12px;
	}
	.scene{
		box-sizing: border-box;
		padding-left:18px;
		padding-right:18px;
		margin-bottom:18px;
		width: 100%;		
		h3{
			margin-top:18px;
			margin-bottom:12px;
		}
		.pics{
			overflow: hidden;
			ul{	
				white-space: nowrap;
				font-size: 0;
				li{
					display: inline-block;
					width:120px;
					height: 90px;
					margin-right:6px;
					&:last-child{
						margin-right: 0;
					}
					img{
						width:100%;
					}
				}			
			}			
		}		
	}
	.message{
		margin:12px 18px 48px;
		h3{
			padding-bottom:12px;
			@include border-1px(#ccc);
		}

		li{
			padding:16px 12px;
			font-size: 12px;
			font-weight: 200;
			color:rgb(7,17,27);
			line-height: 16px;
			@include border-1px(#ccc);
		}
		li:last-child{
			@include border-1px(#fff);
		}			
	}
	.shop-wrapper{
		position:fixed;
		bottom:0;
		width:100%;
	}
}

</style>