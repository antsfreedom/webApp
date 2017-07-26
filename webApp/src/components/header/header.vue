<template>
  <div class='header'>
  <p>公告  粥品香坊</p>
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>  //scoped  如果子级和父级有重名的标签，不加则会影响父级
  .header{
    height: 134px;
    background:#61676d;
    overflow: hidden;
    p{
    	height:28px;
    	line-height: 28px;
    	color:#fff;
    	background:#4e545a;
    	margin-top:106px;
    }
  }
</style>