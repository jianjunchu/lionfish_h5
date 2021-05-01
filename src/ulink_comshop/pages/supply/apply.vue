<template>
  <div>
    <div class="container" v-if="state==null">
      <div class="header" :style="{background:skin.color}">{{$t('supply.shenqingchengwei1')}}{{supply_diy_name}}{{$t('supply.shenqingchengwei1tishi')}}</div>
      <form>
        <div class="form-group">
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.gongyingshangmingcheng')}}</label>
            <input v-model="shopname" class="form-item-input" :placeholder="$t('supply.qingshuru')+supply_diy_name+$t('supply.mingcheng')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.dianpumingcheng')}}</label>
            <input v-model="storename" class="form-item-input" :placeholder="$t('supply.dianpumingchengtishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.lianxiren')}}</label>
            <input v-model="name" class="form-item-input" :placeholder="$t('supply.lianxirentishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.shoujihao')}}</label>
            <input v-model="mobile" class="form-item-input" :placeholder="$t('supply.shoujihaotishi')" type="text"/>
          </div>
          <div class="form-item form-item2">
            <label class="form-item-control">{{$t('supply.chanpin')}}</label>
            <textarea v-model="product" maxlength="300" class="form-item-textarea" :placeholder="$t('supply.chanpinyijiyoushi')"></textarea>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.youbian')}}</label>
            <input v-model="zip_code" class="form-item-input" :placeholder="$t('supply.fahuodizhideyoubiantishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.dapaihao')}}</label>
            <input v-model="blk_no" class="form-item-input" :placeholder="$t('supply.fahuodizhidedapaihaotishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.luming')}}</label>
            <input v-model="road_name" class="form-item-input" :placeholder="$t('supply.fahuodizhidelumingtishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.jianzhuming')}}</label>
            <input v-model="building" class="form-item-input" :placeholder="$t('supply.fahuodizhidejianzhumingtishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.menpaihao')}}</label>
            <input v-model="lou_meng_hao" class="form-item-input" :placeholder="$t('supply.fahuodizhidemenpaihaotishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.qisongjine')}}</label>
            <input v-model="order_amount_free_delivery" class="form-item-input" :placeholder="$t('supply.qisongjinetishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.yunfei')}}</label>
            <input v-model="delivery_fee_per_order" class="form-item-input" :placeholder="$t('supply.yunfeitishi')" type="text"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.logo')}}</label>
            <input @click="changeShowLogoImages" class="form-item-input" :placeholder="$t('supply.logotishi')" type="text" readonly/>
          </div>
          <div style="width: 100%;height: 20vw;overflow-y: auto;border-bottom: 2px solid #e4e4e4;" v-show="showLogoImages">
            <van-uploader v-model="logoPiclist" :max-count="countPic" :after-read="logoAfterRead" v-if="logo.length<=countPic"/>
          </div>
          <div class="form-item">
            <label class="form-item-control">{{$t('supply.xuanchuantu')}}</label>
            <input @click="changeShowBannerImages" class="form-item-input" :placeholder="$t('supply.bannertishi')" type="text" readonly/>
          </div>
          <div style="width: 100%;height: 20vw;overflow-y: auto;border-bottom: 2px solid #e4e4e4;" v-show="showBannerImages">
            <van-uploader v-model="bannerPiclist" :max-count="countPic" :after-read="bannerAfterRead" v-if="banner.length<=countPic"/>
          </div>
          <div class="form-item">
            <label class="submit" :style="{background:skin.color}">
              {{$t('supply.tijiaoshenqing')}}
              <button hidden @click="submit"></button>
            </label>
          </div>
        </div>
      </form>
    </div>
    <div class="apply-pass" v-if="state==1">
      <img src="@/assets/images/auditSuccess.png"/>
      <div class="h1">{{$t('supply.shenqingtongguo')}}</div>
      <div class='p'>{{$t('supply.shenqingtongguotishi')}}</div>
      <div @click="goLink" class="link-btn" data-link="/ulink_comshop/pages/index/index">{{$t('supply.fanhuishouye')}}</div>
    </div>
    <div class="apply-pass" v-if="state==0">
      <img src="@/assets/images/auditing.png"/>
      <div class="h1">{{$t('supply.shenqingshenhezhong')}}</div>
      <div class='p'>{{$t('supply.shenqingshenhezhongtishi')}}</div>
      <div @click="goLink" class="link-btn" data-link="/ulink_comshop/pages/index/index">{{$t('supply.fanhuishouye')}}</div>
    </div>
  </div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import axios from 'axios'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-recruit',
    data() {
      return {
        supply_diy_name: '',
        image_thumb: '',
        image_o_full: '',
        orign_image: '',
        shopname: '',
        storename:'',
        name: '',
        mobile: '',
        product: '',
        zip_code: '',
        blk_no: '',
        road_name: '',
        building: '',
        lou_meng_hao: '',
        order_amount_free_delivery: '',
        delivery_fee_per_order: '',
        state: null,
        countPic: 1,//上传图片最大数量
        showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
        uploadImgUrl: '',//图片的上传的路径,
        showLogoImages: false,
        showBannerImages: false,
        logoPiclist: [],
        bannerPiclist: [],
        logo: [],
        banner: []
      }
    },
    watch:{
      zip_code: {
        handler: function(newValue, oldValue) {
          var zip_code = newValue.replace(/^\s*|\s*$/g, "");
          this.zip_code = zip_code;
          if("" != zip_code && /^\d{6}$/.test(zip_code)) {
            this.load_address(zip_code);
          }
        },
        immediate: true
      },
      order_amount_free_delivery: {
        handler: function(newValue, oldValue) {
          var order_amount_free_delivery = newValue.replace(/^\s*|\s*$/g, "");
          this.order_amount_free_delivery = order_amount_free_delivery;
        }
      },
      delivery_fee_per_order: {
        handler: function(newValue, oldValue) {
          var delivery_fee_per_order = newValue.replace(/^\s*|\s*$/g, "");
          this.delivery_fee_per_order = delivery_fee_per_order;
        }
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      this.onLoad()
      this.onShow()
    },
    methods: {
      onLoad: function(t) {
        status.setNavBgColor()
        var token = wx.getStorageSync('token')
        var that = this
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            controller: "supply.apply_info",
            token
          },
          dataType: "json",
          method: 'POST',
          success: function(t) {
            let supply_diy_name = t.supply_diy_name || '供应商'
            that.supply_diy_name = supply_diy_name
            var title = that.$t('supply.shenqingchengwei1');
            wx.setNavigationBarTitle({
              title: title+supply_diy_name,
              showBack: true
            })
            if (t.code == 0) {
              that.state = t.state || 0
            } else if(t.code == 1) {
              console.log('needAuth')
            }
          }
        });
      },
      onShow: function() {
        var that = this
        util.check_login_new().then(function(t) {
          that.needAuth = !t
        });
      },
      authModal: function() {
        if (this.needAuth) {
          this.showAuthModal = !this.showAuthModal
          wx.navigateTo({
            url: '/login'
          })
          return false
        }
        return true
      },
      load_address:function(zipCode){
        var token = this.$wx.getStorageSync("token");
        var that = this;
        app.util.request({
          url: "entry/wxapp/user",
          data: {
            controller: "index.load_address",
            token: token,
            zipCode: zipCode
          },
          dataType: "json",
          method: "GET",
          success: function (e) {
            var data = e;
            if (data.found > 0 ) {
              var result =  data.results[0];

              that.building = result.BUILDING;
              that.blk_no = result.BLK_NO;
              that.road_name = result.ROAD_NAME;
              that.lon = result.LONGITUDE;
              that.lat = result.LATITUDE;
            }
          }
        });
      },
      changeShowLogoImages: function() {
        this.showLogoImages = !this.showLogoImages;
      },
      changeShowBannerImages: function() {
        this.showBannerImages = !this.showBannerImages;
      },
      logoAfterRead:function () {
        let files =[];

        if (this.logoPiclist && this.logoPiclist.length > 0 ){
          for (var i = 0; i < this.logoPiclist.length; i++) {
            files.push(this.logoPiclist[i].file);
          }
          this.logoAddfiles(files);
        }
      },
      logoAddfiles:function(files){
        var that = this;
        var logo = [];
        var tempFilePaths = files;
        for (var i = 0; i < tempFilePaths.length; i++) {
          this.$wx.showLoading({
            title: '上传中'
          })
          var filePath = tempFilePaths[i].name;

          var url = this.$app.util.url({
            controller: 'goods.doPageUpload',
            filePath: filePath,
            token: this.$wx.getStorageSync("token"),
            name:'upfile'
          });
          console.log(url,"url");
          let formFile = new FormData();
          let imgName = 'upfile';
          formFile.append(imgName, tempFilePaths[i]);
          axios.post(url,formFile, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }).then(res=> {
              console.log(res,"doPageUpload")
              this.$wx.hideLoading();
              var data = res.data;
              var image_thumb = data.image_thumb;
              var image_o_full = data.image_o_full;
              var orign_image = data.image_o;
              logo.push(orign_image);
              that.logo = logo;
           })
        }
      },
      bannerAfterRead:function () {
        let files =[];

        if (this.bannerPiclist && this.bannerPiclist.length > 0 ){
          for (var i = 0; i < this.bannerPiclist.length; i++) {
            files.push(this.bannerPiclist[i].file);
          }
          this.bannerAddfiles(files);
        }
      },
      bannerAddfiles:function(files){
        var that = this;
        var banner = [];
        var tempFilePaths = files;
        for (var i = 0; i < tempFilePaths.length; i++) {
          this.$wx.showLoading({
            title: '上传中'
          })
          var filePath = tempFilePaths[i].name;

          var url = this.$app.util.url({
            controller: 'goods.doPageUpload',
            filePath: filePath,
            token: this.$wx.getStorageSync("token"),
            name:'upfile'
          });
          console.log(url,"url");
          let formFile = new FormData();
          let imgName = 'upfile';
          formFile.append(imgName, tempFilePaths[i]);
          axios.post(url,formFile, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
            }).then(res=> {
              console.log(res,"doPageUpload")
              this.$wx.hideLoading();
              var data = res.data;
              var image_thumb = data.image_thumb;
              var image_o_full = data.image_o_full;
              var orign_image = data.image_o;
              banner.push(orign_image);
              that.banner = banner;
           })
        }
      },
      submit: function() {
        var that = this;
        if (!that.authModal()) return;
        var token = wx.getStorageSync('token');
        var shopname = that.shopname;
        var storename = that.storename;
        var mobile = that.mobile;
        var name = that.name;
        var product = that.product;
        var zip_code = that.zip_code;
        var blk_no = that.blk_no;
        var road_name = that.road_name;
        var building = that.building;
        var lou_meng_hao = that.lou_meng_hao;
        var order_amount_free_delivery = that.order_amount_free_delivery;
        var delivery_fee_per_order = that.delivery_fee_per_order;
        var logo = that.logo[0];
        var banner = that.banner[0];

        var logoPicList = that.logoPiclist;
        var bannerPiclist = that.bannerPiclist;

        if (shopname == '') {
          wx.showToast({
            title: that.$t('supply.qingshuru')+that.supply_diy_name+that.$t('supply.mingcheng'),
            icon: 'none',
          })
          return false;
        }
        if (storename == '') {
          wx.showToast({
            title: that.$t('supply.dianpumingchengtishi'),
            icon: 'none',
          })
          return false;
        }
        if (name == '') {
          wx.showToast({
            title: that.$t('supply.lianxirentishi'),
            icon: 'none',
          })
          return false;
        }
        if (mobile == '') {
          wx.showToast({
            title: that.$t('supply.shoujihaotishi'),
            icon: 'none',
          })
          return false;
        }
        if (!/^\d{8}$/.test(mobile) && !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))){
          wx.showToast({
            title: that.$t('supply.shoujihaomayouwu'),
            icon: 'none',
          })
          return false;
        }
        if (zip_code == '') {
          wx.showToast({
            title: that.$t('supply.fahuodizhideyoubiantishi'),
            icon: "none"
          })
          return false;
        }
        if (blk_no == '') {
          wx.showToast({
            title: that.$t('supply.fahuodizhidedapaihaotishi'),
            icon: "none"
          })
          return false;
        }
        if (road_name == '') {
          wx.showToast({
            title: that.$t('supply.fahuodizhidelumingtishi'),
            icon: "none"
          })
          return false;
        }
        if (building == '') {
          wx.showToast({
            title: that.$t('supply.fahuodizhidejianzhumingtishi'),
            icon: "none"
          })
          return false;
        }
        if (lou_meng_hao == '') {
          wx.showToast({
            title: that.$t('supply.fahuodizhidemenpaihaotishi'),
            icon: "none"
          })
          return false;
        }
        if (order_amount_free_delivery == '') {
          wx.showToast({
            title: that.$t('supply.qisongjinetishi'),
            icon: "none"
          })
          return false;
        }
        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(order_amount_free_delivery))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzitishi'),
            icon: "none"
          })
          return false;
        }
        if (delivery_fee_per_order == '') {
          wx.showToast({
            title: that.$t('supply.yunfeitishi'),
            icon: "none"
          })
          return false;
        }
        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(delivery_fee_per_order))) {
           wx.showToast({
            title: that.$t('supply.qingshurushuzitishi'),
            icon: "none"
          })
          return false;
        }
        if (logoPicList == '' || logoPicList.length == 0) {
          that.logo = [];
          logo = [];
        }
        if (logo == '') {
          wx.showToast({
            title: that.$t('supply.logotishi'),
            icon: 'none',
          })
          return false;
        }
        if (bannerPiclist == '' || bannerPiclist.length == 0) {
          that.banner = [];
          banner = [];
        }
        var s_data = {
          shopname, storename, name, mobile, product, controller: 'user.supply_apply', 'token': token,
          zip_code, blk_no, road_name, building, lou_meng_hao, order_amount_free_delivery, delivery_fee_per_order,
          logo, banner
        };
        this.$http_post(s_data).then(t=> {
          if (t.code == 0) {
            wx.showToast({
              title: that.$t('supply.tijiaochenggong'),
              icon: 'none',
              duration: 2000,
              success: function(){
                setTimeout(()=>{
                  wx.switchTab({
                    url: '/ulink_comshop/pages/user/me',
                  })
                }, 2000)
              }
            })
          } else {
            wx.showModal({
              title: that.$t('supply.tishi'),
              content: t.msg,
              showCancel: false
            })
          }
        });
      },
      goLink: function(t) {
        var url = t.currentTarget.dataset.link
          wx.redirectTo({
            url
          })
      },
      authSuccess: function() {
        this.needAuth = !1, this.showAuthModal = !1
      },
      onShareAppMessage: function() {}
    }
  }
</script>
<style>
  @import "apply.less";
</style>
