<template>
  <div>

    <div class="mask" catchtouchmove="preventTouchMove" v-if="visible"></div>
    <div class="paynow" v-if="visible">
      <div style='width: 100%;height: 5%;'>
        <div style='float:left;width: 40%;font-size: 4vw;line-height: 5vw;margin-left: 5%;'>
          PayNow
        </div>

        <div style='float:right;width: 50%;text-align: right' @click='close'>
          <img src='@/assets/images/img-close.png'
               style='width: 24px;height: 24px;margin-top: 1vw;margin-right: 5%'/>
        </div>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;'>
        UEN：{{payNowInfo.payNowUen}}
      </div>
      <!--<div style='float:left;width: 100%;margin-left: 5%;'>
        PayNow Account.：{{payNowNo}}
      </div>-->
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        {{$t('order.zhifujine')}}：
        <span style="color:red">${{tot_price}}</span>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        {{$t('order.beizhudingdanhao')}}：
        <span style="color:red">{{order_num_alias}}</span>
      </div>
      <div style='float:left;width: 100%;margin-left: 5%;margin-top:5px'>
        <!--<span style="color:red">{{$t('order.xierugaidingdanhao')}}</span>-->
      </div>

      <div style='text-align: center; font-size: 3vw' >
        <div style='width: 100%;justify-content: center; '>
          <img :src='payNowInfo.payNowQr' @click="imagePreview"
               style='width: 120px;height: 120px;margin-top: 10px;border: 1px solid #000;'/>
          <div style='wid:200px;height:40px;margin-top:1vw;'>

            <span style='text-align: left'>{{$t('order.saomazhifu')}}  <!--或 uen: {{payNowUen}}--></span>

          </div>
          <div style='text-align: left; margin-top:1vw;margin-left:1vw;'>
            <span style='font-size: 2vw'>Step 1: Take a screenshot of the QR code</span>
          </div>
          <div style='text-align: left; margin-top:1vw;margin-left:1vw;'>
            <span style='font-size: 2vw'>Step 2: Proceed to make payment via PayNow by scanning the QR</span>
          </div>
          <div style=' text-align: left; margin-top:1vw;margin-left:1vw;word-wrap:break-word' >
            <span style='font-size: 2vw'>Step 3: On your PayNow account </span> <span style="font-weight: 800;color: red;">enter your mobile number</span> <span> under notes and click Submit</span>
          </div>

          <div style='wid:200px;height:10vh; margin-top:3vw;'>
            <span style='font-size: 18px;'><!--请在支付时备注您订单内的联系号码 \n--></span>
            <span style='font-size: 3vw;color: #c0c0c0'>{{$t('order.zhuanzhangbeizhu')}}</span>
          </div>
        </div>
        <!--
        <div class="receiver">

          <span>{{$t('order.jiaoyiliushui')}}</span>
          <input v-model="transaction_id" class="mobile" placeholder="Paynow transaction No." type="text"></input>

        </div>
        -->
        <div style='width: 60%;text-align: center;margin-top: 0vw;margin-left: 20%;'>
          <button @click="havePaid" :style="{background:skin.color,color:' #fff'}" data-type="paynow" class="wux-button wux-button--block" type="default">{{$t('order.yizhifu')}}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  export default {
    name: '',
    props: {
      visible: {
        type: Boolean
      },
      tot_price: {
        default:''
      },
      payNowInfo:{
        type:Object
      },
      skin:{
        type:Object
      }

    },
    methods: {
      close:function() {
        this.$emit("close")
      },
      imagePreview:function() {
        ImagePreview({
          images: [
            this.payNowInfo.payNowQr
          ],
          closeable: true,
        });
      },
      havePaid:function() {
        this.$emit("havePaid",'paynow')
      }
    }
  }
</script>

<style scoped>

  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 99;
    opacity: 0.7;
  }

  .paynow{
    position: fixed;
    top: 50px;
    width: 100%;
    height: 90vh;
    padding: 1vw;

    background-color: white;
    z-index: 100;
    overflow: auto;
  }
  .wux-button {
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    padding: 0 12px;
    min-width: 52px;
    min-height: 44px;
    border: none;
    border-radius: 4px;
    vertical-align: middle;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 16px;
    cursor: pointer;

  }
  .wux-button--block{
    width: 100%;
    margin-top: 10px;
  }
</style>
