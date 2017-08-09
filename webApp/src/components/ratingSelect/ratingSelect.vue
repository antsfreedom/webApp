<template>
	<div class="ratingSelect">
		<div class="rating-type border1px">
		<!-- 全部 -->
			<span class="block positive" :class="{active:selectType===2}" @click ="select(2,$event)">{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</span>			
				
			<span class="block positive" :class="{active:selectType===0}" @click ="select(0,$event)">{{desc.positive}}
				<span class="count">{{positive.length}}</span>
			</span>

			<span class="block nagetive" :class="{active:selectType===1}" @click ="select(1,$event)">{{desc.nagetive}}
				<span class="count">{{nagetive.length}}</span>
			</span>	
		</div>
		<div class="switch" :class="{on:onlyContent}" @click = "toggleContent">
      <span class="icon icon-check_circle"></span>
      <span class="text">
      只看有内容的评论</span>
    </div>
	</div>
</template>

<script>
	export default{
		props:{
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						positive:"推荐",
						nagetive:"吐槽"

					}
				}
			},
			ratings:{
				return:Array,
				default(){
					return [];
				}
			},

			selectType:{
				return:Number,
				default(){
					return 2
				}
			},
			onlyContent:{
				return:Boolean,
				default: false
			}
		},

		computed:{
			positive(){
				return this.ratings.filter((rating)=>{
					return rating.rateType ==0
				})
			},

			nagetive(){
				return this.ratings.filter((rating)=>{
					return rating.rateType ==1
				})
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return 
				}
				this.$parent.selectType = type
			},
			toggleContent(event){
				if(!event._constructed){
					return 
				}
				this.$parent.onlyContent = !this.onlyContent
			}
		}
	}
</script>

<style lang = "scss" scoped>
@import '../../common/mixins.scss';
	.ratingSelect{
		.rating-type{
			margin-top: 18px;
 			padding-bottom:18px;
 			font-size: 0;
 			@include border-1px(#ddd);
			.block{
				display: inline-block;
				padding:8px 12px;
 				margin-right: 8px;
 				font-size: 12px;
 				line-height: 16px;
 				color:rgb(77,85,93);
 				background: #ccc;
				&.active{
					color:#fff;
				}

				&.positive{
					background:rgba(0,160,220,.2);
					&.active{
						color:#fff;
						background: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,.2);
					&.active{
						color:#fff;
						background: rgb(77,85,93);
					}
				}
					
 			.count{
				font-size: 8px;				
				}
			}
		}
		.switch{
      padding:12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,.1);
      color:#000;
      font-size: 0;
      span{
        display:inline-block;
        vertical-align:top;
      }
      .icon{
        margin-right:4px;
        font-size:24px;
      }
      .text{
        font-size: 12px;
      }
      &.on{
        .icon{
          color:#00c850;
        }
      }
    }
	}
</style>