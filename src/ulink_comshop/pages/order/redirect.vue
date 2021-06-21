<template>

  <div class="goods-wrapper">
      <div>

      </div>

  </div>

</template>

<script>

    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import GlobalMixin from '../../mixin/globalMixin.js'
    import status from '../../utils/index.js'

    var wcache = require('../../utils/wcache.js'), wx, app
    var _extends = Object.assign || function (t) {
        for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a]
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
        }
        return t
    }
    var detailClearTime = null

    function count_down(t, a) {

        var e = Math.floor(a / 1000), o = e / 3600 / 24, i = Math.floor(o), s = e / 3600 - 24 * i, n = Math.floor(s),
            d = e / 60 - 1440 * i - 60 * n, r = Math.floor(d), c = e - 86400 * i - 3600 * n - 60 * r

        t.endtime = {
            days: fill_zero_prefix(i),
            hours: fill_zero_prefix(n),
            minutes: fill_zero_prefix(r),
            seconds: fill_zero_prefix(c),
            show_detail: 1
        }
        if (a <= 0) {
            clearTimeout(detailClearTime)
            t.endtime = {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00'
            }
            return
        }
        t.$forceUpdate()
        detailClearTime = setTimeout(function () {
            count_down(t, a -= 1000)
        }, 1000)
    }

    function fill_zero_prefix(t) {
        return t < 10 ? '0' + t : t
    }

    export default {
        mixins: [GlobalMixin],
        swiper: [swiper],
        swiperSlide: [swiperSlide],
        name: 'redirect',
        data() {
            return {}
        },
        created: function () {
            app = this.$getApp();
            wx = this.$wx;
            this.$wx.setNavigationBarTitle({
                title: 'Payment Result',
                showLogo: false,
                showMore: false,
                showBack: false
            })
            this.onLoad()
        },
        methods: {
            onLoad: function () {

                const loading = this.$loading({
                    lock: true,
                    text: '正在查询支付结果...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                var that = this
                var e = this.$route.query

                console.log(e)

            },


        }
    }
</script>
<style scoped>
  @import "../../../@feiying/8.less";


</style>
