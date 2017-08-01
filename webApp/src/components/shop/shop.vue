<template>
	<div class='shop'>
		<div class='content'>
			<div class='left'>
				<div class='logo-wrapper'>
					<div class='logo'>
						<i class='icon icon-shopping_cart'></i>						
					</div>
				</div>
				<div class='price'>￥30元</div>
				<div class='delivary'>另需配送费十元</div>
			</div>

			<div class='right enough'>
				还差￥10
			</div>			
		</div>
	</div>
</template>

<script>
	
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
							color:rgba(255,255,255,.4);
						}
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
					margin-left:12px;
					margin-top:12px;
					line-height: 24px;	
					font-size: 12px;
					color:#fff;
				}
			}
			.right{
				flex:0 0 105px;
				width:105px;
				line-height: 48px;
				font-size: 12px;
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
</style>