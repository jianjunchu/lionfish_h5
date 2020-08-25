<template>
  <div class="wrap">
    <div class="goods">
      <div class="goods-item">
        <div style="goods-item-l">
          <i-img height="60" iClass="show-img" lazyLoad="true" :loadImage="order_goods.goods_images" width="60"></i-img>
        </div>
        <div class="goods-item-r">
          <div class="name">{{order_goods.name}}</div>
          <div class="mount">
            <block v-if="order_goods.option_str">{{order_goods.option_str}} </block>${{order_goods.price}} x {{order_goods.quantity}}
          </div>
          <div class="price">${{total}}</div>
        </div>
      </div>
    </div>
    <div class="cell-col">
      <div class="tit">{{$t('refund.tuikuanshuliang')}}：</div>
      <div class="ll">
        <label :class="['i-flex', 'i-flex-alc', 'fsz-26', 'mb10', item.isrefund?'isrefund':'']" v-if="selArr&&selArr.length" v-for="(item ,index) in selArr" :key="index">
          <div class="checkbox" v-if="item.isrefund">
            <img class="checkbox-img" src="@/assets/images/checkbox-disabled.png"></img>
          </div>
          <checkbox-group bindchange="goodsselect" :data-idx="index" v-else>
            <div class="checkbox">
              <img class="checkbox-img" src="@/assets/images/checkbox-checked.png" v-if="item.isselect"></img>
              <img class="checkbox-img" src="@/assets/images/checkbox-disabled.png" v-else></img>
              <checkbox hidden :checked="item.isselect" :value="item.isselect"></checkbox>
            </div>
          </checkbox-group>
          <div class="mx10 i-flex-item text-overflow1">{{order_goods.name}}</div>
        </label>
      </div>
    </div>
    <div class="cell">
      <div class="cell-hd">{{$t('refund.shouhouleixing')}}：</div>
      <div class="cell-bd">{{$t('refund.shenqingtuikuan')}}</div>
    </div>
    <div class="cell">
      <div class="cell-hd">{{$t('refund.wentileixing')}}：</div>
      <div class="cell-bd">
        <div class="picker" @click="showPicker = true">
          {{xarray[index]}}
        </div>


        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            :default-index="index"
            show-toolbar
            :columns="xarray"
            @cancel="showPicker = false"
            @confirm="bindPickerChange"
          />
        </van-popup>


      </div>
    </div>
    <div class="cell">
      <div class="cell-hd">{{$t('refund.tuikuanjine')}}：</div>
      <div class="cell-bd">
        <input bindinput="refund_money_input" class="cell-ipt" :placeholder="'最高可退款 $'+total" type="text" :value="refund_money"></input>
      </div>
    </div>
    <div class="cell">
      <div class="cell-hd">{{$t('refund.peisongfei')}}：</div>
      <div class="cell-bd">
        <div>${{order_goods.shipping_fare}}</div>
        <div class="fsz-22 text-gray" v-if="order_goods.shipping_fare==0">{{$t('refund.wupeisongfei')}}无配送费</div>
      </div>
    </div>
    <div class="cell-col">
      <div class="tit">{{$t('refund.shangpinwentimiaoshu')}}：</div>
      <textarea v-model="complaint_desc" class="cell-textarea" maxlength="1000" placeholder="问题描述越详细,可以提高您的申请成功率哦~" ></textarea>
    </div>
    <div class="cell-col">
      <div class="tit">{{$t('refund.shangchuanpingzhengtupian')}}</div>
      <div class="img-wrap">
        <van-uploader preview-size="18vw" :after-read="afterRead" v-model="uploader_file" multiple :max-count="3" />
      </div>
    </div>
    <div class="cell">
      <div class="cell-hd">{{$t('refund.lianxiren')}}：</div>
      <div class="cell-bd">
        <input  v-model="complaint_name" class="cell-ipt" maxlength="20" placeholder="请输入联系人" type="text" />
      </div>
    </div>
    <div class="cell">
      <div class="cell-hd">{{$t('refund.lianxifangshi')}}：</div>
      <div class="cell-bd">
        <input  v-model="complaint_mobile" class="cell-ipt" maxlength="20" placeholder="请输入手机号" type="number" />
      </div>
    </div>
    <div class="submit_button">
      <div @click="sub_refund" class="span">{{$t('refund.tijiaoshenqing')}}</div>
    </div>
    <div class="note">
      <div class="note-tit">{{$t('refund.tuikuanxuzhi')}}</div>
      <div class="article">
        <div class="p">请按照提示关注维权进度和超时提醒并提供相应凭证。</div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Checkbox, CheckboxGroup,Picker ,Popup,Uploader} from 'vant';
  var app,wx;
  export default {
    name: 'refund',
    components:{[Checkbox.name]:Checkbox,[CheckboxGroup.name]:CheckboxGroup,[Picker.name]:Picker,[Popup.name]:Popup,[Uploader.name]:Uploader},
    data(){
      return{
        xarray: [ "点击选择退款理由", "商品有质量问题", "没有收到货", "商品少发漏发发错", "商品与描述不一致", "收到商品时有划痕或破损", "质疑假货", "其他" ],
        index: 0,
        uploader_file:[],
        refund_type: 1,
        refund_imgs: [],
        complaint_mobile: "",
        refund_thumb_imgs: [],
        complaint_desc: "",
        order_id: 0,
        order_status_id: -1,
        complaint_name: "",
        ref_id: 0,
        complaint_money: 0,
        refund_money: 0,
        selArr: [],
        canRefund: !0,
        order_goods:{},
        showPicker: false
      }
    },
    created:function(){
      wx = this.$wx
      app = this.$getApp();

      wx.setNavigationBarTitle({
        title: 'Refund',
        showLogo: false,
        showMore: false,
        showBack: true
      })

      const t = this.$route.query
      this.onLoad(t);
    },
    methods:{
      onLoad: function(e) {
        var t = e.id, a = e.order_goods_id, r = e.ref_id, n = this;
        this.order_id = t || 0, this. order_goods_id = a || 0, this.ref_id = r || 0;
        n.getData();

      },
      bindPickerChange: function(v,idx) {
        this.index =idx
        this.showPicker = false
      },
      afterRead: function(file) {
        console.log(file)
        console.log(this.refund_thumb_imgs)
        const o = this;
        const formFile = new FormData();
        const imgName = 'upfile';
        formFile.append(imgName, file.file);
        wx.uploadFile({
          url: app.util.url({
            filePath: file.name,
            name:'upfile',
            controller: "goods.doPageUpload"
          }),
          formFile:formFile,
          success: function(e) {
            console.log(e)
            wx.hideLoading();

            var t = e.data, a = t.image_thumb, r = t.image_o, n = o.refund_imgs, i = o.refund_thumb_imgs;
            n.push(r), i.push(a)
            o.refund_thumb_imgs = i
            o.refund_imgs = n
          }
        });
      },
      chose_type: function(e) {
        var t = e.currentTarget.dataset.rel;
        this.refund_type = t
      },
      cancle_img: function(e) {
        var t = e.currentTarget.dataset.sr, a = 0, r = this.refund_imgs, n = this.refund_thumb_imgs, i = [], o = [];
        for (var s in n) n[s] == t ? (console.log("find"), a = s) : o.push(n[s]);
        for (var s in r) s != a && i.push(r[s]);
        (
          this.refund_thumb_imgs = o,
          this.refund_imgs = i
        ), console.log(o.length), console.log(i.length);
      },



      refund_money_input: function(e) {
        var t = parseFloat(e.detail.value), a = this.refund_money, r = {};
        a < t && (wx.showToast({
          title: "最大退款金额为" + a,
          icon: "none",
          duration: 1e3
        }), t = a, r.refund_money = a), r.complaint_money = t || 0, this.setData(r);
      },
      sub_refund: function() {
        var t = this;
        if (t.canRefund) {
          var e = this, a = e.index, r = e.xarray, n = e.order_id, i = e.order_goods_id, o = e.refund_type, s = e.refund_imgs, d = e.complaint_desc, u = e.complaint_mobile, _ = e.total, c = e.complaint_name, l = e.complaint_money, f = e.ref_id, m = e.real_refund_quantity;
          if (l = parseFloat(l), m <= 0) return this.errorToast("请选择退款商品"), !1;
          if (0 == a) return this.errorToast("请选择问题类型"), !1;
          var p = r[a];
          if (l <= 0) return this.errorToast("请填写正确退款金额"), !1;
          if (_ < l && (l = _), "" == d) return this.errorToast("请填写正确问题描述"), !1;
          if ("" == c) return this.errorToast("请填写正确联系人"), !1;
          if ("" == u) return this.errorToast("请填写正确手机号"), !1;
          if (!/^\d{8}$/.test(u) && !/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(u)) return this.errorToast("请填写正确手机号"),
            !1;
          t.canRefund = !1;
          var h = wx.getStorageSync("token");
          app.util.request({
            url: "entry/wxapp/index",
            data: {
              controller: "afterorder.refund_sub",
              token: h,
              ref_id: f,
              order_id: n,
              order_goods_id: i,
              complaint_type: o,
              complaint_images: s.join(','),
              complaint_desc: d,
              complaint_mobile: u,
              complaint_reason: p,
              complaint_money: l,
              complaint_name: c,
              real_refund_quantity: m
            },
            method: "POST",
            dataType: "json",
            success: function(e) {
              if (wx.hideLoading(), t.canRefund = !0, 3 == e.code) wx.showToast({
                title: "未登录",
                icon: "loading",
                duration: 1e3
              }); else {
                if (0 == e.code) return void wx.showToast({
                  title: e.msg,
                  icon: "success",
                  duration: 1e3
                });
                wx.showToast({
                  title: "申请成功",
                  icon: "success",
                  duration: 3e3,
                  success: function(e) {
                    wx.redirectTo({
                      url: "/lionfish_comshop/pages/order/order?id=" + t.order_id
                    });
                  }
                });
              }
            }
          });
        }
      },
      errorToast: function(e) {
        wx.showToast({
          title: e,
          icon: "none",
          duration: 1e3
        });
      },
      getData: function() {
        var e = wx.getStorageSync("token"), b = this, t = this, a = t.order_id, r = t.order_goods_id, n = t.ref_id;
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "afterorder.get_order_money",
            token: e,
            order_id: a,
            order_goods_id: r,
            ref_id: n
          },
          dataType: "json",
          success: function(e) {
            if (1 == e.code) {
              var t = e, a = t.order_goods, r = t.order_status_id, n = t.refund_image, i = t.refund_info, o = t.shipping_name, s = t.shipping_tel, d = t.total, u = b.xarray, _ = i.ref_name, c = u.findIndex(function(e) {
                return e == _;
              });
              c = c <= 0 ? 0 : c;
              var l = i.ref_description, f = i.ref_mobile, m = i.complaint_name, p = i.ref_money, h = a.quantity, g = a.has_refund_quantity, y = a.has_refund_money, v = new Array(parseInt(h));
              g = parseInt(g);
              for (var x = 0; x < v.length; x++) v[x] = g <= x ? {
                isselect: !0,
                isrefund: !1
              } : {
                isselect: !0,
                isrefund: !0
              };
              var w = (1 * d - 1 * y).toFixed(2), T = parseInt(h) - g;
              (
                b.order_goods = a,
                b.order_status_id = r,
                b.refund_image = n,
                b.refund_info = i,
                b.shipping_name = o,
                b.shipping_tel = s,
                b.total = w,
                b.index = c || 0,
                b.complaint_desc = l || "",
                b.complaint_mobile = f || s,
                b.complaint_name = m || o,
                b.complaint_money = p || w,
                b.refund_money = p || w,
                b.selArr = v,
                b.real_refund_quantity = T
              )
            } else e.code;
          }
        });
      },
      goodsselect: function(e) {
        var t = e.target.dataset.idx, a = this, r = a.selArr, n = a.order_goods, i = a.total, o = {
          isselect: !r[t].isselect,
          isrefund: r[t].isrefund
        };
        r[t] = o;
        var s = 0;
        r.forEach(function(e) {
          e.isselect && !e.isrefund && (s += 1);
        });
        var d = n.price * s;
        i < d && (d = i), (
          a.selArr = r,
          a.real_refund_quantity = s,
          a.complaint_money = d,
          a.refund_money = d
        );
      }
    }

  }
</script>

<style scoped>
  .goods {
    background-color: #fff;
  }

  .goods-item {
    position: relative;
    display: flex;
    padding: 3vw;
  }

  .goods-item::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .goods-item-r {
    flex: 1;
    margin-left: 2vw;
    width: 0;
  }

  .show-img {
    width: 12vw;
    height: 12vw;
  }

  .name {
    font-size: 2.6vw;
    color: #444;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .mount {
    font-size: 2.2vw;
    color: #aaa;
    margin-top: 0.8vw;
  }

  .goods-item .price {
    display: block;
    font-size: 2.8vw;
    color: #444;
    margin-top: 1.4vw;
  }

  .cell {
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 3vw;
    align-items: center;
  }

  .cell::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .cell-hd,.tit {
    color: #000;
  }

  .cell-col {
    position: relative;
    background-color: #fff;
    padding: 2vw 3vw;
  }

  .cell-col .tit {
    margin-bottom: 2vw;
  }

  .cell-col::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .image_uploader_selector {
    width: 56px;
    height: 56px;
    border: 1px dashed #ccc;
    display: inline-block;
  }

  .image_uploader_indicate {
    position: absolute;
    font-size: 32px;
    color: #ccc;
    width: 56px;
    height: 56px;
    line-height: 52px;
    text-align: center;
  }

  .cell-ipt {
    text-align: right;
    border: none;
  }

  .cell-textarea {
    width: 100%;
    height: 20vw;
    border: none;
  }

  .submit_button {
    height: 7vw;
    line-height: 7vw;
    top: 10px;
    position: relative;
    border-top: 1px solid #eee;
    text-align: center;
    margin: 15px 3vw 30px;
  }

  .submit_button .span {
    padding: 5px 20px;
    font-size: 15px;
    color: #fff;
    background-color: #F75451;
    position: relative;
    text-align: center;
    border-radius: 5px;
  }

  .note {
    padding: 3vw 3vw 10vw;
  }

  .note-tit {
    font-weight: bold;
    margin-bottom: 1vw;
    font-size: 2.8vw;
  }

  .article .p {
    font-size: 2.4vw;
    color: #666;
    line-height: 1.6;
  }

  .image_uploader_image {
    position: relative;
    display: inline-block;
    width: 56px;
    height: 56px;
    border: 1px dashed #e6e6e6;
    padding: 1px;
    box-sizing: border-box;
    margin-right: 12px;
  }

  .image_uploader_image img {
    width: 52px;
    height: auto;
    max-width: 52px;
    max-height: 52px;
    overflow: hidden;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .image_uploader_image .image_uploader_image_img_portrait {
    width: auto!important;
    height: 52px!important;
  }

  .image_uploader_image .image_uploader_image_delete {
    border-radius: 50%;
    position: absolute;
    right: -8px;
    top: -8px;
    background-color: #ff2742;
    line-height: 20px;
    height: 20px;
    width: 20px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

  .checkbox {
    width: 5vw;
    height: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkbox .checkbox-img {
    width: 4.8vw;
    height: 4.8vw;
  }

  .isrefund {
    text-decoration: line-through;
  }
</style>
