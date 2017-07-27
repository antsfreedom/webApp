<template>
  <div class='header'>
    <div class='wrapper'>
      <div class='pic'>
        <img :src="seller.avatar" alt="">                
      </div>
      <div class='content'>
        <span class='brand'></span>
        <h3>{{seller.name}}</h3>
        <p>{{seller.description}}/{{seller.deliveryTime}}分钟</p>
        <!-- <h4>公告 <span>粥品香坊其烹饪粥料的秘方源于中国千年古法，再融合现代制作工艺</span></h4> -->
        <div class="supports-wrapper">
          <supports v-if='seller.supports' :supports ='seller.supports'></supports>      
        </div>       
      </div>

    </div>
  </div>
</template>

<script>
 import supports from '../supports/supports.vue';

export default {
  props:{
    seller:{
      return:Object
    }
  },
  components:{
    supports:supports,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>  //scoped  如果子级和父级有重名的标签，不加则会影响父级
  // @import '../../common/mixins.scss'
  @import '../../common/mixins.scss';
  .header{
    // height: 134px;
    .wrapper{
      padding:24px 12px 18px 24px;
      padding-bottom:18px;
      background:#61676d;
      overflow: hidden;
      color:#fff;
      .pic{
        float:left;
        // display: inline-block;
        padding-right:16px;
        width:64px;
        height:64px;
        img{
          width:100%;
          border-radius: 2px;       
        }
      }
      .content{
        float:left;
        margin-top: 2px;
        .brand{
          display: block;
          float:left;
          margin-right:6px;
          width:30px;
          height:18px;
          @include bgimgs('brand');
          background-size:100%;
        }
        h3{
          margin-bottom: 8px;
        }
        .supports-wrapper{
          // height:20px;
          // background: red;
          // font-size: 20px;
        }
        p{
          margin-bottom:10px;
        }
      }
    }
  }
</style>