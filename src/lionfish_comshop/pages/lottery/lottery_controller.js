import { Toast, MessageBox } from "mint-ui";
import noSelect from "@/assets/images/item_bg.png";
import isSelect from "@/assets/images/select.png";
import prizeBtn1 from "@/assets/images/01.png";
import prizeBtn2 from "@/assets/images/02.png";
import prizeBtn3 from "@/assets/images/03.png";
import prizeBtn4 from "@/assets/images/04.png";
import util from '../../utils'
import auth from '../../utils/auth'
var app,wx;
export default {
  data() {
    return {
      swiperName: {
        // 获奖名单
        loop: true, // 当获奖人数大于等于5的时候滚动，否则不滚动
        direction: "vertical",
        slidesPerView: 5,
        freeMode: true,
        freeModeMomentum: true,
        freeModeMomentumVelocityRatio: 1,
        autoplay: 1000
      },
      prizeIndex: 0,
      arrNum: [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4], // 定义转动的顺序
      clickFlage: true, // 点击事件，防止重复点击

      prizeInfoShow: false, // 显示中奖信息的遮罩层
      noPrizeShow: false, // 没中奖
      havePrizeShow: false, // 中奖了
      haveLottery: false, // 已经抽过奖了
      timer1: "",
      timer2: "",
      s1: "",
      s2: -1,
      lotteryId: "", // 抽奖活动的id
      activityModel: {}, // 活动说明
      hasRecord: false, // 是否显示获奖情况
      remainingTimes: 0, // 剩余抽奖次数
      prizeList: [], // 奖项列表
      prizeLevel: "", // 中奖等级
      prizeName: "", // 奖品名称
      prizeUrl: "", // 奖品图片
      prizers: [], // 获奖名单
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      startStatus: 1, // 活动开始的状态

      credit1: 0,
      empty_prize_prompt: "", //未中奖提示
      amount_word: "",
      love_word: "",
      point_word: "",
      shop_logo: "",
      toolbar: false,
      needAuth: false,

    };
  },
  created() {

    // this.lotteryId = this.fun.getKey("lotteryId");
    app = this.$getApp()
    wx = this.$wx;

    var query = this.$route.query;
    this.lotteryId = query.lotteryId;
    if (!this.authModal()) return
    this.initData();
    this.getData();
  },
  mounted() {
  },
  activated() {
    // this.lotteryId = this.fun.getKey("lotteryId");
    var query = this.$route.query;
    this.lotteryId = query.lotteryId;
    this.initShare();
  },
  methods: {
    showToolbar() {
      this.toolbar = !this.toolbar;
    },
    initData() {
      this.$wx.setNavigationBarTitle({
        title: "幸运大抽奖",
        showLogo:false,
        showMore:false,
        showBack:true
      });
    },
    getData() {
      // $http
      //   .get(
      //     "plugin.lucky-draw.frontend.draw.index",
      //     { lotteryId: this.lotteryId },
      //     " "
      //   )
      //   .then(
      //     response => {
      //
      //       if (response.result === 1) {
      //         this.shop_logo = response.data.shop_logo;
      //         this.amount_word = response.data.amount_word;
      //         this.love_word = response.data.love_word;
      //         this.point_word = response.data.point_word;
      //         this.credit1 = response.data.point.credit1;
      //         this.activityModel = response.data.activityModel;
      //         this.remainingTimes = response.data.surplus_time;
      //         response.data.result_arr.forEach(item => {
      //           this.$set(item, "bgSrc", noSelect);
      //         });
      //         response.data.result_arr.splice(5, 0, " ");
      //         response.data.result_arr.splice(6, 0, " ");
      //         response.data.result_arr.splice(9, 0, " ");
      //         response.data.result_arr.splice(10, 0, " ");
      //         this.prizeList = response.data.result_arr;
      //         this.prizers = response.data.list;
      //         let temp = this.prizeList[4];
      //         this.prizeList[4] = this.prizeList[7];
      //         this.prizeList[7] = temp;
      //         temp = this.prizeList[12];
      //         this.prizeList[12] = this.prizeList[13];
      //         this.prizeList[13] = temp;
      //         temp = this.prizeList[14];
      //         this.prizeList[14] = this.prizeList[15];
      //         this.prizeList[15] = temp;
      //
      //         this.statusFun(
      //           Date.parse(new Date()) / 1000,
      //           this.activityModel.countdown_time[0],
      //           this.activityModel.countdown_time[1]
      //         ); // 获取状态，开始，未开始，结束
      //         if (this.prizers && this.prizers.length > 5) {
      //           this.prizerListScroll();
      //         }
      //         this.prizeZhuan();
      //       } else {
      //         if(response.msg != "请登录") {
      //           Toast(response.msg);
      //           this.$router.go(-1);
      //         }
      //       }
      //     },
      //     response => {
      //       Toast(response);
      //     }
      //   )
      //   .catch(err => {
      //     console.error(err);
      //   });

      // var response={
      //   "result": 1,
      //     "msg": "成功！",
      //     "data": {
      //     "amount_word": "余额",
      //       "point_word": "积分",
      //       "love_word": "爱心值",
      //       "shop_logo": "https://ulink.sg/static/upload/images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
      //       "point": {
      //       "uid": 1,
      //         "credit1": "1.00",
      //         "avatar_image": "",
      //         "username": null
      //     },
      //     "list": [{
      //       "id": 7,
      //       "uniacid": 2,
      //       "member_id": 1,
      //       "activity_id": 1,
      //       "prize_id": "3",
      //       "point": 0,
      //       "love": 0,
      //       "amount": 0,
      //       "coupon_id": 1,
      //       "created_at": "2020-09-09 18:33:33",
      //       "updated_at": "2020-09-09 18:33:33",
      //       "prize_name": "三等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
      //       "member": {
      //         "uid": 1,
      //         "mobile": "18501178289",
      //         "nickname": "18501178289",
      //         "avatar_image": "",
      //         "username": "18501178289"
      //       },
      //       "has_one_coupon": {
      //         "id": 1,
      //         "name": "优惠1"
      //       }
      //     }, {
      //       "id": 6,
      //       "uniacid": 2,
      //       "member_id": 10,
      //       "activity_id": 1,
      //       "prize_id": "1",
      //       "point": 1,
      //       "love": 0,
      //       "amount": 0,
      //       "coupon_id": 0,
      //       "created_at": "2020-09-09 10:29:10",
      //       "updated_at": "2020-09-09 10:29:10",
      //       "prize_name": "一等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/b5c5a9dcd62dc85c501a8c4810ecf62d.png",
      //       "member": {
      //         "uid": 10,
      //         "mobile": "",
      //         "nickname": "初建军",
      //         "avatar_image": "",
      //         "username": "初建军"
      //       },
      //       "has_one_coupon": null
      //     }, {
      //       "id": 5,
      //       "uniacid": 2,
      //       "member_id": 10,
      //       "activity_id": 1,
      //       "prize_id": "2",
      //       "point": 0,
      //       "love": 0,
      //       "amount": 1,
      //       "coupon_id": 0,
      //       "created_at": "2020-09-09 10:28:56",
      //       "updated_at": "2020-09-09 10:28:56",
      //       "prize_name": "二等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
      //       "member": {
      //         "uid": 10,
      //         "mobile": "",
      //         "nickname": "初建军",
      //         "avatar_image": "",
      //         "username": "初建军"
      //       },
      //       "has_one_coupon": null
      //     }, {
      //       "id": 4,
      //       "uniacid": 2,
      //       "member_id": 10,
      //       "activity_id": 1,
      //       "prize_id": "3",
      //       "point": 0,
      //       "love": 0,
      //       "amount": 0,
      //       "coupon_id": 1,
      //       "created_at": "2020-09-09 10:28:25",
      //       "updated_at": "2020-09-09 10:28:25",
      //       "prize_name": "三等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
      //       "member": {
      //         "uid": 10,
      //         "mobile": "",
      //         "nickname": "初建军",
      //         "avatar_image": "",
      //         "username": "初建军"
      //       },
      //       "has_one_coupon": {
      //         "id": 1,
      //         "name": "优惠1"
      //       }
      //     }, {
      //       "id": 3,
      //       "uniacid": 2,
      //       "member_id": 13,
      //       "activity_id": 1,
      //       "prize_id": "2",
      //       "point": 0,
      //       "love": 0,
      //       "amount": 1,
      //       "coupon_id": 0,
      //       "created_at": "2020-09-09 10:16:06",
      //       "updated_at": "2020-09-09 10:16:06",
      //       "prize_name": "二等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
      //       "member": {
      //         "uid": 13,
      //         "mobile": "",
      //         "nickname": "李龙云",
      //         "avatar_image": "",
      //         "username": "李龙云"
      //       },
      //       "has_one_coupon": null
      //     }, {
      //       "id": 2,
      //       "uniacid": 2,
      //       "member_id": 13,
      //       "activity_id": 1,
      //       "prize_id": "3",
      //       "point": 0,
      //       "love": 0,
      //       "amount": 0,
      //       "coupon_id": 1,
      //       "created_at": "2020-09-09 10:15:52",
      //       "updated_at": "2020-09-09 10:15:52",
      //       "prize_name": "三等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
      //       "member": {
      //         "uid": 13,
      //         "mobile": "",
      //         "nickname": "李龙云",
      //         "avatar_image": "",
      //         "username": "李龙云"
      //       },
      //       "has_one_coupon": {
      //         "id": 1,
      //         "name": "优惠1"
      //       }
      //     }, {
      //       "id": 1,
      //       "uniacid": 2,
      //       "member_id": 12,
      //       "activity_id": 1,
      //       "prize_id": "3",
      //       "point": 0,
      //       "love": 0,
      //       "amount": 0,
      //       "coupon_id": 1,
      //       "created_at": "2020-09-09 10:05:22",
      //       "updated_at": "2020-09-09 10:05:22",
      //       "prize_name": "三等奖",
      //       "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
      //       "member": {
      //         "uid": 12,
      //         "mobile": "",
      //         "nickname": "初建朋",
      //         "avatar_image": "",
      //         "username": "初建朋"
      //       },
      //       "has_one_coupon": {
      //         "id": 1,
      //         "name": "优惠1"
      //       }
      //     }],
      //       "activityModel": {
      //       "id": 1,
      //         "uniacid": 2,
      //         "name": "测试大抽奖",
      //         "countdown_time": [1599614504, 1604160000],
      //         "role_type": 0,
      //         "member_type": 0,
      //         "level_id": "",
      //         "draw_type": 0,
      //         "use_point": "",
      //         "use_love": "",
      //         "partake_times": 0,
      //         "days_times": "5",
      //         "days_share_times": "1",
      //         "somebody_times": "",
      //         "somebody_share_times": "",
      //         "prize_id": [1, 1, 2, 2, 3, 3],
      //         "empty_prize_name": "谢谢惠顾",
      //         "empty_prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //         "empty_prize_prompt": "谢谢惠顾",
      //         "jump_type": 0,
      //         "jump_link": "",
      //         "partake_point": "1",
      //         "partake_love": "",
      //         "partake_amount": "0",
      //         "partake_coupon_id": "",
      //         "limit": 0,
      //         "background": "https://ulink.sg/static/upload/images/0/2020/09/28a3294ec4e655ad426781a55b345ab1.jpg",
      //         "background_colour": "#F13939",
      //         "is_logo": 0,
      //         "is_roster": 1,
      //         "content": "欢迎参与",
      //         "created_at": "2020-09-09 09:28:36",
      //         "updated_at": "2020-09-09 09:28:36",
      //         "goods_id": null
      //     },
      //     "result_arr": [{
      //       "id": 7,
      //       "prize": "谢谢惠顾",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //       "jump_type": 0,
      //       "jump_link": "",
      //       "chance": 10.833333333333334,
      //       "item": 0
      //     }, {
      //       "id": 1,
      //       "prize": "一等奖",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/b5c5a9dcd62dc85c501a8c4810ecf62d.png",
      //       "chance": 2.5,
      //       "coupon": null,
      //       "point": "1.00",
      //       "love": "0.00",
      //       "amount": "0.00",
      //       "prize_num": 99,
      //       "item": 1
      //     }, {
      //       "id": 8,
      //       "prize": "谢谢惠顾",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //       "jump_type": 0,
      //       "jump_link": "",
      //       "chance": 10.833333333333334,
      //       "item": 2
      //     }, {
      //       "id": 2,
      //       "prize": "二等奖",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
      //       "chance": 5,
      //       "coupon": null,
      //       "point": "0.00",
      //       "love": "0.00",
      //       "amount": "1.00",
      //       "prize_num": 98,
      //       "item": 3
      //     }, {
      //       "id": 9,
      //       "prize": "谢谢惠顾",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //       "jump_type": 0,
      //       "jump_link": "",
      //       "chance": 10.833333333333334,
      //       "item": 4
      //     }, {
      //       "id": 3,
      //       "prize": "三等奖",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
      //       "chance": 10,
      //       "coupon": "优惠1",
      //       "point": "0.00",
      //       "love": "0.00",
      //       "amount": "0.00",
      //       "prize_num": 96,
      //       "item": 5
      //     }, {
      //       "id": 10,
      //       "prize": "谢谢惠顾",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //       "jump_type": 0,
      //       "jump_link": "",
      //       "chance": 10.833333333333334,
      //       "item": 6
      //     }, {
      //       "id": 1,
      //       "prize": "一等奖",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/b5c5a9dcd62dc85c501a8c4810ecf62d.png",
      //       "chance": 2.5,
      //       "coupon": null,
      //       "point": "1.00",
      //       "love": "0.00",
      //       "amount": "0.00",
      //       "prize_num": 99,
      //       "item": 7
      //     }, {
      //       "id": 11,
      //       "prize": "谢谢惠顾",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //       "jump_type": 0,
      //       "jump_link": "",
      //       "chance": 10.833333333333334,
      //       "item": 8
      //     }, {
      //       "id": 2,
      //       "prize": "二等奖",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
      //       "chance": 5,
      //       "coupon": null,
      //       "point": "0.00",
      //       "love": "0.00",
      //       "amount": "1.00",
      //       "prize_num": 98,
      //       "item": 9
      //     }, {
      //       "id": 12,
      //       "prize": "谢谢惠顾",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
      //       "jump_type": 0,
      //       "jump_link": "",
      //       "chance": 10.833333333333334,
      //       "item": 10
      //     }, {
      //       "id": 3,
      //       "prize": "三等奖",
      //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
      //       "chance": 10,
      //       "coupon": "优惠1",
      //       "point": "0.00",
      //       "love": "0.00",
      //       "amount": "0.00",
      //       "prize_num": 96,
      //       "item": 11
      //     }],
      //       "surplus_time": 4
      //   },
      //   "basic_info": {
      //     "popularize_page": {
      //       "wechat": {
      //         "vue_route": [],
      //           "url": ""
      //       },
      //       "mini": {
      //         "vue_route": [],
      //           "url": "",
      //           "mini_url": ""
      //       },
      //       "wap": {
      //         "vue_route": [],
      //           "url": ""
      //       },
      //       "app": {
      //         "vue_route": [],
      //           "url": ""
      //       },
      //       "alipay": {
      //         "vue_route": [],
      //           "url": ""
      //       },
      //       "baidu": null
      //     },
      //     "home": {
      //       "mailInfo": {
      //         "close": "0",
      //           "name": "博若莱之星",
      //           "logo": "https://ulink.sg/static/upload/images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
      //           "signimg": "",
      //           "achievement": "0",
      //           "cservice": "",
      //           "copyright": "",
      //           "copyrightImg": "",
      //           "credit": "余额",
      //           "credit1": "",
      //           "baidu": "",
      //           "agent": false,
      //           "diycode": "",
      //           "is_bind_mobile": 0
      //       },
      //       "memberinfo": {
      //         "uid": 1
      //       },
      //       "system": {
      //         "key": null,
      //           "shop": {
      //           "close": "0",
      //             "name": "博若莱之星",
      //             "logo": "images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
      //             "signimg": "",
      //             "achievement": "0",
      //             "cservice": "",
      //             "copyright": "",
      //             "copyrightImg": "",
      //             "credit": "余额",
      //             "credit1": "",
      //             "baidu": ""
      //         },
      //         "sms": null,
      //           "share": {
      //           "follow_url": "",
      //             "title": "",
      //             "icon": "",
      //             "desc": "",
      //             "url": ""
      //         },
      //         "pay": null,
      //           "logo": "",
      //           "signimg": "",
      //           "mobile_login_code": 0,
      //           "btn_romotion": 1
      //       },
      //       "default": {
      //         "ads": [],
      //           "advs": [],
      //           "brand": [],
      //           "category": [{
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
      //           "time_goods": [],
      //           "set": {
      //           "cat_adv_img": ""
      //         },
      //         "goods": {
      //           "total": 0,
      //             "per_page": 16,
      //             "current_page": 1,
      //             "last_page": 0,
      //             "next_page_url": null,
      //             "prev_page_url": null,
      //             "from": null,
      //             "to": null,
      //             "data": []
      //         }
      //       },
      //       "item": {
      //         "data": "",
      //           "topmenu": {
      //           "menus": [],
      //             "params": [],
      //             "isshow": false
      //         },
      //         "menus": [{
      //           "id": 1,
      //           "title": "首页",
      //           "icon": "fa fa-home",
      //           "url": "/addons/yun_shop/?#/home?i=2&mid=&type=5",
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
      //           "url": "/addons/yun_shop/?#/category?i=2&mid=&type=5",
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
      //           "url": "/addons/yun_shop/?#/member/extension?i=2&mid=&type=5",
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
      //           "url": "/addons/yun_shop/?#/cart?i=2&mid=&type=5",
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
      //           "url": "/addons/yun_shop/?#/member?i=2&mid=&type=5",
      //           "name": "member",
      //           "subMenus": [],
      //           "textcolor": "#70c10b",
      //           "bgcolor": "#24d7e6",
      //           "iconcolor": "#666666",
      //           "bordercolor": "#bfbfbf"
      //         }],
      //           "menustyle": {
      //           "previewbg": "#ef372e",
      //             "height": "49px",
      //             "textcolor": "#666666",
      //             "textcolorhigh": "#ff4949",
      //             "iconcolor": "#666666",
      //             "iconcolorhigh": "#ff4949",
      //             "bgcolor": "#FFF",
      //             "bgcolorhigh": "#FFF",
      //             "bordercolor": "#010101",
      //             "bordercolorhigh": "#bfbfbf",
      //             "showtext": 1,
      //             "showborder": "0",
      //             "showicon": 2,
      //             "textcolor2": "#666666",
      //             "bgcolor2": "#fafafa",
      //             "bordercolor2": "#1856f8",
      //             "showborder2": 1,
      //             "bgalpha": ".5"
      //         },
      //         "janst": "博若莱之星"
      //       }
      //     },
      //     "balance": {
      //       "balance": "余额"
      //     },
      //     "lang": {
      //       "test": [],
      //         "commission": {
      //         "title": "",
      //           "commission": "",
      //           "agent": "",
      //           "level_name": "",
      //           "commission_order": "",
      //           "commission_amount": ""
      //       },
      //       "single_return": {
      //         "title": "",
      //           "single_return": "",
      //           "return_name": "",
      //           "return_queue": "",
      //           "return_log": "",
      //           "return_detail": "",
      //           "return_amount": ""
      //       },
      //       "team_return": {
      //         "title": "",
      //           "team_return": "",
      //           "return_name": "",
      //           "team_level": "",
      //           "return_log": "",
      //           "return_detail": "",
      //           "return_amount": "",
      //           "return_rate": "",
      //           "team_name": "",
      //           "return_time": ""
      //       },
      //       "full_return": {
      //         "title": "",
      //           "full_return": "",
      //           "return_name": "",
      //           "full_return_log": "",
      //           "return_detail": "",
      //           "return_amount": ""
      //       },
      //       "team_dividend": {
      //         "title": "",
      //           "team_dividend": "",
      //           "team_agent_centre": "",
      //           "dividend": "",
      //           "flat_prize": "",
      //           "award_gratitude": "",
      //           "dividend_amount": ""
      //       },
      //       "area_dividend": {
      //         "area_dividend_center": "",
      //           "area_dividend": "",
      //           "dividend_amount": ""
      //       },
      //       "income": {
      //         "name_of_withdrawal": "提现",
      //           "income_name": "收入",
      //           "poundage_name": "手续费",
      //           "special_service_tax": "劳务税"
      //       }
      //     },
      //     "globalParameter": {
      //       "is_open_delivery_station": 0,
      //         "is_open_photo_order": 0,
      //         "delivery_driver_open": 0
      //     }
      //   },
      //   "validate_page": {
      //     "is_bind_mobile": 0,
      //       "invite_page": 0,
      //       "is_invite": 1,
      //       "is_login": 1,
      //       "invite_mobile": 1
      //   }
      // };
      var response = {
        "result": 1,
        "msg": "成功！",
        "data": {
          "amount_word": "余额",
          "point_word": "积分",
          "love_word": "爱心值",
          "shop_logo": "https://ulink.sg/static/upload/images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
          "point": {
            "uid": 1,
            "credit1": "4.00",
            "avatar_image": "",
            "username": null
          },
          "list": [{
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
            "member": {
              "uid": 1,
              "mobile": "18501178289",
              "nickname": "18501178289",
              "avatar_image": "",
              "username": "18501178289"
            },
            "has_one_coupon": {
              "id": 2,
              "name": "油卡100元优惠券"
            }
          }, {
            "id": 16,
            "uniacid": 2,
            "member_id": 12,
            "activity_id": 1,
            "prize_id": "1",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 1,
            "created_at": "2020-09-10 12:57:43",
            "updated_at": "2020-09-10 12:57:43",
            "prize_name": "油卡50元优惠券",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/2492932c85eeb9b577872a6eb96b6bdf.jpg",
            "member": {
              "uid": 12,
              "mobile": "",
              "nickname": "初建朋",
              "avatar_image": "",
              "username": "初建朋"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
            "id": 15,
            "uniacid": 2,
            "member_id": 12,
            "activity_id": 1,
            "prize_id": "2",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 2,
            "created_at": "2020-09-10 12:50:15",
            "updated_at": "2020-09-10 12:50:15",
            "prize_name": "油卡100元优惠券",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/a1b2e19cf345eea06b0ca3d1c117db0e.jpg",
            "member": {
              "uid": 12,
              "mobile": "",
              "nickname": "初建朋",
              "avatar_image": "",
              "username": "初建朋"
            },
            "has_one_coupon": {
              "id": 2,
              "name": "油卡100元优惠券"
            }
          }, {
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
            "member": {
              "uid": 1,
              "mobile": "18501178289",
              "nickname": "18501178289",
              "avatar_image": "",
              "username": "18501178289"
            },
            "has_one_coupon": {
              "id": 2,
              "name": "油卡100元优惠券"
            }
          }, {
            "id": 13,
            "uniacid": 2,
            "member_id": 11,
            "activity_id": 1,
            "prize_id": "2",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 1,
            "created_at": "2020-09-10 11:16:06",
            "updated_at": "2020-09-10 11:16:06",
            "prize_name": "优惠码",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/2628da7554536efdec3b11cbead1ec5b.png",
            "member": {
              "uid": 11,
              "mobile": "",
              "nickname": "索梦阳վᴗ ի",
              "avatar_image": "",
              "username": "索梦阳վᴗ ի"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
            "id": 12,
            "uniacid": 2,
            "member_id": 11,
            "activity_id": 1,
            "prize_id": "2",
            "point": 0,
            "love": 0,
            "amount": 1,
            "coupon_id": 0,
            "created_at": "2020-09-10 09:51:12",
            "updated_at": "2020-09-10 09:51:12",
            "prize_name": "二等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
            "member": {
              "uid": 11,
              "mobile": "",
              "nickname": "索梦阳վᴗ ի",
              "avatar_image": "",
              "username": "索梦阳վᴗ ի"
            },
            "has_one_coupon": null
          }, {
            "id": 11,
            "uniacid": 2,
            "member_id": 11,
            "activity_id": 1,
            "prize_id": "2",
            "point": 0,
            "love": 0,
            "amount": 1,
            "coupon_id": 0,
            "created_at": "2020-09-10 09:50:13",
            "updated_at": "2020-09-10 09:50:13",
            "prize_name": "二等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
            "member": {
              "uid": 11,
              "mobile": "",
              "nickname": "索梦阳վᴗ ի",
              "avatar_image": "",
              "username": "索梦阳վᴗ ի"
            },
            "has_one_coupon": null
          }, {
            "id": 10,
            "uniacid": 2,
            "member_id": 12,
            "activity_id": 1,
            "prize_id": "1",
            "point": 1,
            "love": 0,
            "amount": 0,
            "coupon_id": 0,
            "created_at": "2020-09-10 09:42:13",
            "updated_at": "2020-09-10 09:42:13",
            "prize_name": "一等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/b5c5a9dcd62dc85c501a8c4810ecf62d.png",
            "member": {
              "uid": 12,
              "mobile": "",
              "nickname": "初建朋",
              "avatar_image": "",
              "username": "初建朋"
            },
            "has_one_coupon": null
          }, {
            "id": 9,
            "uniacid": 2,
            "member_id": 12,
            "activity_id": 1,
            "prize_id": "3",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 1,
            "created_at": "2020-09-10 09:41:39",
            "updated_at": "2020-09-10 09:41:39",
            "prize_name": "三等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
            "member": {
              "uid": 12,
              "mobile": "",
              "nickname": "初建朋",
              "avatar_image": "",
              "username": "初建朋"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
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
            "member": {
              "uid": 1,
              "mobile": "18501178289",
              "nickname": "18501178289",
              "avatar_image": "",
              "username": "18501178289"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
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
            "member": {
              "uid": 1,
              "mobile": "18501178289",
              "nickname": "18501178289",
              "avatar_image": "",
              "username": "18501178289"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
            "id": 6,
            "uniacid": 2,
            "member_id": 10,
            "activity_id": 1,
            "prize_id": "1",
            "point": 1,
            "love": 0,
            "amount": 0,
            "coupon_id": 0,
            "created_at": "2020-09-09 10:29:10",
            "updated_at": "2020-09-09 10:29:10",
            "prize_name": "一等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/b5c5a9dcd62dc85c501a8c4810ecf62d.png",
            "member": {
              "uid": 10,
              "mobile": "",
              "nickname": "初建军",
              "avatar_image": "",
              "username": "初建军"
            },
            "has_one_coupon": null
          }, {
            "id": 5,
            "uniacid": 2,
            "member_id": 10,
            "activity_id": 1,
            "prize_id": "2",
            "point": 0,
            "love": 0,
            "amount": 1,
            "coupon_id": 0,
            "created_at": "2020-09-09 10:28:56",
            "updated_at": "2020-09-09 10:28:56",
            "prize_name": "二等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
            "member": {
              "uid": 10,
              "mobile": "",
              "nickname": "初建军",
              "avatar_image": "",
              "username": "初建军"
            },
            "has_one_coupon": null
          }, {
            "id": 4,
            "uniacid": 2,
            "member_id": 10,
            "activity_id": 1,
            "prize_id": "3",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 1,
            "created_at": "2020-09-09 10:28:25",
            "updated_at": "2020-09-09 10:28:25",
            "prize_name": "三等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
            "member": {
              "uid": 10,
              "mobile": "",
              "nickname": "初建军",
              "avatar_image": "",
              "username": "初建军"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
            "id": 3,
            "uniacid": 2,
            "member_id": 13,
            "activity_id": 1,
            "prize_id": "2",
            "point": 0,
            "love": 0,
            "amount": 1,
            "coupon_id": 0,
            "created_at": "2020-09-09 10:16:06",
            "updated_at": "2020-09-09 10:16:06",
            "prize_name": "二等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/fa7255596e5a7fae85e9474db0eaebdb.png",
            "member": {
              "uid": 13,
              "mobile": "",
              "nickname": "李龙云",
              "avatar_image": "",
              "username": "李龙云"
            },
            "has_one_coupon": null
          }, {
            "id": 2,
            "uniacid": 2,
            "member_id": 13,
            "activity_id": 1,
            "prize_id": "3",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 1,
            "created_at": "2020-09-09 10:15:52",
            "updated_at": "2020-09-09 10:15:52",
            "prize_name": "三等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
            "member": {
              "uid": 13,
              "mobile": "",
              "nickname": "李龙云",
              "avatar_image": "",
              "username": "李龙云"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }, {
            "id": 1,
            "uniacid": 2,
            "member_id": 12,
            "activity_id": 1,
            "prize_id": "3",
            "point": 0,
            "love": 0,
            "amount": 0,
            "coupon_id": 1,
            "created_at": "2020-09-09 10:05:22",
            "updated_at": "2020-09-09 10:05:22",
            "prize_name": "三等奖",
            "prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
            "member": {
              "uid": 12,
              "mobile": "",
              "nickname": "初建朋",
              "avatar_image": "",
              "username": "初建朋"
            },
            "has_one_coupon": {
              "id": 1,
              "name": "油卡50元优惠券"
            }
          }],
          "activityModel": {
            "id": 1,
            "uniacid": 2,
            "name": "抽油卡",
            "countdown_time": [1599614504, 1604160000],
            "role_type": 0,
            "member_type": 0,
            "level_id": "0",
            "draw_type": 0,
            "use_point": "",
            "use_love": "",
            "partake_times": 0,
            "days_times": "20",
            "days_share_times": "1",
            "somebody_times": "",
            "somebody_share_times": "",
            "prize_id": [1, 1, 2, 2, 3, 3],
            "empty_prize_name": "谢谢惠顾",
            "empty_prize_thumb": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "empty_prize_prompt": "谢谢惠顾",
            "jump_type": 0,
            "jump_link": "",
            "partake_point": "0",
            "partake_love": "",
            "partake_amount": "0",
            "partake_coupon_id": "",
            "limit": 1,
            "background": "https://ulink.sg/static/upload/images/0/2020/09/28a3294ec4e655ad426781a55b345ab1.jpg",
            "background_colour": "#F13939",
            "is_logo": 0,
            "is_roster": 1,
            "content": "活动说明\n*抽中优惠券的消费者可点击右侧\"...\"按钮，到商城中使用优惠券购买加油卡。\n*微信扫描加油卡上二维码，进入公众号，点击优惠加油，登录后，输入卡背面上的刮码数字，面值相应金额会进入到帐户中。\n*加油前微信扫描卡上二维码，点击优惠加油，查看附近的签约加油站。\n*加油后选则油枪号，输入金额完成优惠抵扣支付，每次优惠金额不等。\n*全国目前已有中石化、中石油1万多家签约加油站，加油最高折扣7折起，在线支付，无需下车。",
            "created_at": "2020-09-09 09:28:36",
            "updated_at": "2020-09-16 16:02:19",
            "goods_id": 0
          },
          "result_arr": [{
            "id": 7,
            "prize": "谢谢惠顾",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "jump_type": 0,
            "jump_link": "",
            "chance": 3.3333333333333335,
            "item": 0
          }, {
            "id": 1,
            "prize": "油卡50元",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/b5fc8fcf24fd89864bf4e66156b56e15.png",
            "chance": 25,
            "coupon": "油卡50元优惠券",
            "point": "0.00",
            "love": "0.00",
            "amount": "0.00",
            "prize_num": 100,
            "item": 1
          }, {
            "id": 8,
            "prize": "谢谢惠顾",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "jump_type": 0,
            "jump_link": "",
            "chance": 3.3333333333333335,
            "item": 2
          }, {
            "id": 2,
            "prize": "油卡100元",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/e91e2ea87af9ca6541ac1646492807ca.png",
            "chance": 10,
            "coupon": "油卡100元优惠券",
            "point": "0.00",
            "love": "0.00",
            "amount": "0.00",
            "prize_num": 49,
            "item": 3
          }, {
            "id": 9,
            "prize": "谢谢惠顾",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "jump_type": 0,
            "jump_link": "",
            "chance": 3.3333333333333335,
            "item": 4
          }, {
            "id": 3,
            "prize": "油卡200元",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/c6b42c8cc2fa29144b7d5a0d9ae68a6d.png",
            "chance": 5,
            "coupon": "油卡200元优惠券",
            "point": "0.00",
            "love": "0.00",
            "amount": "0.00",
            "prize_num": 10,
            "item": 5
          }, {
            "id": 10,
            "prize": "谢谢惠顾",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "jump_type": 0,
            "jump_link": "",
            "chance": 3.3333333333333335,
            "item": 6
          }, {
            "id": 1,
            "prize": "油卡50元",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/b5fc8fcf24fd89864bf4e66156b56e15.png",
            "chance": 25,
            "coupon": "油卡50元优惠券",
            "point": "0.00",
            "love": "0.00",
            "amount": "0.00",
            "prize_num": 100,
            "item": 7
          }, {
            "id": 11,
            "prize": "谢谢惠顾",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "jump_type": 0,
            "jump_link": "",
            "chance": 3.3333333333333335,
            "item": 8
          }, {
            "id": 2,
            "prize": "油卡100元",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/e91e2ea87af9ca6541ac1646492807ca.png",
            "chance": 10,
            "coupon": "油卡100元优惠券",
            "point": "0.00",
            "love": "0.00",
            "amount": "0.00",
            "prize_num": 49,
            "item": 9
          }, {
            "id": 12,
            "prize": "谢谢惠顾",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/29d9b7662390b1ab79ba93adbc581e84.jpg",
            "jump_type": 0,
            "jump_link": "",
            "chance": 3.3333333333333335,
            "item": 10
          }, {
            "id": 3,
            "prize": "油卡200元",
            "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/c6b42c8cc2fa29144b7d5a0d9ae68a6d.png",
            "chance": 5,
            "coupon": "油卡200元优惠券",
            "point": "0.00",
            "love": "0.00",
            "amount": "0.00",
            "prize_num": 10,
            "item": 11
          }],
          "surplus_time": 20
        },
        "basic_info": {
          "popularize_page": {
            "wechat": {
              "vue_route": [],
              "url": ""
            },
            "mini": {
              "vue_route": [],
              "url": "",
              "mini_url": ""
            },
            "wap": {
              "vue_route": [],
              "url": ""
            },
            "app": {
              "vue_route": [],
              "url": ""
            },
            "alipay": {
              "vue_route": [],
              "url": ""
            },
            "baidu": null
          },
          "home": {
            "mailInfo": {
              "close": "0",
              "name": "博若莱之星",
              "logo": "https://ulink.sg/static/upload/images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
              "signimg": "",
              "achievement": "0",
              "cservice": "",
              "copyright": "",
              "copyrightImg": "",
              "credit": "余额",
              "credit1": "",
              "baidu": "",
              "agent": false,
              "diycode": "",
              "is_bind_mobile": 0
            },
            "memberinfo": {
              "uid": 1
            },
            "system": {
              "key": null,
              "shop": {
                "close": "0",
                "name": "博若莱之星",
                "logo": "images/2/2020/09/WD0dM0d0BTQbV040sT15adS0vcJLCh.png",
                "signimg": "",
                "achievement": "0",
                "cservice": "",
                "copyright": "",
                "copyrightImg": "",
                "credit": "余额",
                "credit1": "",
                "baidu": ""
              },
              "sms": null,
              "share": {
                "follow_url": "",
                "title": "",
                "icon": "",
                "desc": "",
                "url": ""
              },
              "pay": null,
              "logo": "",
              "signimg": "",
              "mobile_login_code": 0,
              "btn_romotion": 1
            },
            "default": {
              "ads": [],
              "advs": [],
              "brand": [],
              "category": [{
                "id": 1,
                "uniacid": 2,
                "name": "红葡萄酒",
                "thumb": "",
                "parent_id": 0,
                "description": "",
                "display_order": 0,
                "enabled": 1,
                "is_home": 1,
                "adv_img": "",
                "adv_url": "",
                "level": 1,
                "advimg_pc": "",
                "advurl_pc": "",
                "created_at": "2020-09-02 18:17:06",
                "updated_at": "2020-09-02 18:17:06",
                "deleted_at": null,
                "plugin_id": 0,
                "filter_ids": "1",
                "small_adv_url": null
              }],
              "time_goods": [],
              "set": {
                "cat_adv_img": ""
              },
              "goods": {
                "total": 0,
                "per_page": 16,
                "current_page": 1,
                "last_page": 0,
                "next_page_url": null,
                "prev_page_url": null,
                "from": null,
                "to": null,
                "data": []
              }
            },
            "item": {
              "data": "",
              "topmenu": {
                "menus": [],
                "params": [],
                "isshow": false
              },
              "menus": [{
                "id": 1,
                "title": "首页",
                "icon": "fa fa-home",
                "url": "/addons/yun_shop/?#/home?i=2&mid=&type=5",
                "name": "home",
                "subMenus": [],
                "textcolor": "#70c10b",
                "bgcolor": "#24d7e6",
                "bordercolor": "#bfbfbf",
                "iconcolor": "#666666"
              }, {
                "id": "menu_1489731310493",
                "title": "分类",
                "icon": "fa fa-th-large",
                "url": "/addons/yun_shop/?#/category?i=2&mid=&type=5",
                "name": "category",
                "subMenus": [],
                "textcolor": "#70c10b",
                "bgcolor": "#24d7e6",
                "iconcolor": "#666666",
                "bordercolor": "#bfbfbf"
              }, {
                "id": "menu_1489731319695",
                "classt": "no",
                "title": "推广",
                "icon": "fa fa-send",
                "url": "/addons/yun_shop/?#/member/extension?i=2&mid=&type=5",
                "name": "extension",
                "subMenus": [],
                "textcolor": "#666666",
                "bgcolor": "#837aef",
                "iconcolor": "#666666",
                "bordercolor": "#bfbfbf"
              }, {
                "id": "menu_1489735163419",
                "title": "购物车",
                "icon": "fa fa-cart-plus",
                "url": "/addons/yun_shop/?#/cart?i=2&mid=&type=5",
                "name": "cart",
                "subMenus": [],
                "textcolor": "#70c10b",
                "bgcolor": "#24d7e6",
                "iconcolor": "#666666",
                "bordercolor": "#bfbfbf"
              }, {
                "id": "menu_1491619644306",
                "title": "会员中心",
                "icon": "fa fa-user",
                "url": "/addons/yun_shop/?#/member?i=2&mid=&type=5",
                "name": "member",
                "subMenus": [],
                "textcolor": "#70c10b",
                "bgcolor": "#24d7e6",
                "iconcolor": "#666666",
                "bordercolor": "#bfbfbf"
              }],
              "menustyle": {
                "previewbg": "#ef372e",
                "height": "49px",
                "textcolor": "#666666",
                "textcolorhigh": "#ff4949",
                "iconcolor": "#666666",
                "iconcolorhigh": "#ff4949",
                "bgcolor": "#FFF",
                "bgcolorhigh": "#FFF",
                "bordercolor": "#010101",
                "bordercolorhigh": "#bfbfbf",
                "showtext": 1,
                "showborder": "0",
                "showicon": 2,
                "textcolor2": "#666666",
                "bgcolor2": "#fafafa",
                "bordercolor2": "#1856f8",
                "showborder2": 1,
                "bgalpha": ".5"
              },
              "janst": "博若莱之星"
            }
          },
          "balance": {
            "balance": "余额"
          },
          "lang": {
            "test": [],
            "commission": {
              "title": "",
              "commission": "",
              "agent": "",
              "level_name": "",
              "commission_order": "",
              "commission_amount": ""
            },
            "single_return": {
              "title": "",
              "single_return": "",
              "return_name": "",
              "return_queue": "",
              "return_log": "",
              "return_detail": "",
              "return_amount": ""
            },
            "team_return": {
              "title": "",
              "team_return": "",
              "return_name": "",
              "team_level": "",
              "return_log": "",
              "return_detail": "",
              "return_amount": "",
              "return_rate": "",
              "team_name": "",
              "return_time": ""
            },
            "full_return": {
              "title": "",
              "full_return": "",
              "return_name": "",
              "full_return_log": "",
              "return_detail": "",
              "return_amount": ""
            },
            "team_dividend": {
              "title": "",
              "team_dividend": "",
              "team_agent_centre": "",
              "dividend": "",
              "flat_prize": "",
              "award_gratitude": "",
              "dividend_amount": ""
            },
            "area_dividend": {
              "area_dividend_center": "",
              "area_dividend": "",
              "dividend_amount": ""
            },
            "income": {
              "name_of_withdrawal": "提现",
              "income_name": "收入",
              "poundage_name": "手续费",
              "special_service_tax": "劳务税"
            }
          },
          "globalParameter": {
            "is_open_delivery_station": 0,
            "is_open_photo_order": 0,
            "delivery_driver_open": 0
          }
        },
        "validate_page": {
          "is_bind_mobile": 0,
          "invite_page": 0,
          "is_invite": 1,
          "is_login": 1,
          "invite_mobile": 1
        }
      };
      if (response.result === 1) {
        this.shop_logo = response.data.shop_logo;
        this.amount_word = response.data.amount_word;
        this.love_word = response.data.love_word;
        this.point_word = response.data.point_word;
        this.credit1 = response.data.point.credit1;
        this.activityModel = response.data.activityModel;
        this.remainingTimes = response.data.surplus_time;
        response.data.result_arr.forEach(item => {
          this.$set(item, "bgSrc", noSelect);
        });
        response.data.result_arr.splice(5, 0, " ");
        response.data.result_arr.splice(6, 0, " ");
        response.data.result_arr.splice(9, 0, " ");
        response.data.result_arr.splice(10, 0, " ");
        this.prizeList = response.data.result_arr;
        this.prizers = response.data.list;
        let temp = this.prizeList[4];
        this.prizeList[4] = this.prizeList[7];
        this.prizeList[7] = temp;
        temp = this.prizeList[12];
        this.prizeList[12] = this.prizeList[13];
        this.prizeList[13] = temp;
        temp = this.prizeList[14];
        this.prizeList[14] = this.prizeList[15];
        this.prizeList[15] = temp;

        this.statusFun(
          Date.parse(new Date()) / 1000,
          this.activityModel.countdown_time[0],
          this.activityModel.countdown_time[1]
        ); // 获取状态，开始，未开始，结束
        if (this.prizers && this.prizers.length > 5) {
          this.prizerListScroll();
        }
        this.prizeZhuan();
      } else {
        if(response.msg != "请登录") {
          Toast(response.msg);
          this.$router.go(-1);
        }
      }


    },

    statusFun(c, s, e) {
      this.$nextTick(() => {
        if (c < s) {
          //Toast("当前时间小于开始时间，未开始");
          // 当前时间小于开始时间，未开始
          this.startStatus = 0;
        } else if (c > s && c < e) {
          // 当前时间大于开始时间，并且小于结束时间，已经开始未结束
          this.startStatus = 1;
        } else if (c > e) {
          //Toast("当前时间大于结束时间，已经结束");
          // 当前时间大于结束时间，已经结束
          this.startStatus = 2;
        }
        this.$refs.pice[5].className = "prizeBtn1";
        this.$refs.pice[6].className = "prizeBtn2";
        this.$refs.pice[9].className = "prizeBtn3";
        this.$refs.pice[10].className = "prizeBtn4";
        this.$refs.pice[5].style.backgroundImage = "url(" + prizeBtn1 + ")";
        this.$refs.pice[6].style.backgroundImage = "url(" + prizeBtn2 + ")";
        this.$refs.pice[9].style.backgroundImage = "url(" + prizeBtn3 + ")";
        this.$refs.pice[10].style.backgroundImage = "url(" + prizeBtn4 + ")";
      });
    },
    move() {
      if (this.prizeIndex === 0) {
        this.$refs.pice[this.arrNum[11]].style.backgroundImage =
          "url(" + noSelect + ")";
        this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage =
          "url(" + isSelect + ")";
        this.prizeIndex++;
      } else if (this.prizeIndex === 12) {
        this.prizeIndex = 0;
        this.$refs.pice[this.arrNum[11]].style.backgroundImage =
          "url(" + noSelect + ")";
        this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage =
          "url(" + isSelect + ")";
        this.prizeIndex++;
      } else {
        this.$refs.pice[
          this.arrNum[this.prizeIndex - 1]
        ].style.backgroundImage = "url(" + noSelect + ")";
        this.$refs.pice[this.arrNum[this.prizeIndex]].style.backgroundImage =
          "url(" + isSelect + ")";
        this.prizeIndex++;
      }

      if (
        this.s2 !== -1 &&
        this.prizeList[this.arrNum[this.prizeIndex - 1]].item == this.s2
      ) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        this.stop();
      }

      this.timeFlag += 100;
      if (this.timeFlag >= 10000 && !this.prizeName) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        Toast({
          message: "当前抽奖人数过多，稍后再来",
          position: "middle",
          duration: 1500
        });
        this.clickFlage = true; // 能点击
        setTimeout(() => {
          // 刷新后重新加载
          location.reload();
        }, 1500);
      }
    },
    // 停止
    stop() {
      this.s2 = -1;
      this.clickFlage = false; // 不能点击
      this.prizeInfo(); // 弹出是否中奖
    },
    // 降速
    lowSpeed() {
      clearInterval(this.timer1);
      this.clickFlage = false; // 不能点击
      this.timer2 = setInterval(this.move, 300);
      setTimeout(() => {
        this.s2 = this.prozeLevel;
      }, 900);
    },
    // 获奖名单滚动
    prizerListScroll() {
      this.$nextTick(() => {
        var prizerList2 = document.getElementById("prizerList2");
        var prizerList1 = document.getElementById("prizerList1");
        var prizerList = document.getElementById("prizerList");
        prizerList2.innerHTML = prizerList1.innerHTML;
        setInterval(() => {
          // if (this.prizerList.scrollTop >= (this.prizerList1.offsetHeight - this.prizerList.offsetHeight)) {
          if (prizerList.scrollTop >= prizerList1.offsetHeight) {
            prizerList.scrollTop = 0;
          } else {
            prizerList.scrollTop++;
          }
        }, 30);
      });
    },
    prizeZhuan() {
      this.$nextTick(() => {
        this.$refs.turn.onclick = () => {
          if (this.remainingTimes > 0) {
            // 判断剩余抽奖次数
            if (this.clickFlage) {
              if (this.startStatus === 1) {
                // 活动开始
                this.clickFlage = false; // 不能点击
                this.timer1 = setInterval(this.move, 100);
                // $http
                //   .get("plugin.lucky-draw.frontend.draw.doDraw", {
                //     lotteryId: this.lotteryId
                //   })
                //   .then(
                //     response => {
                //       if (response.result === 1) {
                //         this.remainingTimes--;
                //         if (response.data.result) {
                //           this.hasRecord = true;
                //           this.prozeLevel = response.data.result.item;
                //           this.prizeName = response.data.result.prize;
                //           this.prizeUrl = response.data.result.thumb_url;
                //         } else {
                //           this.hasRecord = false;
                //           this.prozeLevel = response.data.item;
                //           this.prizeName = response.data.prize;
                //           this.prizeUrl = response.data.thumb_url;
                //           this.empty_prize_prompt = response.data.empty_prize_prompt
                //         }
                //
                //         // console.log(this.prozeLevel);
                //         setTimeout(() => {
                //           clearInterval(this.timer1);
                //           this.lowSpeed();
                //         }, 1200);
                //       } else {
                //         MessageBox.alert(response.msg).then(() => {
                //           if (response.data.goods_id) {
                //             // this.$router.push(this.fun.getUrl("goods", { id: response.data.goods_id }));
                //           }
                //         });
                //         this.clickFlage = false; // 不能点击
                //         setTimeout(() => {
                //           this.clickFlage = true;
                //         }, 2000);
                //         clearInterval(this.timer1);
                //         clearInterval(this.timer2);
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
                //   "msg": "谢谢惠顾！",
                //   "data": {
                //     "id": 7,
                //     "prize": "谢谢惠顾",
                //     "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/395bc978964c3e05486e520bcaf76feb.png",
                //     "jump_type": 0,
                //     "jump_link": "",
                //     "empty_prize_prompt": "谢谢惠顾",
                //     "chance": 10.833333333333334,
                //     "item": 0
                //   }
                // };

                // response = {
                //   "result": 1,
                //   "msg": "恭喜你，中奖了！",
                //   "data": {
                //     "result": {
                //       "id": 3,
                //       "prize": "三等奖",
                //       "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/0fb22ad3332a0f4b6955df3b6270bfd8.png",
                //       "chance": 10,
                //       "coupon": "优惠1",
                //       "point": "0.00",
                //       "love": "0.00",
                //       "amount": "0.00",
                //       "prize_num": 96,
                //       "item": 11
                //     }
                //   }
                // };

                var response = {
                  "result": 1,
                  "msg": "恭喜你，中奖了！",
                  "data": {
                    "result": {
                      "id": 1,
                      "prize": "油卡50元",
                      "thumb_url": "https://ulink.sg/static/upload/images/0/2020/09/b5fc8fcf24fd89864bf4e66156b56e15.png",
                      "chance": 25,
                      "coupon": "油卡50元优惠券",
                      "point": "0.00",
                      "love": "0.00",
                      "amount": "0.00",
                      "prize_num": 100,
                      "item": 7
                    }
                  }
                };

                if (response.result === 1) {
                  this.remainingTimes--;
                  if (response.data.result) {
                    this.hasRecord = true;
                    this.prozeLevel = response.data.result.item;
                    this.prizeName = response.data.result.prize;
                    this.prizeUrl = response.data.result.thumb_url;
                  } else {
                    this.hasRecord = false;
                    this.prozeLevel = response.data.item;
                    this.prizeName = response.data.prize;
                    this.prizeUrl = response.data.thumb_url;
                    this.empty_prize_prompt = response.data.empty_prize_prompt
                  }

                  // console.log(this.prozeLevel);
                  setTimeout(() => {
                    clearInterval(this.timer1);
                    this.lowSpeed();
                  }, 1200);
                } else {
                  debugger
                  MessageBox.alert(response.msg).then(() => {
                    if (response.data.goods_id) {
                      // this.$router.push(this.fun.getUrl("goods", { id: response.data.goods_id }));
                    }
                  });
                  this.clickFlage = false; // 不能点击
                  setTimeout(() => {
                    this.clickFlage = true;
                  }, 2000);
                  clearInterval(this.timer1);
                  clearInterval(this.timer2);
                }

              } else if (this.startStatus === 0) {
                // 没开始
                Toast({
                  message: "活动尚未开始",
                  position: "middle",
                  duration: 1500
                });
              } else if (this.startStatus === 2) {
                // 已经结束
                Toast({
                  message: "活动已经结束",
                  position: "middle",
                  duration: 1500
                });
              }
            }
          } else {
            // 没有抽奖机会了
            this.prizeInfoShow = true;
            this.haveLottery = true;
          }
        };
      });
    },
    touchMove(e) {
      e.preventDefault(); // 禁止滚动
      e.stopPropagation();
    },
    prizeInfo() {
      setTimeout(() => {
        this.clickFlage = true;
        if (this.hasRecord) {
          this.prizeInfoShow = true;
          this.havePrizeShow = true;
        } else {
          this.prizeInfoShow = true;
          this.noPrizeShow = true;
        }
      }, 800);
    },
    close() {
      // 关闭没中奖
      this.prizeInfoShow = false;
      this.noPrizeShow = false;
      this.haveLottery = false;
      this.havePrizeShow = false;
    },
    goIndex() {
      if (this.activityModel.jump_link) {
        window.location.href = this.activityModel.jump_link;
      } else {
        // this.$router.push(this.fun.getUrl("home"));
      }
      this.prizeInfoShow = false; // 显示中奖信息的遮罩层
      this.noPrizeShow = false; // 没中奖
    },
    lotteryRecord() {
      // this.$router.push(
      //   this.fun.getUrl("LotteryRecord", {}, { lotteryId: this.lotteryId })
      // );
      this.$router.push({path:'/lottery_record',query:{lotteryId:this.lotteryId}});
    },
    //分享
    initShare() {
      // if (this.fun.getTyep() == 5) {
      //   return;
      // }
      // $http
      //   .post("member.member.wxJsSdkConfig", {
      //     url:
      //       this.fun.isIosOrAndroid() === "android"
      //         ? window.location.href
      //         : window.initUrl
      //   })
      //   .then(response => {
      //     if (response.result === 1) {
      //       this.share(response.data);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },

    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function() {
        // let _title = that.fun.isTextEmpty(that.activityModel.name)
        //   ? data.share.title
        //   : that.activityModel.name;
        //
        // let _link = document.location.href + "&share_tag=2";
        // _link = that.fun.isMid(_link, data.info.uid);
        //
        // let _imgUrl = that.fun.isTextEmpty(that.activityModel.background)
        //   ? data.share.icon
        //   : that.activityModel.background;
        // let _desc = that.fun.isTextEmpty(that.activityModel.content)
        //   ? data.share.desc
        //   : that.activityModel.content;

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function() {
              $http
              .get("plugin.lucky-draw.frontend.draw.getShare", {
                lotteryId: that.lotteryId
              })
              .then(response => {
                that.getData();
                console.log(response);
              })
              .catch(err => {
                console.error(err);
              });
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });

        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: "link", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            $http
              .get("plugin.lucky-draw.frontend.draw.getShare", {
                lotteryId: that.lotteryId
              })
              .then(response => {
                that.getData();
                console.log(response);
              })
              .catch(err => {
                console.error(err);
              });
            Toast("分享成功");
          },
          cancel: function() {
            Toast("取消分享");
          }
        });
      });
    },
    authModal: function() {

      var i = this;

      util.check_login_new().then(function(e) {
        if(e){
          i.needAuth = !1
        }else{
          wx.navigateTo({
            url: "/login"
          })
        }
      })

      return !i.needAuth
    },
  }
};
