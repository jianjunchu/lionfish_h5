<template>

  <!--ulink_comshop/pages/groupCenter/setWorkTime.wxml-->
  <div class='wrap'>
    <div>
      <div class='date-show'>
        <div class='lt-arrow' @click.stop='lastMonth'>
          <img src='@/assets/images/right.png' mode='aspectFit'/>
        </div>
        {{year}}年{{month}}月
        <div class='rt-arrow' @click.stop='nextMonth'>
          <img src='@/assets/images/right.png' mode='aspectFit'/>
        </div>
      </div>
    </div>
    <div class='header'>
      <div v-for='(item , index ) in date' :class='[(index == todayIndex) && isTodayWeek ? "weekMark" : ""]'>{{item}}<div></div></div>
    </div>
    <div class='date-box'>
      <div v-for="(item , index ) in dateArr" :class='[item.weight == 1 ? "" : "nowDay"]'>
        <div v-if="item.weight == 2" class='date-head'>
          <div @click.stop='addDate' :data-date='index'>{{item.dateNum}}</div>
        </div>
        <div v-else-if="item.weight == 4" class='break_time'>
          <div  :data-date='item'>{{item.dateNum}}</div>
        </div>
        <div v-else class='date-head2'>
          <div @click.stop='addDate' :data-date='index'>{{item.dateNum}}</div>
        </div>
        <!-- <div class='date-weight'>{{item.weight}}</div> -->
      </div>
    </div>
  </div>

</template>

<script>

    var app, wx

    export default {
        name: "",
        data() {
            return {
                year: 0,
                month: 0,
                date: ['日', '一', '二', '三', '四', '五', '六'],
                dateArr: [],
                isToday: 0,
                isTodayWeek: false,
                todayIndex: 0,
                workDates: [],
                breakTimes:[]
            }
        },
        created: function () {

            app = this.$getApp()
            wx = this.$wx
            this.$wx.setNavigationBarTitle({
                title: "开团时间",
                showLogo: false,
                showMore: false,
                showBack: true
            })
            this.onLoad()

        },

        methods: {

            onLoad: function () {
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                this.getWorkDates();
                //this.dateInit(year,month);
                this.year = year;
                this.month = month;
                this.isToday = '' + year +"-" + month + "-" + now.getDate();

            },
            dateInit: function (setYear, setMonth) {
                //全部时间的月份都是按0~11基准，显示月份才+1
                var dateArr = [];						//需要遍历的日历数组数据
                let arrLen = 0;							//dateArr的数组长度
                let now = setYear ? new Date(setYear, setMonth) : new Date();
                let year = setYear || now.getFullYear();
                let nextYear = 0;
                let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
                let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
                var str = year+"/"+(month+1)+"/1";
                let startWeek = new Date(str).getDay();							//目标月1号对应的星期
                let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
                let obj = {};
                let num = 0;
                let nowDays = new Date().getDate();
                var that = this;

                if (month + 1 > 11) {
                    nextYear = year + 1;
                    dayNums = new Date(nextYear, nextMonth, 0).getDate();
                }
                arrLen = startWeek + dayNums;
                //组建当月日期
                console.log(year, new Date().getFullYear());
                var a = that.month;
                var b = new Date().getMonth()+1;
                console.log(b, "setMonth");
                for (let i = 0; i < arrLen; i++) {
                    if (year == new Date().getFullYear()) {
                        if (i >= startWeek) {
                            num = i - startWeek + 1;
                            if (a < b) {
                                obj = {
                                    isToday: '' + year + "-" + (month + 1) + "-" + num,
                                    dateNum: num,
                                    weight: 3,
                                    index: i
                                }
                            } else if (a == b) {
                                if (num <= nowDays) {
                                    obj = {
                                        isToday: '' + year + "-" + (month + 1) + "-" + num,
                                        dateNum: num,
                                        weight: 3,
                                        index: i
                                    }
                                } else {
                                    obj = {
                                        isToday: '' + year + "-" + (month + 1) + "-" + num,
                                        dateNum: num,
                                        weight: 1,
                                        index: i
                                    }
                                }

                            } else if (a > b) {
                                obj = {
                                    isToday: '' + year + "-" + (month + 1) + "-" + num,
                                    dateNum: num,
                                    weight: 1,
                                    index: i
                                }
                            }
                            var now1 = '';
                            var monStr = '';
                            var dayStr = '';
                            if ((month + 1) < 10) {
                                monStr = '0' + (month + 1);
                            } else {
                                monStr = '' + (month + 1);
                            }
                            if (num < 10) {
                                dayStr = '0' + num;
                            } else {
                                dayStr = '' + num;
                            }
                            now1 = '' + year + "-" + monStr + "-" + dayStr;
                            var workTimes = that.workDates;
                            for (var j = 0; j < workTimes.length; j++) {
                                if (now1 == workTimes[j]) {
                                    obj.weight = 2;
                                    //console.log("success");
                                    break;
                                }
                            }

                            let breakTimes = that.breakTimes;
                            for (var j = 0; j < breakTimes.length; j++) {
                                if (now1 == breakTimes[j]) {
                                    obj.weight = 4;
                                    //console.log("success");
                                    break;
                                }
                            }

                        } else {
                            obj = {};
                        }
                    } else if (year > new Date().getFullYear()){
                        if (i >= startWeek) {
                            num = i - startWeek + 1;
                            if (a < b) {
                                obj = {
                                    isToday: '' + year + "-" + (month + 1) + "-" + num,
                                    dateNum: num,
                                    weight: 1,
                                    index: i
                                }
                            } else if (a == b) {
                                if (num <= nowDays) {
                                    obj = {
                                        isToday: '' + year + "-" + (month + 1) + "-" + num,
                                        dateNum: num,
                                        weight: 1,
                                        index: i
                                    }
                                } else {
                                    obj = {
                                        isToday: '' + year + "-" + (month + 1) + "-" + num,
                                        dateNum: num,
                                        weight: 1,
                                        index: i
                                    }
                                }

                            } else if (a > b) {
                                obj = {
                                    isToday: '' + year + "-" + (month + 1) + "-" + num,
                                    dateNum: num,
                                    weight: 1,
                                    index: i
                                }
                            }
                            var now1 = '';
                            var monStr = '';
                            var dayStr = '';
                            if ((month + 1) < 10) {
                                monStr = '0' + (month + 1);
                            } else {
                                monStr = '' + (month + 1);
                            }
                            if (num < 10) {
                                dayStr = '0' + num;
                            } else {
                                dayStr = '' + num;
                            }
                            now1 = '' + year + "-" + monStr + "-" + dayStr;
                            var workTimes = that.workDates;
                            for (var j = 0; j < workTimes.length; j++) {
                                if (now1 == workTimes[j]) {
                                    obj.weight = 2;
                                    //console.log("success");
                                    break;
                                }
                            }

                            var breakTimes = that.breakTimes;
                            for (var j = 0; j < breakTimes.length; j++) {
                                if (now1 == breakTimes[j]) {
                                    obj.weight = 4;
                                    //console.log("success");
                                    break;
                                }
                            }


                        } else {
                            obj = {};
                        }
                    }
                    dateArr[i] = obj;
                }
                //判断工作日期
                that.dateArr = dateArr


                let nowDate = new Date();
                let nowYear = nowDate.getFullYear();
                let nowMonth = nowDate.getMonth() + 1;
                let nowWeek = nowDate.getDay();
                let getYear = setYear || nowYear;
                let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
                if (nowYear == getYear && nowMonth == getMonth) {
                    this.isTodayWeek = true;
                    this.todayIndex = nowWeek;
                } else {

                    this.isTodayWeek = false
                    this.todayIndex = -1
                }
            },
            getWorkDates: function(){
                var a = this, token = wx.getStorageSync("token");
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "community.get_head_work_day",
                        token: token
                    },
                    dataType: "json",
                    method: "GET",
                    success: function (e) {

                        console.log(e,"工作日期");
                        let work_date = e.work_date;
                        let break_time = e.break_time;
                        a.workDates = work_date;
                        a.breakTimes =break_time;

                        let year = a.year;
                        let month = a.month-1;
                        a.dateInit(year,month);
                    }
                });
            },
            lastMonth: function () {
                //全部时间的月份都是按0~11基准，显示月份才+1
                let year = this.month - 2 < 0 ? this.year - 1 : this.year;
                let month = this.month - 2 < 0 ? 11 : this.month - 2;
                this.year = year;
                this.month = month + 1;

                this.dateInit(year, month);
            },
            nextMonth: function () {
                //全部时间的月份都是按0~11基准，显示月份才+1
                let year = this.month > 11 ? this.year + 1 : this.year;
                let month = this.month > 11 ? 0 : this.month;

                this.year = year;
                this.month = month + 1;

                this.dateInit(year, month);
            },
            addDate: function(e){
                let that = this;
                var dataArr3 = that.workDates;
                var dataArr2 = that.dateArr;
                var index = e.currentTarget.dataset['date'];
                var obj = dataArr2[index];
                let nowDays = new Date().getDate();
                let a2 = that.month;
                let b = new Date().getMonth()+1;
                var ind = obj.index;//序号
                //判断该日期是否已经选中
                var flag = 0;
                for(var i=0;i<dataArr3.length;i++){
                    var nowDay = obj.isToday.split('-');
                    if(nowDay[1]<10){
                        nowDay[1] = '0'+nowDay[1];
                    }
                    if(nowDay[2]<10){
                        nowDay[2] = '0' + nowDay[2];
                    }
                    console.log(nowDay.toString().replace(/,/g, '-') + ":" + dataArr3[i]);
                    if(nowDay.toString().replace(/,/g,'-') == dataArr3[i]){
                        flag ++;
                        dataArr3.splice(i,1);
                        break;
                    }
                }
                console.log(dataArr3,"123456");
                if(flag == 0){
                    if (that.year == new Date().getFullYear()){
                        if (a2 > b) {
                            dataArr3.push(obj.isToday);
                            dataArr2[ind].weight = 2;
                        } else if (a2 == b) {
                            if (nowDays < obj.dateNum) {
                                dataArr3.push(obj.isToday);
                                dataArr2[ind].weight = 2;
                            }
                        }
                    } else if (that.year > new Date().getFullYear()){
                        dataArr3.push(obj.isToday);
                        dataArr2[ind].weight = 2;
                    }
                }else{
                    dataArr2[ind].weight = 1;
                }
                console.log(obj);
                this.dateArr = dataArr2
                var str = dataArr3.toString();
                var a = this, token = wx.getStorageSync("token");
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        controller: "community.save_head_work_day",
                        token: token,
                        date_list: str
                    },
                    dataType: "json",
                    method: "GET",
                    success: function (e) {
                        app.util.request({
                            url: "entry/wxapp/index",
                            data: {
                                controller: "community.get_head_work_day",
                                token: token
                            },
                            dataType: "json",
                            method: "GET",
                            success: function (e) {
                                console.log(e)
                                let work_date = e.work_date;
                                let break_time = e.break_time;
                                a.workDates = work_date;
                                a.breakTimes =break_time
                                console.log(a.data.workDates,"工作时间");
                            }
                        });
                    }
                });
            }
        }


    }
</script>

<style scoped>

  .date-show{
    position: relative;
    width: 25vw;
    font-family: PingFang-SC-Regular;
    font-size: 4vw;
    color: #282828;
    text-align: center;
    margin: 6vw auto 1vw;
  }
  .lt-arrow,.rt-arrow{
    position: absolute;
    top: 0.1vw;
    width: 6vw;
    height: 6vw;
  }
  .lt-arrow img,.rt-arrow img{
    width: 2vw;
    height: 2.6vw;
  }
  .lt-arrow{
    left: -11vw;
    transform: rotate(180deg);
  }
  .rt-arrow{
    right: -10vw;
  }
  .header{
    font-size: 0;
    padding: 0 2.4vw;
  }
  .header>div{
    display: inline-block;
    width: 14.285%;
    color: #333;
    font-size: 3vw;
    text-align: center;
    border-bottom: 1px solid #D0D0D0;
    padding: 3.9vw 0;
  }
  .weekMark{
    position: relative;
  }
  .weekMark div{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #22A7F6;
  }
  .date-box{
    font-size: 0;
    padding: 1vw 0;
    height: 300px;
  }
  .date-box>div{
    position: relative;
    display: inline-block;
    width: 14.285%;
    color: #020202;
    font-size: 4vw;
    line-height: 6vw;
    text-align: center;
    vertical-align: middle;
    margin: 2vw 0;
  }
  .date-head{
    height: 6vw;
    line-height: 6vw;
    font-size: 2.6vw;
  }
  .nowDay .date-head{
    width: 6vw;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    background-color: #22A7F6;
    margin: 0 auto;
  }
  .nowDay .break_time{
    width: 6vw;
    border-radius: 50%;
    text-align: center;
    color: rgb(233, 78, 78);
    background-color: rgba(110, 114, 116, 0.945);
    margin: 0 auto;
  }
  .nowDay .date-head2{
    width: 6vw;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    background-color: rgba(110, 114, 116, 0.945);
    margin: 0 auto;
  }
  .date-weight{
    font-size: 2.5vw;
    padding: 2vw 0;
  }
  .nowDay .date-weight{
    color: #22A7F6;
  }
  .one{
    position: absolute;
    bottom: 0;
    right: 0.6vw;
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    background-color: red;
  }
  .two{
    position: absolute;
    bottom: 3vw;
    right: 0.6vw;
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    background-color: blue;
  }
</style>
