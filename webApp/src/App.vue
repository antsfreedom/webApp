<template>
  <div id="app">
    <iheader :seller='seller'></iheader> 
    <div class='tab border1px'>
      <div class='tab-item'>
        <router-link to='/goods'>商品</router-link>    
      </div>

      <div class='tab-item'>
        <router-link to='/ratings'>评价</router-link>    
      </div>

      <div class='tab-item'>
        <router-link to='/seller'>商家</router-link>    
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>

import iheader from "./components/header/header.vue";
  export default {
    name: 'app',
    data(){
      return{
        seller:Object          //定义变量seller：对象类型
      };
    },
    created(){
      this.$http.get('/api/seller').then(response=>{
        this.seller = response.body.seller;        //seller接收数据
        // console.log(this.seller.seller)
      });
    },

    components:{
      iheader:iheader,
    },
  }
</script>

<style lang='scss'>
  @import './common/common.scss';
  .tab{
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #fff;
    @include border-1px(#ccc);
    .tab-item{
      flex:1;
      text-align: center;
      &>router-link{
        display: block;
        height: 100%;
        font-size: 14px;
        color:rgb(77,85,93);
        &.active{
          color:rgb(240,20,20);
        }
      }
    }
  }
</style>
