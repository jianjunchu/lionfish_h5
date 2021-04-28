<template>
  <i-auth @authSuccess="authSuccess" :needAuth="!is_login">
    <div class='score-box'>
      <div class="noDistributionList" :style="'height:'+containerHeight+'px'" v-if="showData===0">
        <img class="noDistributionListImg" src="@/assets/images/noData.png"/>
        <div class="noDistributionListTit">{{$t('score.zanwurenhemingxijilu')}}</div>
      </div>
      <div class="list" v-if="showData===1">
        <i-card>
          <div slot="content">
            <div class="listData" v-for="(item,index) in list" :key="index">
              <div class="list-tit">
                <span class="tit">{{item.remark?item.remark:remark[item.type]}}</span>
                <span class="num red weight">{{item.in_out=='in'?'+':'-'}}{{item.score}}</span>
              </div>
              <div class="list-orderNo" v-if="item.trans_id">{{$t('score.dingdanhao')}}: {{item.trans_id}}</div>
              <div class="list-time i-flex i-flex-spb">
                <span>{{item.addtime}}</span>
                <span>{{$t('score.shengyujifen')}}:{{item.current_yuer}}</span>
              </div>
            </div>
          </div>
        </i-card>
        <i-load-more iClass="loadMore" :loading="!isHideLoadMore" :tip="loadspan" v-if="!isHideLoadMore"></i-load-more>
      </div>
    </div>
  </i-auth>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  var app,wx
  export default {
    mixins: [GlobalMixin],
    name:'supply-scoreDetails',
    data() {
      return {
        is_login: true,
        list: [],
        showData: 1,
        loadspan: '加载中...',
        remark: {
          goodsbuy: '商品购买送积分',
          refundorder: '订单退款增加积分',
          system_add: '系统后台增加积分',
          system_del: '系统后台减少积分',
          orderbuy: '商品购买扣除积分'
        },
        page: 1,
      }
    },
    created: function() {
      wx = this.$wx
      app = this.$app
      var that = this;
      wx.setNavigationBarTitle({
        title: that.$t('score.jifenmingxi'),
        showBack: true
      })
      that.loadspan = that.$t('score.jiazaizhong');
      that.goodsbuy = that.$t('score.goodsbuy');
      that.refundorder = that.$t('score.refundorder');
      that.system_add = that.$t('score.system_add');
      that.system_del = that.$t('score.system_del');
      that.orderbuy = that.$t('score.orderbuy');
      that.onLoad();
    },
    methods: {
      onLoad: function (options) {
        var that = this;
        util.check_login_new().then((res) => {
          if (res) {
            that.is_login = true;
          } else {
            that.is_login = false;
          }
        })
        this.getData();
      },

      getData: function () {
        var token = wx.getStorageSync('token');
        let that = this;
        wx.showLoading();
        this.isHideLoadMore = false;
        app.util.request({
          'url': 'entry/wxapp/index',
          'data': {
            controller: 'user.get_user_integral_flow',
            token: token,
            page: that.page
          },
          dataType: 'json',
          success: function (res) {
            wx.hideLoading();
            if (res.code == 0) {
              var list = that.list;
              list = list.concat(res.data);
              that.list = list;
              that.isHideLoadMore = true;
            } else if (res.code == 1) {
              if (that.list.length == 0 && that.page == 1) that.showData = 0;
              that.isHideLoadMore = true;
              that.no_data = 1;
              return false;
            } else if (res.code == 2) {
              that.is_login = false;
            }
          },
          fail: (error) => {
            console.log(error)
            wx.showLoading();
          }
        })
      },
      /**
      * 授权成功回调
      */
      authSuccess: function () {
        wx.redirectTo({
          url: '/ulink_comshop/pages/user/scoreDetails',
        })
      },  
      onReachBottom: function () {
        if (this.no_data == 1) return false;
        this.page += 1;
        this.getData();
        this.isHideLoadMore = false;
      }
    }
  }
</script>

<style scoped>
.score-box {
  padding-top: 3vw;
}

.noDistributionList {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20vw;
}

.noDistributionList .noDistributionListImg {
  width: 21.8vw;
  height: 21.8vw;
  margin-bottom: 3.2vw;
}

.noDistributionList .noDistributionListTit {
  font-size: 3vw;
  color: #666;
  line-height: 3vw;
}

.list {
  padding: 0 2vw;
}

.list .listData {
  padding: 3vw;
  border-bottom: 0.01vw solid #eee;
}

.list .listData:last-child {
  border: none;
}

.list .listData .list-tit {
  line-height: 2.8vw;
  margin-bottom: 2.4vw;
  display: flex;
  justify-content: space-between;
}

.list .listData .list-tit .tit {
  font-size: 3vw;
  color: #444;
}

.list .listData .list-tit .num {
  font-size: 3.2vw;
  color: #ff5344;
  font-weight: bold;
}

.list .listData .list-tit .num.yue {
  color: #666;
  font-weight: normal;
  font-size: 3vw;
}

.list .listData .list-tit .num2 {
  color: #999;
}

.list .listData .list-orderNo {
  font-size: 2.6vw;
  color: #444;
  margin-bottom: 1.6vw;
}

.list .listData .list-time {
  font-size: 2.6vw;
  color: #aaa;
  line-height: 2.2vw;
}

</style>
