<template>
	<div class="supports" :class='className'>
		<ul>
			<li v-for='(item,index) in supports'>
				<span class='icon' :class='classMap[supports[index].type]'></span>
				<!-- {{index}} -->
				<span class='content'>{{item.description}}</span>
			</li>
		</ul>
		<!-- {{supports[0].description}} -->
		<!-- <span class='icon'></span> -->
	</div>
</template>


<script>
	export default {
	 props:{
	  supports:{
	    return:Array
	  },
	  className:{
	  	return:String
	  }
	},
	created(){
		this.classMap=['decrease','discount','guarantee','invoice','special']
	}
}

</script>


<style lang='scss' scoped>
	@import '../../common/mixins.scss';
	.supports{
		li{			
			font-size: 10px;
			color:#fff;
			span{
				display: inline-block;
				&.icon{
				width:12px;
				height:12px;
				background-size:cover;
					&.decrease{
						@include bgimgs("decrease_1");
					}
					&.discount{
						@include bgimgs("discount_1");
					}
					&.guarantee{
						@include bgimgs("guarantee_1");
					}
					&.invoice{
						@include bgimgs("invoice_1");
					}
					&.special{
						@include bgimgs("special_1");
					}			
				}
				&.content{
					vertical-align: top;
					line-height: 12px;
					font-weight: 200;
				}			
			}
		}
		&.diff{
			li{	
			margin-bottom:24px;		
			font-size: 12px;
			span{				
				&.icon{
				width:16px;
				height:16px;
				margin:0 6px 0 12px;
					&.decrease{
						@include bgimgs("decrease_2");
					}
					&.discount{
						@include bgimgs("discount_2");
					}
					&.guarantee{
						@include bgimgs("guarantee_2");
					}
					&.invoice{
						@include bgimgs("invoice_2");
					}
					&.special{
						@include bgimgs("special_2");
					}			
				}
			}
		}
	}
	&.big{
		li{	
			margin:0 18px;
			padding:16px 0;	
			line-height: 16px;
			font-size: 12px;
			color:rgb(7,17,27);
			@include border-1px(#eee);
			span{				
				&.icon{
				width:16px;
				height:16px;
				margin-left:12px;
				margin-right:6px;
					&.decrease{
						@include bgimgs("decrease_3");
					}
					&.discount{
						@include bgimgs("discount_3");
					}
					&.invoice{
						@include bgimgs("invoice_3");
					}
					&.special{
						@include bgimgs("special_3");
					}
					&.guarantee{
						@include bgimgs("guarantee_3");
					}		
				}
			}
		}
		li:last-child{
			@include border-1px(#fff);
		}
	}
}
</style>