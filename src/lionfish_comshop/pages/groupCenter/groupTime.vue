<template>
  <van-calendar
    title="Set Working Time"
    color="#07c160"
    @select="select"
    @unselect="unselect"
    type="multiple"
    :default-date="date"
    :min-date="minDate"
    :max-date="maxDate"
    :poppable="false"
    :show-confirm="false"/>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js'
  import status from '../../utils/index.js'
  import { Calendar } from 'vant'

  var wx, app
  export default {
    components: { [Calendar.name]: Calendar },
    mixins: [GlobalMixin],
    name: 'group-time',
    data() {
      return {
        date: [],
        minDate: new Date(),
        maxDate: new Date()
      }
    },
    created: function() {
      app = this.$getApp()
      wx = this.$wx
      const minDate = new Date()
      minDate.setDate(minDate.getDate() + 1)
      this.minDate = minDate
      this.date.push(minDate)

      for(var i = 2 ;i < 30; i++){
        const tp = new Date()
        tp.setDate(tp.getDate() + i)
        this.date.push(tp)
      }

      const maxDate = new Date()
      maxDate.setDate(maxDate.getDate() + 30)
      this.maxDate = maxDate
      this.date.push(maxDate)
      wx.setNavigationBarTitle({
        title: 'Working Time',
        showLogo: false,
        showMore: false,
        showBack: true
      })
      status.setNavBgColor()
      this.load()

    },
    methods: {
      select: function(o) {
        this.date = o
        this.save_select()
      },
      unselect: function(o) {

        var index = this.date.indexOf(o);

        if (index > -1) {
          this.splice(index, 1);
        }

        this.save_select()
      },
      save_select: function() {
        const arr = []
        const length = this.date.length
        console.log(this.date.length)
        for (var i = 0; i < length; i++) {
          arr.push(this.dateFormat('YYYY-mm-dd', this.date[i]))
        }
        console.log(arr)
        var t = wx.getStorageSync('token'), c = this
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'community.save_head_work_day',
            token: t,
            date_list: arr.join(',')
          },
          dataType: 'json',
          success: function(t) {
            console.log(t)
          }
        })
      },
      load: function() {
        var t = wx.getStorageSync('token'), c = this
        app.util.request({
          url: 'entry/wxapp/user',
          data: {
            controller: 'community.get_head_work_day',
            token: t
          },
          dataType: 'json',
          success: function(t) {
            if (t.code == 0) {

              const arr = t.data
              if(arr.length>0){
                c.date = [];
              }
              for (var i = 0; i < arr.length; i++) {

                const d = c.stringToDate(arr[i].work_date)
                c.date.push(d)
              }
            }

          }
        })
      },
      dateFormat: function(fmt, date) {
        let ret
        const opt = {
          'Y+': date.getFullYear().toString(),        // 年
          'm+': (date.getMonth() + 1).toString(),     // 月
          'd+': date.getDate().toString(),            // 日
          'H+': date.getHours().toString(),           // 时
          'M+': date.getMinutes().toString(),         // 分
          'S+': date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
          }

        }

        return fmt
      },
      stringToDate: function(str) {
        const strDate = str.split(' ')

        const strDatepart = strDate[0].split('-')

        const dtDate = new Date(strDatepart[0], strDatepart[1] - 1, strDatepart[2])

        return dtDate
      }

    }

  }
</script>

<style scoped>

</style>
