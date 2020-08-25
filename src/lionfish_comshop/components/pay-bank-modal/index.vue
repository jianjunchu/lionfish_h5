<template>
  <div>
    <div class="mask" catchtouchmove="preventTouchMove" v-if="visible"></div>
    <div class="paynow" v-if="visible">
      <div style='width: 100%;height: 10%;'>
        <div style='float:left;width: 40%;font-size: 22px;line-height: 5vw;margin-left: 10%;'>
          转账支付
        </div>
        <div style='float:right;width: 50%;text-align: right' @click='close'>
          <img src='@/assets/images/img-close.png'
               style='width: 3vw;height: 3vw;margin-top: 1vw;margin-right: 10%'/>
        </div>
      </div>
      <div style='text-align: center'>
        <div style='width: 100%;height: 350px;font-size: 1.2vw;'>

          <div style='margin-left: 5%;margin-top:1vw;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>帐号：</span>
            <span style='text-align: left;'>{{bankInfo.account_no}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_no">复制
            </button>
          </div>
          <div style='margin-left: 5%;margin-top:1vw;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>户名：</span>
            <span style='text-align: left;'>{{bankInfo.account_name}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.account_name">复制
            </button>
          </div>
          <div style='margin-left: 5%;margin-top:1vw;text-align:left;display: flex;justify-content: center;'>
            <span style='display: flex;justify-content: center;'>银行：</span>
            <span style='text-align: left;'>{{bankInfo.bank_name}}</span>
            <button @click='copyText' size="mini" style="font-size: 8px;" :data-text="bankInfo.bank_name">复制
            </button>
          </div>

          <div style='wid:200px;height:100px;text-align: center;margin-top: 3vw;'>
            <span style='font-size: 18px;'>请在支付时备注您订单内的联系号码 \n</span>
            <span style='font-size: 18px;color: #c0c0c0'>{{$t('order.zhuanzhangbeizhu')}}</span>
          </div>
        </div>
        <div style='width: 60%;text-align: center;margin-top: 3vw;margin-left: 20%;'>
          <button @click="havePaid" :style="{background:skin.color,color:' #fff'}" data-type="banktransfer" class="wux-button wux-button--block" type="default">
            已支付，查看订单
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    props: {
      visible: {
        type: Boolean
      },
      tot_price: {
        default:''
      },
      bankInfo:{
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
      havePaid:function() {

        this.$emit("havePaid",'banktransfer')
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
    z-index: 9000;
    opacity: 0.7;
  }

  .paynow{
    position: fixed;
    top: 1%;
    width: 100%;
    height: 99%;
    padding: 8vw;
    /* border: 8px solid #e8e9f7; */
    background-color: white;
    z-index: 9999;
    overflow: auto;
  }
</style>
