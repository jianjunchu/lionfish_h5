<template>
  <div class="comment-card">
    <i-card>
      <div slot="header">
        <div class="header">订单备注</div>
      </div>
      <view slot="content">
        <view class="content-wrap">{{comment}}</view>
      </view>
    </i-card>
  </div>

</template>

<script>
  export default {
    name: '',
    props:{
      comment: {
        type: String
      }
    }
  }
</script>

<style scoped>
  .comment-card {
    margin: 0 auto 10px;
  }

  .comment-card .header {
    padding: 10px 15px;
    color: #444;
    font-size: 14px;
    font-weight: 500;
  }

  .comment-card .content-wrap {
    padding: 8px 7px;
    font-size: 13px;
    color: #444;
    border-top: 0.1px solid #efefef;
  }
</style>
