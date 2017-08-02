<template>
	<div class='shop'>
		<div class='content'>
			<div class='left'>
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
				<div class='pay'  :class='{enough:this.totalPrice >=this.minPrice}'>					
					{{pay}}
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			delivery:{
				return:Number,
				default:0
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
						count:1
					}]
				}
			}
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
	}
</script>

<style lang='scss' scoped>
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
	}
</style>