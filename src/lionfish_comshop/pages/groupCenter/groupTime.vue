<template>
  <van-calendar
    title="Set Working Time"
    :color="skin.color"
    :select="selectTime"
    type="multiple"
    :default-date="date"
    :min-date="minDate"
    :max-date="maxDate"
    :poppable="false"
    :show-confirm="false"/>
</template>

<script>
  import GlobalMixin from '../../mixin/globalMixin.js';
  import status from '../../utils/index.js'
  import util from '../../utils/index.js'
  import { Calendar } from 'vant';

  var wx,app;
  export default {
    components:{[Calendar.name]:Calendar },
    mixins: [GlobalMixin],
    name: 'group-time',
    data(){
      return{
        date:[],
        minDate: new Date(),
        maxDate: new Date()
      }
    },
    created:function() {
      app = this.$getApp()
      wx = this.$wx
      const minDate = new Date();
      minDate.setDate(minDate.getDate()+1)
      this.minDate = minDate

      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate()+30)
      this.maxDate = maxDate

      wx.setNavigationBarTitle({
        title: 'Working Time',
        showLogo:false,
        showMore:false,
        showBack:true
      })
      status.setNavBgColor()


    },
    mounted:{
      selectTime:function(o) {
        console.log(o)
      }

    }

  }
</script>

<style scoped>

</style>
