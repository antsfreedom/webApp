<template>
	<div class='star' :class='typeSize'>
		<ul>
			<li v-for='item in classItem' class='star-item' :class='item'></li>
		</ul>
	</div>
</template>

<script>
const leng = 5;   //定义星星数量
	export default{
		props:{
			star:{
				return:Number
			},
			size:{
				return:Number
			}
		},
		computed:{
			typeSize(){
				return 'type' + this.size   //字符串拼接，使其类名为type+num
			},
			classItem(){
				let result = [];
				let score = Math.floor(this.star * 2) / 2;
				let hasFloat = score % 1 !== 0;
				let inter = Math.floor(score);
				for(let i=0;i<inter;i++){
					result.push('on')
				};
				if(hasFloat){
					result.push('half');
				}
				while(result.length<leng){
					result.push('off');
				}
				return result;
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '../../common/mixins.scss' ;
.star{
	text-align:center;
	font-size:0;
	.star-item{
		display: inline-block;
		
		width:24px;
		height:24px;
		background-size:cover;
		&:last-child{
			margin-right: 0;
		}
	}
	&.type24{
		.star-item{
			margin-right:20px;
			&.on{
				@include bgimgs('star24_on');
			}
			&.half{
				@include bgimgs('star24_half');
			}
			&.off{
				@include bgimgs('star24_off');
			}					
		}
	}

	&.type36{
		.star-item{
			width:15px;
			height:15px;
			margin-right:7px;
			&.on{
				@include bgimgs('star36_on');
			}
			&.half{
				@include bgimgs('star36_half');
			}
			&.off{
				@include bgimgs('star36_off');
			}					
		}
	}

	&.type12{
		.star-item{
			width:12px;
			height:12px;
			margin-right:3px;
			&.on{
				@include bgimgs('star36_on');
			}
			&.half{
				@include bgimgs('star36_half');
			}
			&.off{
				@include bgimgs('star36_off');
			}					
		}
	}

}
</style>