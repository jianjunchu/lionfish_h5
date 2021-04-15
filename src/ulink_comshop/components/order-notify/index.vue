<template>
  <div :class="['i-class', 'orderNotify', (hide?'ani-out':'ani-in')]" v-if="userInfo">
    <img class="orderNotifyAvatar" :src="userInfo.avatar"/>
    <span class="orderNotifyName">{{userInfo.username}}</span>
    刚刚下单啦
  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        userInfo: '',
        hide: !1,
        order_id: 0
      }
    },
    props: {
      stopNotify: {
        type: Boolean,
        value: !0,
        observer: function(e) {
          e ? (clearInterval(ctime), ctime = null) : this._startReq()
        }
      }
    },
    watch: {
      stopNotify: (e, oldValue) => {
        e ? (clearInterval(ctime), ctime = null) : this._startReq()
      }
    },
    methods: {
      _startReq: function() {
        var e = this
        ctime = setInterval(function() {
          e.getOrderNotify()
        }, 3e3)
      },
      getOrderNotify: function() {
        var o = this

        $http({
          controller: 'goods.notify_order'
        }).then(e => {
          if (0 == e.code) {
            var t = e.username, a = e.avatar, i = e.order_id, r = {
              username: t,
              avatar: a
            }
            if(o.data.order_id != i ){
              this.hide = !1;
              this.userInfo = r
              this.order_id = i
              setTimeout(function() {
                o.setData({
                  hide: !0
                })
              }, 5e3)
            }else{
              !o.data.hide && setTimeout(function() {
                o.setData({
                  hide: !0
                })
              }, 5e3)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .orderNotify {
    background-color: rgba(0, 0, 0, .6);
    color: #fff;
    border-radius: 15px;
    line-height: 30px;
    padding: 0 10px;
    display: flex;
    align-content: center;
    align-items: center;
    transform: translateX(-100%);
  }

  .orderNotify.ani-in {
    animation: aniIn 400ms ease-in forwards;
  }

  .orderNotify.ani-out {
    animation: aniOut 400ms ease-out forwards;
  }

  .orderNotifyAvatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 4px;
  }

  .orderNotifyName {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @keyframes aniIn {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0%);
    }
  }

  @keyframes aniOut {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(-100%);
    }
  }
</style>
