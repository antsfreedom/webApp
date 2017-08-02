<template>
	<div class='control'>
	<!-- 减少-->
		<div class="remove" v-show = 'food.count' @click='remove($event)'>
			<i class="icon icon-remove_circle_outline"></i>
		</div>
		<!-- 购买数量 -->
		<div class='count' v-show = 'food.count'>
			{{food.count}}
		</div>
		<!-- 添加 -->
		<div class='add' @click = 'add($event)' >
			<i class="icon icon icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
	export default{
		props:{
			food:{
				return:Object
			}
		},
		methods:{
			add(event){
				if(!event._constructed){
    			return
    		}
    		if(!this.food.count){
    			Vue.set(this.food,'count',1)
    		}else{
    			this.food.count++
    		}
			},

			remove(event){
				if(!event._constructed){
				return
    		}else{
    		this.food.count--    		    			
    		}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.control{		
		line-height: 24px;
	.remove{
			padding-right:12px;
			display: inline-block;
			vertical-align: top;
			font-size: 24px;
		}
		.count{
			display: inline-block;
			vertical-align: top;
			font-size: 18px;
		}
		.add{
			padding-left:12px;
			display: inline-block;
			vertical-align: top;
			font-size: 24px;
			color:#00a0dc;			
		}
	}
</style>