<template>
  <div class='goods'>
  	<!-- 左边菜单按钮 -->
  	<div class='menu-wrapper' ref='menuWrapper'>
  		<ul>
  			<li v-for='(item,index) in goods' class='food-item' :class="{'current':currentIndex === index}" @click = 'selectMenu(index,$event)'>
  				<span class='text border1px' >
  					<i class='icon' v-if='item.type>0' :class=classMap[item.type]></i>
  					{{item.name}}  					
  				</span>
  			</li>
  		</ul>
  	</div>
  	
  	<div class='goods-wrapper' ref='foodWrapper'>
  		<ul>
  			<li v-for='item in goods' class='item-list food-list' >
  				<h2 class='title'>{{item.name}}</h2>
  				<ul>
  					<li v-for='food in item.foods' class='content-wrapper' @click = "choiceFood(food,$event)">
  						<div class='pic'>
  							<img :src='food.icon'></img>  							
  						</div>
  						<div class='content'>
  							<h2>{{food.name}}</h2>
  							<span class='desc'>{{food.description}}</span>
  							<span class='count'>月售{{food.sellCount}}</span>
  							<span>好评率{{food.rating}}%</span>
  							<div class='price'>
  								￥{{food.price}}
  							</div>
								<div class='control-wrapper'>
								 	<control :food='food'></control>		
								</div>							 							
  						</div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
  	<div class='shop-wrapper'>
  		<shop :selectFoods="selectFoods" :delivery="seller.deliveryPrice" :minPrice="seller.minPrice"></shop> 		
  	</div>
  	<!-- food详情页 -->
  	<div class="food-wrapper" >
  		<food :food="chooseFood" ref="food"></food>
  	</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shop from '../shop/shop.vue';
import control from '../control/control.vue';
import food from "../food/food.vue";
export default {
  data(){
    return{
      // goods:Array,
      goods:[],
      listHeight:[],
      scrollY:0,
      chooseFood:{}
    }
  },

  props:{
  	seller:{
  		return:Object
  	}
  },
    created(){
      this.$http.get('/api/goods').then(response=>{
        this.goods = response.body.data;
        this.$nextTick(()=>{
        	this.initScroll();
        	this.scrollHeight();
        })
      });

      this.classMap=['decrease','discount','special']     
    },

    methods:{
    	initScroll(){
    		this.menuScroll = new BScroll(this.$refs.menuWrapper,{
    			click:true
    		});
    		this.foodScroll = new BScroll(this.$refs.foodWrapper,{
    			click:true,
    			probeType:3
    		});

    		this.foodScroll.on('scroll',(pos)=>{
    			this.scrollY = Math.abs(Math.floor(pos.y))
    			// console.log(this.scrollY)
    		})
    	},

    	scrollHeight(){
    		let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list');
	    	let height=0;
	    	this.listHeight.push(height);
	    	for(let i=0;i<foodList.length;i++){
	    		let item = foodList[i];
	    		height +=item.clientHeight;
	    		this.listHeight.push(height);
	    	}
	    	// console.log(this.listHeight);
    	},

    	selectMenu(index,event){
    		if(!event._constructed){
    			return
    		}
    		// console.log(event);
    		let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list');
    		let ele = foodList[index];
    		this.foodScroll.scrollToElement(ele,300)
    	},
    	//food页面
    	choiceFood(food,event){
    		if(!event._constructed){
    			return
    		}
    		// console.log(food.name)
    		this.chooseFood = food;
    		this.$refs.food.show();
    	}
    },

    computed:{
    	currentIndex(){
    		for(let i=0;i<this.listHeight.length;i++){
    			let height1 = this.listHeight[i];
    			let height2 = this.listHeight[i+1];
    			if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
    				return i
    			}
    		}
    		return 0;
    	},

    	selectFoods(){
    		let foodList =[];
    		this.goods.forEach((good)=>{
    			good.foods.forEach((food)=>{
    				if(food.count){
    					foodList.push(food)
    				}
    			})
    		})
    		return foodList
    	},
    },
    //创建组件
    components:{
    	shop:shop,
    	control:control,
    	food
    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	@import '../../common/mixins.scss';
	.goods{
		display: flex;
		position:absolute;
		top:173px;
		bottom:48px;
		width:100%;
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 80px;
			width:80px;
			.food-item{
				padding:0 12px;
				height:54px;
				width:56px;
				display: table;
				background:#f3f5f7;
				&.current{
					background:orange;
					z-index:10;
					margin-top:-1px;
				}
				.text{
					vertical-align: middle;
					display: table-cell;
					line-height: 14px;
					text-align: center;
					font-size: 12px;
					font-weight: 200;
					color:#07111b;
					@include border-1px(rgba(7,17,27,.1));
					.icon{
						display: inline-block;
						width:12px;
						height:12px;
						background-size:cover;
						&.decrease{
							@include bgimgs("decrease_3");
						}
						&.discount{
							@include bgimgs("discount_3");
						}
						&.special{
							@include bgimgs("special_3");
						}			
					}
				}
			}
		}
		.goods-wrapper{
			flex: 1;
			// overflow: auto;
			.item-list{
				.title{
					font-size: 12px;
					line-height: 26px;
					background:#f3f5f7;
				}
				.content-wrapper{
					display: flex;
					margin:18px 18px 0;
					padding-bottom:18px;
					// @include border-1px(#000);
					.pic{
						padding-right:10px;
						flex:0 0 58px;  
						width:58px;
						img{
							width:100%;
							color:rgb(147,153,159);
						}
					}
					.content{
						position:relative;
						flex:1;
						vertical-align: top;
						margin-top:2px;
						h2{
							font-size: 14px;
							line-height: 14px;							
						}
						span{
							font-size: 10px;
							color:rgb(147,153,159);
							line-height:10px;
							&.desc{
								display: block;
								margin-top:8px;
								margin-bottom:8px;
							}
							&.count{
								margin-right:12px;
							}							
						}
						.price{
							padding-top:8px;
							line-height: 24px;
							font-size: 14px;
							color:red;
							font-weight: 700;
						}				
						.control-wrapper{
							position:absolute;
							right:0;
							bottom:0;
						}
					}
				}
			}
		}
		.shop-wrapper{
			position:fixed;
			bottom:0;
			width:100%;
			background:gray;
		}
		.food-wrapper{
			position:fixed;
			top:0;
			left:0;
		}
	}
</style>