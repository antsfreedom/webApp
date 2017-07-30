<template>
  <div class='header'>
    <div class='content-wrapper'>
      <div class='pic'>
        <img :src="seller.avatar" alt="">                
      </div>
      <div class='content'>
        <span class='brand'></span>
        <h3>{{seller.name}}</h3>
        <p>{{seller.description}}/{{seller.deliveryTime}}分钟到达</p>
        <div class="supports-wrapper">
          <supports v-if='seller.supports' :supports ='seller.supports'></supports>
        </div>  
      </div>
    </div>

    <div class='conter-wrapper' v-if='seller.supports' @click='showDetail'>
      <div class='counter'>
        {{seller.supports.length}}个
        <i class='iconfont icon-keyboard_arrow_right'></i>
      </div>
    </div>

    <div class='post'>
      <p>
        <span></span>{{seller.bulletin}}
      <i class='iconfont icon-keyboard_arrow_right'></i>
      </p>
    </div>

    <div class="bgimages">
      <img :src="seller.avatar" alt="">
    </div>

    <transition name='fade'>
      <div class='bgdetail' v-show='detailShow' @click='closeDetail'>
        <div class='detail'>
          <div class='inner'>
            <div class='bgTitle'>{{seller.name}}</div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>

          </div>         
          <div class='close'>
            <i class='iconfont icon-close'></i>
           </div> 
        </div>
      </div>     
    </transition>   
  </div>
</template>

<script>
 import supports from '../supports/supports.vue';
 // import demo from '../demo/demo.vue';
export default {
  props:{
    seller:{
      return:Object
    }
  },

  data(){
    return{
      detailShow:false
    }
  },
  methods:{
    showDetail(){
      this.detailShow = true
    },
    closeDetail(){
      this.detailShow = false
    }
  },
  components:{
    supports:supports,
  }
}
</script>

<style lang='scss' scoped>  //scoped  如果子级和父级有重名的标签，不加则会影响父级
  @import '../../common/mixins.scss';
  .header{
      height: 134px;
      background:rgba(7,17,27,.5);
      position:relative;
    .content-wrapper{
      box-sizing:border-box;
      width:100%;
      padding:24px 0 18px 24px;
      color:#fff;
      font-size: 0;
      .pic{
        display: inline-block;
        padding-right:16px;
        vertical-align: top;
        width:64px;
        img{
          width:100%;
          border-radius: 2px;       
        }
      }
      .content{
        display: inline-block;
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
          font-size: 16px;
          margin-bottom: 8px;
        }
        p{
          font-size: 12px;
          margin-bottom:10px;
        }

        .supports-wrapper{
          overflow: hidden;
          height:14px;
        }
      }
    }
    .conter-wrapper{
      position:absolute;
      bottom:40px;
      right:20px;
      .counter{
        width:60px;
        height:24px;
        line-height: 24px;
        color:#fff;
        text-align:center;
        border-radius:14px;
        background:rgba(7,17,27,.2);
      }   
    }
    .post{
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      // box-sizing:border-box;
      p{
        background:rgba(7,17,27,.2);
        padding:0 36px 0 12px;
        height: 28px;
        line-height: 28px;
        font-size: 10px;
        color:#fff;
        font-weight:200;
        @include ellipses;
        span{
          display: inline-block;
          margin-right:4px;
          width:22px;
          height: 13px;
          vertical-align: top;
          margin-top:7px;
          @include bgimgs('bulletin');
          background-size:100%;
          i{
            position:absolute;
            bottom:0;
            right:12px;;
          }
        }
      }
    }
    .bgimages{
      z-index:-1;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:134px;
      overflow: hidden;
      filter:blur(10px);
      img{
        width:100%;
      }
    }
    .bgdetail{
      z-index:10;
      position:fixed;
      left:0;
      top:0;
      width:100%;
      height:100%;
      overflow: auto;
      background:rgba(7,17,27,.7);
      .detail{
        // filter:blur(10px);
        position:relative;
        min-height: 100%;
        backdrop-filter:blur(10px);
        color:#fff;
        .inner{
          padding-bottom:128px;
          .bgTitle{
            margin-top:60px;
            text-align: center;
            font-size: 16px;
            font-weight:700;
            line-height: 16px;
          }
          li{
            width:25%;
             @include bgimgs('star24_off');
          }
        }
        .close{
          position:absolute;
          bottom:0;
          padding:32px 0;
          width:100%;
          text-align: center;
        }
      }
    }
    .fade-enter-active,.fade-leave-active{
      transition:opacity .5s
    }
    .fade-enter,.fade-leave-to{
       opacity: 0
    }
  }
</style>