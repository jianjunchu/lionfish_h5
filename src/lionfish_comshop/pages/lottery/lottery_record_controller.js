// import cTitle from "../../components/title";
import { Toast, MessageBox } from "mint-ui";
import { scrollMixin } from "../../utils/mixin";

export default {
  mixins: [scrollMixin], //加载更多
  data() {
    return {
      recordsList: [],
      activity_name: "",
      lotteryId: "",
      amount_word: "",
      love_word: "",
      point_word: "",

      //more
      isLoadMore: true,
      page: 1,
      total_page: 0
    };
  },
  created() {
    this.lotteryId = this.$route.query.lotteryId;
    this.initData();
    this.getData();
  },
  activated() {
    this.lotteryId = this.$route.query.lotteryId;
    this.initData();
    this.getData();
  },
  methods: {
    initData() {
      this.$wx.setNavigationBarTitle({
        title: "中奖记录",
        showLogo:false,
        showMore:false,
        showBack:true
      });
      this.activity_name = "";
      this.recordsList = [];
      this.page = 1;
      this.total_page = 0;
      this.isLoadMore = true;
    },
    getData() {
      // $http
      //   .get(
      //     "plugin.lucky-draw.frontend.draw.getMyRecord",
      //     { lotteryId: this.lotteryId },
      //     " "
      //   )
      //   .then(
      //     response => {
      //       if (response.result === 1) {
      //         this.amount_word = response.data.amount_word;
      //         this.love_word = response.data.love_word;
      //         this.point_word = response.data.point_word;
      //         this.isLoadMore = true;
      //         this.page = 1;
      //         this.activity_name = response.data.activity_name;
      //         this.total_page = response.data.my_record.last_page;
      //         if (!this.total_page) {
      //           this.total_page = 0;
      //         }
      //         this.recordsList = response.data.my_record.data;
      //       } else {
      //         Toast(response.msg);
      //       }
      //     },
      //     response => {
      //       Toast(response);
      //     }
      //   )
      //   .catch(err => {
      //     console.error(err);
      //   });

        // var response = {
        //   "result": 1,
        //   "msg": "ok",
        //   "data": {
        //     "amount_word": "余额",
        //     "point_word": "积分",
        //     "love_word": "爱心值",
        //     "my_record": {
        //       "total": 2,
        //       "per_page": 15,
        //       "current_page": 1,
        //       "last_page": 1,
        //       "next_page_url": null,
        //       "prev_page_url": null,
        //       "from": 1,
        //       "to": 2,
        //       "data": [{
        //         "id": 7,
        //         "uniacid": 2,
        //         "member_id": 1,
        //         "activity_id": 1,
        //         "prize_id": "3",
        //         "point": 0,
        //         "love": 0,
        //         "amount": 0,
        //         "coupon_id": 1,
        //         "created_at": "2020-09-09 18:33:33",
        //         "updated_at": "2020-09-09 18:33:33",
        //         "prize_name": "三等奖",
        //         "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
        //         "has_one_coupon": {
        //           "id": 1,
        //           "name": "优惠1"
        //         }
        //       }, {
        //         "id": 8,
        //         "uniacid": 2,
        //         "member_id": 1,
        //         "activity_id": 1,
        //         "prize_id": "3",
        //         "point": 0,
        //         "love": 0,
        //         "amount": 0,
        //         "coupon_id": 1,
        //         "created_at": "2020-09-09 20:56:55",
        //         "updated_at": "2020-09-09 20:56:55",
        //         "prize_name": "三等奖",
        //         "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
        //         "has_one_coupon": {
        //           "id": 1,
        //           "name": "优惠1"
        //         }
        //       }]
        //     },
        //     "activity_name": "测试大抽奖"
        //   },
        //   "basic_info": {
        //     "popularize_page": {
        //       "wechat": {
        //         "vue_route": [],
        //         "url": ""
        //       },
        //       "mini": {
        //         "vue_route": [],
        //         "url": "",
        //         "mini_url": ""
        //       },
        //       "wap": {
        //         "vue_route": [],
        //         "url": ""
        //       },
        //       "app": {
        //         "vue_route": [],
        //         "url": ""
        //       },
        //       "alipay": {
        //         "vue_route": [],
        //         "url": ""
        //       },
        //       "baidu": null
        //     },
        //     "home": {
        //       "mailInfo": {
        //         "close": "0",
        //         "name": "博若莱之星",
        //         "logo": "https://ulink.sg/static/upload/images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
        //         "signimg": "",
        //         "achievement": "0",
        //         "cservice": "",
        //         "copyright": "",
        //         "copyrightImg": "",
        //         "credit": "余额",
        //         "credit1": "",
        //         "baidu": "",
        //         "agent": false,
        //         "diycode": "",
        //         "is_bind_mobile": 0
        //       },
        //       "memberinfo": {
        //         "uid": 1
        //       },
        //       "system": {
        //         "key": null,
        //         "shop": {
        //           "close": "0",
        //           "name": "博若莱之星",
        //           "logo": "images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
        //           "signimg": "",
        //           "achievement": "0",
        //           "cservice": "",
        //           "copyright": "",
        //           "copyrightImg": "",
        //           "credit": "余额",
        //           "credit1": "",
        //           "baidu": ""
        //         },
        //         "sms": null,
        //         "share": {
        //           "follow_url": "",
        //           "title": "",
        //           "icon": "",
        //           "desc": "",
        //           "url": ""
        //         },
        //         "pay": null,
        //         "logo": "",
        //         "signimg": "",
        //         "mobile_login_code": 0,
        //         "btn_romotion": 1
        //       },
        //       "default": {
        //         "ads": [],
        //         "advs": [],
        //         "brand": [],
        //         "category": [{
        //           "id": 1,
        //           "uniacid": 2,
        //           "name": "红葡萄酒",
        //           "thumb": "",
        //           "parent_id": 0,
        //           "description": "",
        //           "display_order": 0,
        //           "enabled": 1,
        //           "is_home": 1,
        //           "adv_img": "",
        //           "adv_url": "",
        //           "level": 1,
        //           "advimg_pc": "",
        //           "advurl_pc": "",
        //           "created_at": "2020-09-02 18:17:06",
        //           "updated_at": "2020-09-02 18:17:06",
        //           "deleted_at": null,
        //           "plugin_id": 0,
        //           "filter_ids": "1",
        //           "small_adv_url": null
        //         }],
        //         "time_goods": [],
        //         "set": {
        //           "cat_adv_img": ""
        //         },
        //         "goods": {
        //           "total": 0,
        //           "per_page": 16,
        //           "current_page": 1,
        //           "last_page": 0,
        //           "next_page_url": null,
        //           "prev_page_url": null,
        //           "from": null,
        //           "to": null,
        //           "data": []
        //         }
        //       },
        //       "item": {
        //         "data": "",
        //         "topmenu": {
        //           "menus": [],
        //           "params": [],
        //           "isshow": false
        //         },
        //         "menus": [{
        //           "id": 1,
        //           "title": "首页",
        //           "icon": "fa fa-home",
        //           "url": "/addons/yun_shop/?#/home?i=2&mid=1&type=5",
        //           "name": "home",
        //           "subMenus": [],
        //           "textcolor": "#70c10b",
        //           "bgcolor": "#24d7e6",
        //           "bordercolor": "#bfbfbf",
        //           "iconcolor": "#666666"
        //         }, {
        //           "id": "menu_1489731310493",
        //           "title": "分类",
        //           "icon": "fa fa-th-large",
        //           "url": "/addons/yun_shop/?#/category?i=2&mid=1&type=5",
        //           "name": "category",
        //           "subMenus": [],
        //           "textcolor": "#70c10b",
        //           "bgcolor": "#24d7e6",
        //           "iconcolor": "#666666",
        //           "bordercolor": "#bfbfbf"
        //         }, {
        //           "id": "menu_1489731319695",
        //           "classt": "no",
        //           "title": "推广",
        //           "icon": "fa fa-send",
        //           "url": "/addons/yun_shop/?#/member/extension?i=2&mid=1&type=5",
        //           "name": "extension",
        //           "subMenus": [],
        //           "textcolor": "#666666",
        //           "bgcolor": "#837aef",
        //           "iconcolor": "#666666",
        //           "bordercolor": "#bfbfbf"
        //         }, {
        //           "id": "menu_1489735163419",
        //           "title": "购物车",
        //           "icon": "fa fa-cart-plus",
        //           "url": "/addons/yun_shop/?#/cart?i=2&mid=1&type=5",
        //           "name": "cart",
        //           "subMenus": [],
        //           "textcolor": "#70c10b",
        //           "bgcolor": "#24d7e6",
        //           "iconcolor": "#666666",
        //           "bordercolor": "#bfbfbf"
        //         }, {
        //           "id": "menu_1491619644306",
        //           "title": "会员中心",
        //           "icon": "fa fa-user",
        //           "url": "/addons/yun_shop/?#/member?i=2&mid=1&type=5",
        //           "name": "member",
        //           "subMenus": [],
        //           "textcolor": "#70c10b",
        //           "bgcolor": "#24d7e6",
        //           "iconcolor": "#666666",
        //           "bordercolor": "#bfbfbf"
        //         }],
        //         "menustyle": {
        //           "previewbg": "#ef372e",
        //           "height": "49px",
        //           "textcolor": "#666666",
        //           "textcolorhigh": "#ff4949",
        //           "iconcolor": "#666666",
        //           "iconcolorhigh": "#ff4949",
        //           "bgcolor": "#FFF",
        //           "bgcolorhigh": "#FFF",
        //           "bordercolor": "#010101",
        //           "bordercolorhigh": "#bfbfbf",
        //           "showtext": 1,
        //           "showborder": "0",
        //           "showicon": 2,
        //           "textcolor2": "#666666",
        //           "bgcolor2": "#fafafa",
        //           "bordercolor2": "#1856f8",
        //           "showborder2": 1,
        //           "bgalpha": ".5"
        //         },
        //         "janst": "博若莱之星"
        //       }
        //     },
        //     "balance": {
        //       "balance": "余额"
        //     },
        //     "lang": {
        //       "test": [],
        //       "commission": {
        //         "title": "",
        //         "commission": "",
        //         "agent": "",
        //         "level_name": "",
        //         "commission_order": "",
        //         "commission_amount": ""
        //       },
        //       "single_return": {
        //         "title": "",
        //         "single_return": "",
        //         "return_name": "",
        //         "return_queue": "",
        //         "return_log": "",
        //         "return_detail": "",
        //         "return_amount": ""
        //       },
        //       "team_return": {
        //         "title": "",
        //         "team_return": "",
        //         "return_name": "",
        //         "team_level": "",
        //         "return_log": "",
        //         "return_detail": "",
        //         "return_amount": "",
        //         "return_rate": "",
        //         "team_name": "",
        //         "return_time": ""
        //       },
        //       "full_return": {
        //         "title": "",
        //         "full_return": "",
        //         "return_name": "",
        //         "full_return_log": "",
        //         "return_detail": "",
        //         "return_amount": ""
        //       },
        //       "team_dividend": {
        //         "title": "",
        //         "team_dividend": "",
        //         "team_agent_centre": "",
        //         "dividend": "",
        //         "flat_prize": "",
        //         "award_gratitude": "",
        //         "dividend_amount": ""
        //       },
        //       "area_dividend": {
        //         "area_dividend_center": "",
        //         "area_dividend": "",
        //         "dividend_amount": ""
        //       },
        //       "income": {
        //         "name_of_withdrawal": "提现",
        //         "income_name": "收入",
        //         "poundage_name": "手续费",
        //         "special_service_tax": "劳务税"
        //       }
        //     },
        //     "globalParameter": {
        //       "is_open_delivery_station": 0,
        //       "is_open_photo_order": 0,
        //       "delivery_driver_open": 0
        //     }
        //   },
        //   "validate_page": {
        //     "is_bind_mobile": 0,
        //     "invite_page": 0,
        //     "is_invite": 1,
        //     "is_login": 1,
        //     "invite_mobile": 1
        //   }
        // };
        var response = {
          "result": 1,
          "msg": "ok",
          "data": {
            "amount_word": "余额",
            "point_word": "积分",
            "love_word": "爱心值",
            "my_record": {
              "total": 4,
              "per_page": 15,
              "current_page": 1,
              "last_page": 1,
              "next_page_url": null,
              "prev_page_url": null,
              "from": 1,
              "to": 4,
              "data": [
                {
                  "id": 7,
                  "uniacid": 2,
                  "member_id": 1,
                  "activity_id": 1,
                  "prize_id": "3",
                  "point": 0,
                  "love": 0,
                  "amount": 0,
                  "coupon_id": 1,
                  "created_at": "2020-09-09 18:33:33",
                  "updated_at": "2020-09-09 18:33:33",
                  "prize_name": "三等奖",
                  "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
                  "has_one_coupon": {
                    "id": 1,
                    "name": "油卡50元优惠券"
                  }
                },
                {
                  "id": 8,
                  "uniacid": 2,
                  "member_id": 1,
                  "activity_id": 1,
                  "prize_id": "3",
                  "point": 0,
                  "love": 0,
                  "amount": 0,
                  "coupon_id": 1,
                  "created_at": "2020-09-09 20:56:55",
                  "updated_at": "2020-09-09 20:56:55",
                  "prize_name": "三等奖",
                  "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
                  "has_one_coupon": {
                    "id": 1,
                    "name": "油卡50元优惠券"
                  }
                },
                {
                  "id": 14,
                  "uniacid": 2,
                  "member_id": 1,
                  "activity_id": 1,
                  "prize_id": "2",
                  "point": 0,
                  "love": 0,
                  "amount": 0,
                  "coupon_id": 2,
                  "created_at": "2020-09-10 11:56:09",
                  "updated_at": "2020-09-10 11:56:09",
                  "prize_name": "油卡100元优惠券",
                  "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/a1b2e19cf345eea06b0ca3d1c117db0e.jpg",
                  "has_one_coupon": {
                    "id": 2,
                    "name": "油卡100元优惠券"
                  }
                },
                {
                  "id": 17,
                  "uniacid": 2,
                  "member_id": 1,
                  "activity_id": 1,
                  "prize_id": "2",
                  "point": 0,
                  "love": 0,
                  "amount": 0,
                  "coupon_id": 2,
                  "created_at": "2020-09-15 12:05:12",
                  "updated_at": "2020-09-15 12:05:12",
                  "prize_name": "油卡100元",
                  "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/e91e2ea87af9ca6541ac1646492807ca.png",
                  "has_one_coupon": {
                    "id": 2,
                    "name": "油卡100元优惠券"
                  }
                }
              ]
            },
            "activity_name": "抽油卡"
          }
        };
        debugger
      if (response.result === 1) {
        this.amount_word = response.data.amount_word;
        this.love_word = response.data.love_word;
        this.point_word = response.data.point_word;
        this.isLoadMore = true;
        this.page = 1;
        this.activity_name = response.data.activity_name;
        this.total_page = response.data.my_record.last_page;
        if (!this.total_page) {
          this.total_page = 0;
        }
        this.recordsList = response.data.my_record.data;
      } else {
        Toast(response.msg);
      }

    },
    //获取更多数据
    getMoreData() {
      const that = this;
      that.isLoadMore = false; // 防止多次请求分页数据
      if (this.page >= this.total_page) {
        return;
      } else {
        this.page = this.page + 1;
        $http
          .get(
            "plugin.integral.Frontend.Modules.Integral.Controllers.Records",
            {
              page: that.page,
              lotteryId: this.lotteryId
            },
            "加载中"
          )
          .then(
            function(response) {
              that.isLoadMore = true;
              if (response.result === 1) {
                var myData = response.data.my_record.data;
                that.recordsList = that.recordsList.concat(myData); //数组拼接
              } else {
                that.page = that.page - 1;
                that.isLoadMore = false;
              }
            },
            function(response) {
              Toast(response);
            }
          );
      }
    }
  },
  // components: { cTitle }
};
