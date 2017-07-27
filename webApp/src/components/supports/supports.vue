<template>
	<div class="supports">
		<ul>
			<li v-for='(item,index) in supports'>
				<span class='icon' :class='classMap[supports[index].type]'></span>
				<!-- {{index}} -->
				{{item.description}}
			</li>
		</ul>
		<!-- {{supports[0].description}} -->
		<span class='icon'></span>
	</div>
</template>


<script>
	export default {
	 props:{
	  supports:{
	    return:Array
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
		font-size: 15px;
		color:#fff;
		.icon{
			display: inline-block;
			width:12px;
			height:12px;
			background-size:cover;
			&.decrease{
				@include bgimgs('decrease_1');
			}
			&.discount{
				@include bgimgs('discount_1');
			}
			&.guarantee{
				@include bgimgs('guarantee_1');
			}
			&.invoice{
				@include bgimgs('invoice_1');
			}
			&.special{
				@include bgimgs('special_1');
			}
		}
	}
</style>