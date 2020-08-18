<template>
<i-card showModal="true">
  <!--<div>-->
    <div slot="header">
        <div class="header">{{$t('goodsinfo.tihuoxinxi')}}</div>
    </div>
    <div slot="content">
        <div class="content-wrap">
            <div class="item">
                <div class="title">{{$t('goodsinfo.tihuoren')}}</div>
                <div class="detail">{{order.order_info.shipping_name}} {{hideInfo?tel:order.order_info.shipping_tel}}</div>
            </div>
            <div class="item" v-if="order.order_info.name&&showNickname">
                <div class="title">{{$t('goodsinfo.nicheng')}}</div>
                <div class="detail">{{order.order_info.name}}</div>
            </div>
            <div class="item">
                <div class="title">{{$t('goodsinfo.tihuodidian')}}</div>
                <div class="detail">{{order.order_info.shipping_address}}</div>
            </div>
            <div class="item" v-if="order.order_info.delivery_time && order.order_info.delivery_time!='' && order.order_info.delivery_date && order.order_info.delivery_date!=''">
                <div class="title">{{order.order_info.delivery=='pickup'? $t('goodsinfo.tihuoshijian'): $t('goodsinfo.songhuoshijian')}} </div>
                <div class="detail"> {{order.order_info.delivery_date}} [{{order.order_info.delivery_time}}]</div>
            </div>
            <div class="item">
                <div class="title">{{$t('goodsinfo.peisongfangshi')}}</div>
                <div class="detail">{{order.order_info.delivery_name}}</div>
            </div>
            <div class="item" v-if="order.order_info.type=='normal'">
                <div class="title">{{groupInfo.owner_name}}{{$t('goodsinfo.xinxi')}}</div>
                <div class="detail">
                    <span>{{order.order_info.ziti_name}}</span>
                    <!--<div @click="callTelphone" class="phone" :data-phone="order.order_info.ziti_mobile" v-if="hidePhone==0">-->
                        <!--<img class="icon-phone" src="@/assets/images/phone2.png"/>-->
                        <!--<span>{{$t('goodsinfo.lianxi')}}{{groupInfo.owner_name}}</span>-->
                    <!--</div>-->
                  <div @click="goLink" class="phone" :data-link="order.order_info.head_whatsapplink" v-if="order.order_info.head_whatsapplink != '' && order.order_info.head_whatsapplink != undefined && order.order_info.head_whatsapplink != null">
                  <img class="icon-phone" src="@/assets/images/phone2.png"/>
                  <span>{{$t('goodsinfo.lianxi')}}{{groupInfo.owner_name}}</span>
                  </div>
                  <!--<div @click="goLink" class="goods-sign-btn" :data-link="community.whatsapplink"-->
                       <!--v-show="community.whatsapplink != '' && community.whatsapplink != undefined && community.whatsapplink != null ">-->
                    <!--<img src="@/assets/images/join-group.png" height="20vw" width="20vw"/> <span-->
                    <!--style="font-size:larger;float:right">Join Group</span>-->
                  <!--</div>-->
                </div>
            </div>
        </div>
    </div>
    <div slot="footer">
        <div class="footer">
      {{$t('common.gong')}} {{order.goods_count}} {{$t('order.jianshangpin')}}  {{$t('goodsinfo.xiaoji')}}
      <div class="money">
        <span>$</span>{{order.order_info.total}}
      </div>
        </div>
    </div>
  <!--</div>-->
</i-card>

</template>

<script>
  import status from '../../utils'

  export default {
    name: 'i-goodsInfo',
    props: {
      order: {
        type: Object
      },
      showNickname: {
        type: Boolean,
        default: !1
      },
      hidePhone: {
        type: Number,
        default: 0
      },
      groupInfo: {
        type: Object,
        default: {
          group_name: "社区",
          owner_name: "团长",
          delivery_ziti_name: "到点自提",
          delivery_tuanzshipping_name: "团长配送",
          delivery_express_name: "快递配送"
        }
      },
      hideInfo: {
        type: Boolean,
        default: !1
      }
    },

    watch:{
      order: {
        handler: function(order) {
          console.log(order,'order');

          var t = order && order.order_info && order.order_info.shipping_tel || "";
          if (t) {
            var a = (t = "" + t).replace(/(\d{3})\d*(\d{4})/, "$1****$2");
            this.tel= a;
          }
//          this.getCommunityInfo(order);
        },
        immediate: true
      }
    },
    created: function() {

    },
    methods:{
      callTelphone: function(e) {
        var t = this;
        this.isCalling || (this.isCalling = !0, wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone,
          complete: function() {
            t.isCalling = !1;
          }
        }));
      },
      getCommunityInfo: function(order) {
        var head_id = order.order_info.head_id;
        status.getCommunityById(head_id).then(res => {
            console.log(res.data,"community");
            this.community = res.data
        })
//        let that = this
//        let community = this.$wx.getStorageSync('community')
//        if (community) {
//          if (!community.head_mobile) {
//            status.getCommunityById(community.communityId).then(res => {
//                debugger
//              this.community = res.data
//            })
//          } else {
//            this.community = community
//          }
//        } else {
//          var token = this.$wx.getStorageSync('token')
//          token && status.getCommunityInfo().then(res => {
//              debugger
//            this.community = res.data
//          })
//        }
//        this.$forceUpdate()
      },
      goLink: function(event) {
        let link = event.currentTarget.dataset.link
        window.location.href = link
      }
    },
    data(){
      return{
        isCalling: !1,
        community:{}
      }
    }
  }
</script>

<style scoped>

  .header {
    padding: 10px 15px;
    color: #444;
    font-size: 14px;
    font-weight: 500;
  }

  .content-wrap {
    border-top: 0.05px solid #efefef;
    padding-bottom: 10px;
  }

  .content-wrap .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 8px 15px 0;
  }

  .content-wrap .item .title {
    word-break: keep-all;
    color: #aaa;
  }

  .content-wrap .item .detail {
    color: #444;
    text-align: right;
    display: flex;
    align-items: center;
  }

  .content-wrap .item .detail .phone {
    margin-left: 10px;
    padding: 0 10px;
    height: 22px;
    display: flex;
    align-items: center;
    border: 0.05px solid #efefef;
    border-radius: 13px;
  }

  .content-wrap .item .detail .phone .icon-phone {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }

  .footer {
    border-top: 0.05px solid #efefef;
    padding: 21px 15px 16px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
  }

  .footer .money {
    color: #ff5344;
    font-size: 20px;
  }
  .goods-sign-btn {
    display: inline-block;
    height: 6vw;
    padding: 0 2vw;
    border: 1px solid #2ebc45;
    border-radius: 3vw;
    text-align: center;
    font-size: 2vw;
    line-height: 5.5vw;
    color: #2ebc45;
    margin-left: 1vw;
    vertical-align:middle;
  }
</style>
