import PayPal from 'vue-paypal-checkout'

export const paypalMixin = {
  data() {
    return {
      credentials: {
        sandbox: 'AfUzHR6Ts_v7YcEV1LMCgghGaQUlUnzQDvuTLmkJj9C2w8cfy9zEqzm_UzCYsEdGzvr-CVk3breqqJIn',
        production: '填写线上环境client_id'
      },

      buttonStyle: {
        label: 'pay',
        size: 'small',
        shape: 'rect',
        color: 'blue'
      }
    }
  },
  components: {
    PayPal
  },
  methods: {
    getPayPalInfo() {
      const that = this
      this.$getApp().util.request({
        url: 'entry/wxapp/user',
        data: {
          controller: 'user.get_paypal_info'
        },
        dataType: 'json',
        method: 'POST',
        success: function(t) {
          that.sandbox = t.sandbox
          that.production = t.production
        }
      })
    },
    paymentAuthorized(data) {
      // 授权完成的回调，可以拿到订单id
      console.log(data)
    },

    paymentCompleted(data) {
      // 用户支付完成的回调，可以拿到订单id
      console.log(data)
    },

    paymentCancelled(data) {
      // 用户取消交易的回调
      console.log(data)
    }
  }
}
