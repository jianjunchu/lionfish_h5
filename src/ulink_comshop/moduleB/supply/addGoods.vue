<template>
<div>
  <div class="container">
    <form>
      <div class="form-group">
        <div class="form-item">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.shangpinbianma')}}</label>
          <input class="form-item-input" data-key="5" :placeholder="$t('supply.qingshurushangpinbianma')" type="text" v-model="codes"/>
        </div>

        <div class="form-item">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.shangpinmingcheng')}}</label>
          <input class="form-item-input" data-key="1" :placeholder="$t('supply.qingshurushangpinmingcheng')" type="text" v-model="goodsname"/>
        </div>

        <div class="form-item">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.shangpinguige')}}</label>
          <input class="form-item-input" :placeholder="$t('supply.qingshurushangpinjianjie')" type="text" v-model="subtitle"/>
        </div>

        <div class="form-item" @click="showCategory">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.shangpinfenlei')}}</label>
          <input class="form-item-input" data-key="3" :placeholder="$t('supply.qingxuanzeshangpinfenlei')" type="text" :value="yearName+'-'+monthName" disabled="true"/>
        </div>

        <div :style="showCategorys?'display:block;width: 100vw;height: 264px;border-bottom: 0.2vw solid #e4e4e4':'display:none;width: 80vw;height: 200px;border-bottom: 0.2vw solid #e4e4e4'">
            <!-- <button 
                wx:for="{{riderCommentList}}" 
                wx:for-item="item" 
                wx:key="item.index"  
                bindtap="checkboxChange" 
                data-value="{{item.id}}" 
                data-index="{{index}}"  
                checked="{{item.selected}}"
                class="btn {{item.selected ? 'btn-selected' : ''}}" >
                {{item.name}}
            </button> -->
          <div class="container">
            <div class="page-body">
              <van-picker style="width: 100%; height: 264px;" :columns="columns" @change="onPickerChange"/>
            </div>
          </div>
        </div>

        <div class="form-item">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.shangpintupian')}}</label>
          <!-- <input bindinput="inputThumbs" class="form-item-input" data-key="6" placeholder="请输入商品图片" type="text" value="{{thumbs}}" bindtap='addImg'/> -->
          <input @click="showImage" class="form-item-input" data-key="3" :placeholder="$t('supply.qingxuanzeshangpintupian')" type="text" readonly/>
        </div>

        <div style="width: 100%;height: 20vw;overflow-y: auto;border-bottom: 0.2vw solid #e4e4e4;" v-show="showImages">
          <van-uploader v-model="piclist" :max-count="countPic" :after-read="thumbsAfterRead" v-if="thumbs.length<=countPic"/>
        </div>

        <div class="form-item">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.kucun')}}</label>
          <input :focus='focus_total' class="form-item-input" data-key="2" :placeholder="$t('supply.qingshurukucun')" type="text" v-model="total"/>
        </div>

        <div class="form-item">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.shoujia')}}</label>
          <input class="form-item-input" data-key="4" :placeholder="$t('supply.qingshurushoujia')" type="text" v-model="price"/>
        </div>

        <div class="form-item">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            :inactive-text="$t('supply.shezhiqitaxinxi')"
            v-model="switchShow">
          </el-switch>
        </div>

        <div class="form-item" v-show="switchShow">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.tuanzhangyongjin')}}</label>
          <input class="form-item-input" data-key="4" :placeholder="$t('supply.tuanzhangyongjintishi')" type="text" v-model="community_head_commission"/>
        </div>

        <div class="form-item" v-show="switchShow">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.yijifenxiaoyongjin')}}</label>
          <input class="form-item-input" data-key="4" :placeholder="$t('supply.yijifenxiaoyongjintishi')" type="text" v-model="commission1_rate"/>
        </div>

        <div class="form-item" v-show="switchShow">
          <label class="form-item-control"><label style="color: red">*</label>{{$t('supply.erjifenxiaoyongjin')}}</label>
          <input class="form-item-input" data-key="4" :placeholder="$t('supply.erjifenxiaoyongjintishi')" type="text" v-model="commission2_rate"/>
        </div>

        <div class="form-item" v-show="switchShow">
          <label class="form-item-control">{{$t('supply.yuanjia')}}</label>
          <input class="form-item-input" data-key="4" :placeholder="$t('supply.qingshuruyuanjia')" type="text" v-model="productprice"/>
        </div>

        <div class="form-item" v-show="switchShow">
          <label class="form-item-control">{{$t('supply.chengbenjiage')}}</label>
          <input class="form-item-input" :placeholder="$t('supply.qingshuruchengbenjiage')" type="text"  v-model="costprice"/>
        </div>

        <div class="form-item" v-show="switchShow">
          <label class="form-item-control">{{$t('supply.shangpinmiaoshu')}}</label>
          <input class="form-item-input" :placeholder="$t('supply.qingshurushangpinmiaoshu')" type="text" v-model="content"/>
        </div>

        <div class="form-item">
          <label class="submit">
            {{$t('supply.tijiao')}}
            <button hidden @click="submit"></button>
          </label>
        </div>
      </div>
    </form>
  </div>
  <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>
</div>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import axios from 'axios'
  var date = new Date();
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-addGoods',
    data() {
      return {
        categorys:[],
        image_thumb: '',
        image_o_full: '',
        orign_image: '',
        id:'',
        goodsname: '',
        cate_mult: [],
        cate_pids:[],
        total: '',
        price: '',
        productprice: '',
        costprice:'',
        codes:'',
        subtitle:'',
        thumbs: [],
        content:'',
        riderCommentList: [],
        showCategorys: false,
        showImages: false,
        catids: [],
        catNames: [],
        countPic: 9,//上传图片最大数量
        showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
        uploadImgUrl: '',//图片的上传的路径
        years: [1999,2000,2001,2002],
        year: date.getFullYear(),
        yearName: this.$t('supply.qingxuanze'),
        months: [],
        month: 2,
        monthName: this.$t('supply.qingxuanze'),
        cateValue: [2, 1],
        cates_name:[],
        cate_pids_name:[],
        piclist: [],
        community_head_commission: 0,
        hascommission: 1,
        commission1_rate: 0,
        commission2_rate: 0,
        columns: [],
        switchShow: false
      }
    },
    watch: {
      total: {
        handler: function(newValue,oldValue) {
          this.total = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
      price: {
        handler: function(newValue,oldValue) {
          this.price = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
      productprice: {
        handler: function(newValue,oldValue) {
          this.productprice = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
      codes: {
        handler: function(newValue,oldValue) {
          this.inputCodes();
        }
      },
      costprice: {
        handler: function(newValue,oldValue) {
          this.costprice = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
      community_head_commission: {
        handler: function(newValue,oldValue) {
          this.community_head_commission = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
      commission1_rate: {
        handler: function(newValue,oldValue) {
          this.commission1_rate = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
      commission2_rate: {
        handler: function(newValue,oldValue) {
          this.commission2_rate = newValue.replace(/^\s*|\s*$/g, "");
        }
      },
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('supply.xinzengshangpin'),
        showBack: true
      })
    },
    mounted: function() {
      const o = this.$route.query || {};
      this.onLoad(o)
      this.onShow()
    },
    methods: {
      onLoad: function (options) {
        status.setNavBgColor();
        this.getCategorys();
        this.inputCodes();
        let id = options.id || '';
        if (id) {
          this.getGoods(id);
        }
      },

      onShow: function () {
        util.check_login_new().then((res) => {
          if (res) {
            this.needAuth = false;
          } else {
            this.needAuth = true;
          }
        })
      },

      selectTap() {
        this.show = !this.show;
      },

      optionTap(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.index = Index;
        this.show = !this.show;
      },

      authSuccess: function () {
        this.needAuth = false;
        this.getData();
      },

      showCategory: function(){
        this.showCategorys = !this.showCategorys;
      },

      authModal: function() {
        var that = this;
        if (that.needAuth) {
          wx.navigateTo({
            url: '/login'
          })
          return false;
        } else {
          return !that.needAuth;
        }
      },

      getCategorys: function () {
        let that = this;
        let token = wx.getStorageSync('token');
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.get_category_list',
            token
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              var data = res.data;
              that.years = data;
              var categorys = [];
              for (var i = 0; i < data.length; i++) {
                var category = {
                  id: data[i].id,
                  text: data[i].name_en || data[i].name
                }
                categorys.push(category);
              }
              var column1 = {
                values: categorys,
                defaultIndex: that.cateValue[0]
              }
              var column2 = {
                values: [],
                defaultIndex: that.cateValue[1]
              }
              that.columns.push(column1);
              that.columns.push(column2);
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      },

      onPickerChange: function(picker, values, index) {
        var pid = values[0].id;
        this.yearName = values[0].text;
        var cid = 0;
        if (values[1]) {
          cid = values[1].id;
        }
        this.getChildCate(pid,cid,picker);
      },

      getChildCate: function(pid,cid,picker){
        let that = this;
        let token = wx.getStorageSync('token');
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.get_category_list',
            token,
            pid: pid
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              var data = res.data;
              that.months = data;
              var categorys = [];
              var index = that.cateValue[1];
              for (var i = 0; i < data.length; i++) {
                if (cid == data[i].id) {
                  index = i;
                }
                var category = {
                  id: data[i].id,
                  text: data[i].name_en || data[i].name
                }
                categorys.push(category);
              }
              picker.setColumnValues(1, categorys);
              var catids = [];
              catids.push(data[index].id);
              that.year = pid;
              that.month = data[index].id;
              that.monthName = data[index].name_en || data[index].name;
              that.catids = catids;
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      },

      inputCodes: function () {
          let that = this;
          let token = wx.getStorageSync('token');
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'supplymobile.get_new_codes',
              token
            },
            dataType: 'json',
            success: function (res) {
              if (res.code == 0) {
                var data = res.data;
                console.log(data,"123");
                that.codes = data;
              }
            }
          })
      },

      showImage: function(){
        this.showImages = !this.showImages;
      },

      thumbsAfterRead:function () {
        let files =[];

        if (this.piclist && this.piclist.length > 0 ){
          for (var i = 0; i < this.piclist.length; i++) {
            files.push(this.piclist[i].file);
          }
          this.thumbsAddfiles(files);
        }
      },
      thumbsAddfiles:function(files){
        var that = this;
        var thumbs = [];
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
              thumbs.push(orign_image);
              that.thumbs = thumbs;
           })
        }
      },

      getGoods: function (goods_id) {
        let that = this;
        let token = wx.getStorageSync('token');
        wx.showLoading();
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'supplymobile.get_edit_goods_info',
            token,
            goods_id
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            console.log(res,"get_edit_goods_info");
            if (res.code == 0) {
              var data = res.data;
              that.id = data.goods_id;
              that.goodsname = data.goodsname;
              that.catids = data.cates;
              that.cates_name = data.cates_name;
              that.cate_mult = data.cates;
              that.cate_pids = data.cate_pids;
              that.cate_pids_name = data.cate_pids_name;
              that.total = data.total;
              that.price = data.price;
              that.codes = data.codes;
              that.costprice = data.costprice;
              that.subtitle = data.subtitle;
              that.content = data.content;
              that.productprice = data.productprice;
              that.community_head_commission = data.community_head_commission;
              that.commission1_rate = data.commission1_rate;
              that.commission2_rate = data.commission2_rate;
              that.piclist = data.piclist;
              var cateValue = new Array();
              cateValue[0] = data.cate_pids[0];
              cateValue[1] = data.cates[0];

              that.cateValue = cateValue;
              that.yearName = data.cate_pids_name[0];
              that.monthName = data.cates_name[0];
              var thumbs = new Array();
              var piclist = data.piclist;
              for (var pic of piclist) {
                thumbs.push(pic.thumb);
              }
              that.thumbs = thumbs;

              //分类回显
              //1,获取一级分类的index
              var pid = data.cate_pids[0];
              var index1 = 0;
              var i = 0;
              for(var nows of that.years){
                if(pid == nows.id){
                  index1 = i;
                  break;
                }
                i++;
              }
              console.log(index1,"一级分类")
              //2,获取二级分类的index
              var cid = data.cates[0];
              var index2 = 0;
              let token = wx.getStorageSync('token');
              app.util.request({
                url: 'entry/wxapp/index',
                data: {
                  controller: 'supplymobile.get_category_list',
                  token,
                  pid: pid
                },
                dataType: 'json',
                success: function (res) {
                  if (res.code == 0) {
                    var data = res.data;
                    that.months = data;
                    var n = 0;
                    for (var nows of data) {
                      if (cid == nows.id) {
                        index2 = n;
                        break;
                      }
                      n++;
                    }
                    that.cateValue = [index1,index2];
                    that.columns[0].defaultIndex = index1;
                    that.columns[1].defaultIndex = index2;
                  } else {
                    wx.showToast({
                      title: res.msg || that.$t('supply.qingqiuchucuo'),
                      icon: 'none'
                    })
                  }
                }
              })

              that.showImage();
            } else {
              wx.showToast({
                title: res.msg || that.$t('supply.qingqiuchucuo'),
                icon: 'none'
              })
            }
          }
        })
      },

      submit: function () {
        if (!this.authModal()) return;
        var token = wx.getStorageSync('token');

        var goodsname = this.goodsname;
        var id = this.id;
        var cate_mult = this.catids;
        var total = this.total;
        var price = this.price;
        var productprice = this.productprice;
        var costprice = this.costprice;
        var codes = this.codes;
        var subtitle = this.subtitle;
        var thumbs = this.thumbs;
        var content = this.content;
        var community_head_commission = this.community_head_commission;
        var hascommission = this.hascommission;
        var commission1_rate = this.commission1_rate;
        var commission2_rate = this.commission2_rate;

        var that = this;

        if (goodsname == '') {
          wx.showToast({
            title: that.$t('supply.qingshurushangpinmingcheng'),
            icon: 'none',
          })
          return false;
        }

        if (cate_mult == '') {
          wx.showToast({
            title: that.$t('supply.qingxuanzeshangpinfenlei'),
            icon: 'none',
          })
          return false;
        }

        if (total == '') {
          wx.showToast({
            title: that.$t('supply.qingshurukucun'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[+]{0,1}(\d+)$/.test(total))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        if (price == '') {
          wx.showToast({
            title: that.$t('supply.qingshurushoujia'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(price))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        if (productprice == '') {
          wx.showToast({
            title: that.$t('supply.qingshuruyuanjia'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(productprice))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        if (codes == '') {
          wx.showToast({
            title: that.$t('supply.qingshurushangpinbianma'),
            icon: 'none',
          })
          return false;
        }

        if (thumbs == '') {
          wx.showToast({
            title: that.$t('supply.qingxuanzeshangpintupian'),
            icon: 'none',
          })
          return false;
        }

        if (community_head_commission == '') {
          wx.showToast({
            title: that.$t('supply.qingshezhituanzhangyongjin'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(community_head_commission))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        if (community_head_commission < 0 || community_head_commission > 100) {
          wx.showToast({
            title: that.$t('supply.tuanzhangyongjinbaifenbitishi'),
            icon: 'none',
          })
          return false;
        }

        if (commission1_rate == '') {
          wx.showToast({
            title: that.$t('supply.qingshezhiyijifenxiaoyongjin'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(commission1_rate))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        if (commission1_rate < 0 || commission1_rate > 100) {
          wx.showToast({
            title: that.$t('supply.yijifenxiaoyongjinbaifenbitishi'),
            icon: 'none',
          })
          return false;
        }

        if (commission2_rate == '') {
          wx.showToast({
            title: that.$t('supply.qingshezhierjifenxiaoyongjin'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(commission2_rate))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        if (commission2_rate < 0 || commission2_rate > 100) {
          wx.showToast({
            title: that.$t('supply.erjifenxiaoyongjinbaifenbitishi'),
            icon: 'none',
          })
          return false;
        }

        if (costprice == '') {
          wx.showToast({
            title: that.$t('supply.qingshuruchengbenjiage'),
            icon: 'none',
          })
          return false;
        }

        if (!(/^[0-9]+(.?[0-9]{1,2})?$/.test(costprice))) {
          wx.showToast({
            title: that.$t('supply.qingshurushuzi'),
            icon: 'none',
          })
          return false;
        }

        var s_data = {};
        if (id == '') {//新增
          s_data = {
            goodsname, cate_mult, total, price,productprice, codes, thumbs,
            costprice, subtitle, content,
            community_head_commission, hascommission, commission1_rate, commission2_rate,
            controller: 'supplymobile.addgoods',
            'token': token
          };
        }else{
          //修改保存
          s_data = {
            id, goodsname, cate_mult, total, price,productprice, codes, thumbs,
            costprice, subtitle, content,
            community_head_commission, hascommission, commission1_rate, commission2_rate,
            controller: 'supplymobile.modify_goods',
            'token': token
          };
        }

        console.log(s_data,"parms");
        app.util.request({
          'url': 'entry/wxapp/user',
          'data': s_data,
          method: 'post',
          dataType: 'json',
          success: function (res) {
            if (res.code == 0) {
              var url = "/ulink_comshop/moduleB/supply/goodsManage";
              wx.navigateTo({ url: url });
            } else {

            }
          }
        })

      }
    }
  }
</script>

<style scoped>
.header {
  background: #f75451;
  height: 16vw;
  color: #fff;
  font-size: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group {
  padding: 1.2vw 3vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group .form-item {
  display: flex;
  align-items: center;
  border-bottom: 0.2vw solid #e4e4e4;
  font-size: 3vw;
  transition: all 0.3s;
  width: 100%;
}

.form-group .form-item:last-child {
  border: none;
}

.form-group .form-item.error {
  border-color: #f75451;
}

.form-group .form-item .form-item-control {
  width: 19vw;
  height: 10vw;
  line-height: 10vw;
}

.form-group .form-item .form-item-input {
  flex: 1;
  height: 10vw;
  line-height: 10vw;
  border: none;
  background: none;
}

.weui-cell__hd {
  position: relative;
  font-size: 2.8vw;
  text-align: left;
}

.weui-pos {
  width: 4vw;
  height: 5vw;
  background: url(https://mall.shiziyu888.com/dan/Common/image/order_checkout_icon.png) no-repeat;
  background-position: 0 0;
  background-size: 13.2vw 14.2vw;
}

.form-group .form-item .form-item-input .picker {
  height: 10vw;
  line-height: 10vw;
}

.form-group .form-item .captcha {
  color: #666;
  border-left: 0.4vw solid #ddd;
  padding-left: 2vw;
  width: 16vw;
  height: 100%;
  text-align: center;
}

.form-group .form-item .placeholder {
  color: #ccc;
}

.form-group .form-item .input-placeholder {
  color: #ccc;
}

.form-group .form-item .submit {
  width: 64vw;
  margin: 4.6vw auto 0;
  height: 9.4vw;
  border-radius: 9.4vw;
  font-size: 3.6vw;
  background: #f75451;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group .form-item .submit.disabled {
  background: #dcdcdc;
}

.apply-pass {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}

.add-img-btn {
  color: #ccc;
}

.form-group .form-item2 {
  border-bottom: 0;
  flex-direction: column;
  align-items: flex-start;
}

.form-item-textarea {
  width: 100%;
  border: 0.2vw solid #e4e4e4;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
}

.apply-pass {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}

.apply-pass img {
  width: 15.6vw;
  height: 14.4vw;
  padding-top: 15vw;
  margin-bottom: 2.8vw;
}

.apply-pass .applyPassImg {
  width: 18.6vw;
  height: 18.6vw;
  font-size: 23vw;
  color: #ef994c;
  margin-bottom: 4vw;
  margin-top: 10.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.apply-pass .h1 {
  font-size: 3.2vw;
  margin-bottom: 2vw;
  color: #555;
}

.apply-pass .p {
  font-size: 2.8vw;
  color: #999;
  margin-bottom: 3vw;
}

.apply-pass .link-btn {
  width: 31vw;
  height: 9.8vw;
  border-radius: 2vw;
  background: #fb5a50;
  color: #fff;
  font-size: 32rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.fixed-share {
  display: inline-block;
  bottom: 22%;
  right: 3vw;
  width: 8vw;
  height: 8vw;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  font-size: 2vw;
  padding: 1vw;
  line-height: 1.2;
  z-index: 100;
}

.fixed-share .iconfont {
  font-size: 3vw;
}

.btn{
  width: 20vw;
  height: 7vw;
  font-size: 2.4vw;
  padding: 0;
  border: 1px solid #dcdcdc;
  background: #fff;
  border-radius: 4px;
  margin: 1.5vw 1vw;
  text-align: center;
  float: left;
  margin-left: 2vw;
}
.btn-selected{
  border: 1px solid #06a380;
}

</style>
