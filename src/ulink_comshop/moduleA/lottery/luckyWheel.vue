<template>
  <div class="container">

    <div class="game-bg">
      <div v-for="img in bg_images">
        <img :src="img" />
      </div>
      
    </div>
    <div class="wheel-rule" @click="toLuckyRule">活动规则</div>
    <div class="wheel-rule2" @click="showRecord">中奖记录</div>
    <div class="box">
      <LuckyGrid
      ref="LuckDraw"
      class="my-lucky"
      id="lucky-grid"
      width="300px"
      height="300px"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      :activeStyle="activeStyle"
      :defaultConfig="defaultConfig"
      :defaultStyle="defaultStyle"
      @start="gridStart"
      @end="gridEnd"/>
    </div>
    <div class="mask" v-if="maskShow" bindtouchstart="maskHidden"></div>

    <i-new-auth @authSuccess="authSuccess" @cancel="authModal" :needAuth="needAuth&&showAuthModal" needPosition="false"></i-new-auth>
  </div>
</template>

<script>
  import imgs from './img'
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'lucky-wheel',
    data() {
      return {
        start:false, 
        lottery_id:'',
        maskShow: false,
        lottery:{},
        bg_images:[],
        prizes: [],
        blocks: [
          { padding: '15px', background: '#ffc27a', borderRadius: 28 },
          { padding: '4px', background: '#ff4a4c', borderRadius: 23 },
          { padding: '4px', background: '#ff625b', borderRadius: 20 },
        ],
        buttons: [{
          x: 1, y: 1,
          background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
          shadow: '0 5 1 #e89b4f',
          fonts: [ { text: '剩余次数:1次', fontColor: '#ca620d', top: '75%' ,fontSize:'12px'}],
          imgs: [
            { src: imgs['button.png'], width: '70%', top: '20%' },
          ]
        }],
        activeStyle: {
          
          background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
          shadow: ''
        },
        defaultConfig: {
          gutter: 5,
        },
        defaultStyle: {
          'z-index': '10',
          borderRadius: 15,
          fontColor: '#DF424B',
          fontSize: '14px',
          textAlign: 'center',
          background: '#fff',
          shadow: '0 5 1 #ebf1f4'
        },
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      const t = this.$route.query
      this.onLoad(t)
    },
    methods: {
      onLoad: function (options) {
        let that = this;
        let id = options.id || '';
        this.lottery_id = id;
        util.check_login_new().then((res) => {
          if (res) {
            that.needAuth = false;
          } else {
            that.needAuth = true;
          }
          if (that.authModal()) {
            if (id) {
              this.getPrizesList(id);
            }
          }
        })
      },
      authModal: function () {
        if (this.needAuth) {
          this.showAuthModal = !this.showAuthModal;
          wx.navigateTo({
            url: '/login'
          })
          return false;
        }
        return true;
      },
      authSuccess: function () {
        let that = this;
        let lottery_id = this.lottery_id;
        this.needAuth = false
        that.getPrizesList(lottery_id);
      },
      toLuckyRule: function () {
        wx.navigateTo({
          url: '/ulink_comshop/moduleA/lottery/luckyRule?id='+this.lottery_id
        })
      },
      getPrizesList: function (lottery_id) {
    
        let that = this;
        let token = wx.getStorageSync('token');
        app.util.request({
          url: 'entry/wxapp/index',
          data: {
            controller: 'lottery.get_lottery_goods',
            lottery_id,
            token
          },
          dataType: 'json',
          success: function (res) {
            if (res.code == 1) {
              wx.showModal({
                title: 'error',
                content: res.msg,
                showCancel: false
              })
              wx.switchTab({
                url: '/ulink_comshop/pages/index/index',
              })
            }

            if (res.code != 2) {
              let lottery = res.data;
              let bg_images = lottery.images_list;
              wx.setNavigationBarTitle({
                title: lottery.lottery_name,
                showBack: true
              })
              // 模拟接口异步请求奖品列表
              let buttons = that.buttons;
              buttons[0].fonts[0].text = '剩余次数:'+lottery.residue_degree+'次';
              const prizes = []
              const data = lottery.goods_list;
              let axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]]
              for (let i = 0; i < 8; i++) {
                let item = data[i]
                prizes.push({
                  id: item.id,
                  type: item.type,
                  name: item.prize_name,
                  index: i, x: axis[i][0], y: axis[i][1],
                  fonts: [{ text: item.prize_name, top: '70%' ,fontSize:'12px'}],
                  imgs: [{ src: item.image, width: '53%', top: '8%' }]
                })
              }
              that.prizes = prizes;
              that.buttons = buttons;
              that.lottery = lottery;
              that.bg_images = bg_images;


              if(res.code != 0){
                wx.showModal({
                  title: 'error',
                  content: res.msg,
                  showCancel: false
                })
                wx.switchTab({
                  url: '/ulink_comshop/pages/index/index',
                })
              }

            } else {
              wx.showModal({
                title: 'error',
                content: res.msg,
                showCancel: false
              })
              wx.switchTab({
                url: '/ulink_comshop/pages/index/index',
              })
            }
          }
        })


      },
      gridStart() {
        let that = this;
        let start = that.start; 
        if(!start){ 
          start = true; 
          that.start = start;
          let lottery_id = this.lottery_id;
          let token = wx.getStorageSync('token');
          app.util.request({
            url: 'entry/wxapp/index',
            data: {
              controller: 'lottery.get_lottery_result',
              lottery_id,
              token
            },
            dataType: 'json',
            success: function (res) {

              setTimeout(() => {
                start = false;
                that.start = start;
                
              }, 3000)
            
              if (res.code == 0) {
                let lottery = res.data;

                let buttons = that.buttons;
                buttons[0].fonts[0].text = '剩余次数:'+lottery.residue_degree+'次';
                that.buttons = buttons;

                // 调用play方法开始旋转
                that.$refs.LuckDraw.play()
                // 用定时器模拟请求接口
                setTimeout(() => {
                  that.$refs.LuckDraw.stop(lottery.prize_index)
                }, 3000)
              }else{
                wx.showModal({
                  title: 'error',
                  content: res.msg,
                  showCancel: false
                })
              }
            }
          })
        }
        
      },
      gridEnd(event) {
        let detail = event.detail;
        if(detail.type == 1){
          // 中奖奖品详情
          wx.showModal({
            title: '提示',
            content: '恭喜你获得大奖: ' + event.detail.name,
            success (res) {}
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '很遗憾,您没有中奖，明天继续加油，感谢您的参与！',
            success (res) {}
          })
        }
      },

      showRecord(){
        
        wx.navigateTo({
          url: '/ulink_comshop/moduleA/lottery/recordList?id='+this.lottery_id
        })
      },

      maskHidden () {
        this.maskShow = false;
      },
    }
  }
</script>
<style>
canvas {
  z-index: 2;
}
.container{width: 100%; position: relative;}
.container .game-bg{width: 100%;}
.container .game-bg img{width: 100%;height:20vh; display: block;}
.container  .wheel-rule{
  position: absolute;
    padding: 4px 10px;
    top: 11%;
    left: 3.33%;
    font-size: 10px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 12px;
    text-align: center;
    background-color: rgba(0,0,0,.2);
    z-index: 2;
}
.container  .wheel-rule2{
  position: absolute;
    padding: 4px 10px;
    top: 11%;
    right: 3.33%;
    font-size: 10px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 12px;
    text-align: center;
    background-color: rgba(0,0,0,.2);
    z-index: 2;
}
.my-lucky {
  z-index: 10;
  width:60.2vw; height:60.4vw; position: absolute;margin: 0 auto; top: 45vh;left:0; right:0;box-sizing: border-box; overflow: hidden;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.modalDlg {
  text-align: center;
  position: fixed;
  top: 5%;
  left: 5%;
  height: 85vh;
  width: 85%;
  padding: 16px 8px 16px 8px;
  background-color: white;
  z-index: 9999;
  border-radius: 10px;
  overflow: auto;
}
</style>
