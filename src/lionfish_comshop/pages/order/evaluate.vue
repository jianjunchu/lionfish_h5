<template>

  <div>
    <div class="good-card">
      <div class="good">
        <img :src="order_goods.goods_images"/>
        <span>{{order_goods.name+' '+order_goods.option_str}}</span>
      </div>
      <div class="evaluate-content">
        <!--<textarea Class="placeholder-class" @input="textinput" v-model="pinjia_text" :foucs="focus" maxlength="5000" :placeholder="placeholder"></textarea>-->
        <van-field
          v-model="pinjia_text"
          rows="5"
          autosize
          label=""
          type="textarea"
          maxlength="5000"
          :placeholder="placeholder"
          show-word-limit
        />

        <div class="img-group">
          <div class="img-item" v-if="imgGroup.length"  v-for="(item,index) in imgGroup" :key="item.id">
            <div @click="choseImg" class="close" :data-idx="index">
              <img src="@/assets/images/img-close.png"/>
            </div>
            <img @click="bigImg" :data-list="imgGroup" :data-src="item" mode="aspectFill" :src="item"/>
            <div :class="['progress', (progressList[index]===100?'hide-progress':'')]" style="display:none;">
              <span :style="{width: progressList[index]+'%'}"></span>
            </div>
          </div>
          <!--<div @click="addImg" class="img-item img-add" v-if="imgGroup.length<imgMax">-->
          <!--<div @click="onUpload" class="img-item img-add" v-if="imgGroup.length<imgMax">-->
          <!--<div class="uploadSec" v-if="imgGroup.length<imgMax">-->
            <!--<img class="cameraImg" src="@/assets/images/icon-camera.png" alt="上传图片"/>-->
            <!--<input type="file" id="choose" multiple @change="onUpload" >-->
            <!--&lt;!&ndash;<span>{{imgGroup.length?imgGroup.length+'/'+imgMax:'上传图片'}}</span>&ndash;&gt;-->
          <!--</div>-->
          <van-uploader v-model="fileList" multiple :max-count="4" :after-read="afterRead" v-if="imgGroup.length<imgMax"/>
        </div>

      </div>
    </div>
    <label :class="['submit', (isIpx?'mb20':'')]">提交评价
      <button hidden @click="sub_comment"></button>
    </label>
  </div>

</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js';
  import wcache from '../../utils/wcache.js';
  import auth from '../../utils/auth';
  import wx from '../../utils/wx';
  import request from '../../utils/request';
  import axios from 'axios'
  import { Uploader } from 'vant';


  export default {
    mixins: [GlobalMixin],
//    util:[util],
    status:[status],
    wcache:[wcache],
    auth:[auth],
    name:'order-evaluate',
    data() {
      return {
        fileList: [],
        order_id: 0,
        goods_id: 0,
        miaoshu_no: 0,
        price_no: 0,
        zhiliang_no: 0,
        is_jifen: 0,
        pinjia_text: "",
        thumb_img: [],
        image: [],
        placeholder: "亲，您对这个商品满意吗？您的评价会帮助我们选择更好的商品哦～",
        evaluate: "",
        imgGroup: [],
        imgMax: 4,
        isIpx: !1,
        focus: !1,
        progressList: [],
        goods_images:{
          goods_images:'',
          name:'',
          option_str:''
        },
        order_goods:{},
        goods_image: '',
        upUrl:'',
      }
    },
    created: function() {
//      this.$store.state.app.toolbarTitle ="我的订单";
      this.onLoad();
    },
    methods: {
      onLoad: function() {
        var options = this.$route.query;
        var a = this, e = this.$wx.getStorageSync("token"), o = options.id, i = options.goods_id;

          this.order_id= o,
          this.goods_id= i;
        this.$http({
            controller: "user.order_comment",
            token: e,
            order_id: o,
            goods_id: i
          }).then(t=> {
              console.log(t,"order_comment");

            if (3 == t.code ){
              //un login
            }else if( 0 == t.code){
                a.goods_id= t.goods_id,
                a.order_goods= t.order_goods,
                a.goods_image= t.goods_image;
            }
        });
      },
      onReady: function() {},
      onUpload:function (e) {
//        var o=document.getElementById("choose");
//        o.fireEvent("onchange");
        let photoFile = e.target
        let val = e.target.value
        // 判断是否符合上传条件
        if (photoFile.files.length === 0) return false;
        this.addfiles(photoFile.files);
      },
      afterRead:function () {
        let files =[];

        if (this.fileList && this.fileList.length > 0 ){
          for (var i = 0; i < this.fileList.length; i++) {
            files.push(this.fileList[i].file);
          }
          this.addfiles(files);
        }

        this.fileList = [];
      },
      addfiles:function(files){

        var that = this;
        var imgGroup = this.imgGroup;
        var tempFilePaths = files;
        var new_thumb_img = that.thumb_img;
        for (var i = 0; i < tempFilePaths.length; i++) {
          this.$wx.showLoading({
            title: '上传中'
          })
          if (new_thumb_img.length >= 4) {
            that.thumb_img= new_thumb_img;
            return false;
          } else {
              var filePath = tempFilePaths[i].name;

            var url = this.$app.util.url({
              controller: 'goods.doPageUpload',
              filePath: filePath,
              token: this.$wx.getStorageSync("token"),
              name:'upfile'
            });
            console.log(url,"url");

//            var url = "http://localhost:9528/api/app/index.php?i=3&t=0&v=12.4.0&from=wxapp&c=entry&a=wxapp&do=index"
//              + "&m=lionfish_comshop&sign=60dcd9b5925c119972907bbf22255441"
//              + "&token=" +this.$wx.getStorageSync("token")
//              + "&controller=goods.doPageUpload"
//              + "&filePath=" +filePath
//              + "&name=upfile";

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
                 var new_img = that.image;

                 var new_thumb_img = that.thumb_img;
                 new_img.push(orign_image);
//                 new_img.push(image_thumb);
                 new_thumb_img.push(image_thumb);
                 imgGroup.push(image_thumb);

                 that.thumb_img= new_thumb_img;
                 that.image= new_img;
                 that.imgGroup= imgGroup;

             })
          }
        }

      },
      addImg: function() {
        var d = this, n = this.imgGroup;
//        this.$wx.chooseImage({
//          count: this.imgMax - n.length,
//          success: function(t) {
//            for (var a = t.tempFilePaths, e = d.thumb_img, o = 0; o < a.length; o++) {
//              if (this.$wx.showLoading({
//                  title: "上传中"
//                }), 4 <= e.length) return d.thumb_img= e, !1;
//              this.$wx.uploadFile({
//                url: util.url("entry/wxapp/index", {
//                  m: "lionfish_comshop",
//                  controller: "goods.doPageUpload"
//                }),
//                filePath: a[o],
//                name: "upfile",
//                formData: {
//                  name: a[o]
//                },
//                header: {
//                  "content-type": "multipart/form-data"
//                },
//                success: function(t) {
//                  this.$wx.hideLoading();
//                  var a = JSON.parse(t.data), e = a.image_thumb, o = (a.image_o_full, a.image_o), i = d.data.image, s = d.data.thumb_img;
//                  i.push(o), s.push(e), n.push(e), d.setData({
//                    thumb_img: s,
//                    image: i,
//                    imgGroup: n
//                  });
//                }
//              });
//            }
//          }
//        });

      },
      textinput: function(t) {

        var a = t.detail.value;
        this.pinjia_text= a;
      },
      choseImg: function(t) {
        var a = t.currentTarget.dataset.idx, e = this.imgGroup, o = this.image;
        o.splice(a, 1), e.splice(a, 1);
        this.imgGroup= e,
          this.image= o;

      },
      sub_comment: function() {

        var a = this.order_id, t = this.goods_id, e = this.pinjia_text, o = this.image;
        if ("" == e) return this.$wx.showToast({
          title: "请填写评价内容",
          icon: "success",
          duration: 1e3
        }), !1;
        this.$wx.showLoading({
          title: "评论中"
        });
        var i = this.$wx.getStorageSync("token");
        console.log(o);
        this.$http_post({
            controller: "user.sub_comment",
            token: i,
            order_id: a,
            goods_id: t,
            comment_content: e,
            imgs: o
          }).then(t=> {
            this.$wx.hideLoading();
            if(3 == t.code){
                this.$wx.showToast({
                  title: "未登录",
                  icon: "loading",
                  duration: 1e3
                })
            }else {
              this.$wx.showToast({
                title: "评价成功",
                icon: "success",
                duration: 1e3,
                success: function (t) {

                }
              });
              this.$wx.redirectTo({
                url: "/lionfish_comshop/pages/order/order?id=" + a
              });
            }
        });
      },
      bigImg: function(t) {
        var a = t.currentTarget.dataset.src, e = t.currentTarget.dataset.list;
//        this.$wx.predivImage({
//          current: a,
//          urls: e
//        });
      },
    }
  }
</script>

<style  src="@/lionfish_comshop/pages/order/evaluate.css">
</style>

