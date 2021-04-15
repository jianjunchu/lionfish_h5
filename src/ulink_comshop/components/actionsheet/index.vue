<template>
  <div>
    <div @click="closeActionSheet" :class="['weui-mask', (show?'':'weui-mask_hidden'), 'maskClass']" v-if="mask"></div>
    <div :class="['weui-actionsheet', (show?'weui-actionsheet_toggle':''), 'extClass']">
      <div class="weui-actionsheet__title" v-if="title">
        <div class="weui-actionsheet__title-text">{{title}}</div>
      </div>
      <slot name="title" v-else></slot>
      <div class="{{!showCancel&&index===actions.length-1?'weui-actionsheet__action':'weui-actionsheet__menu'}}"
           v-for="(actionItem ,index ) in actions" v-for-item="actionItem" :key="index">
        <div v-if="isNotSlot(actionItem)">
          <div @click="buttonTap"
               class="weui-actionsheet__cell {{item.type==='warn'?'weui-actionsheet__cell_warn':''}}"
               :data-groupindex="index" :data-index="actionIndex" :data-value="item.value"
               v-for="(item ,actionIndex ) in actionItem " :key="value">
            {{item.text}}
          </div>
        </div>
        <!-- <slot name="{{actionItem}}" wx:else></slot> -->
      </div>
      <div class="weui-actionsheet__action" v-if="showCancel">
        <div @click="closeActionSheet" class="weui-actionsheet__cell" data-type="close" id="iosActionsheetCancel">
          {{cancelText}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      title: {
        type: String,
        default: ""
      },
      showCancel: {
        type: Boolean,
        default: !0
      },
      cancelText: {
        type: String,
        default: "取消"
      },
      maskClass: {
        type: String,
        default: ""
      },
      extClass: {
        type: String,
        default: ""
      },
      maskClosable: {
        type: Boolean,
        default: !0
      },
      mask: {
        type: Boolean,
        default: !0
      },
      show: {
        type: Boolean,
        default: !1
      },
      actions: {
        type: Array,
        default: []
      }
    },
    watch:{
      actions:(newVal,oldVal) => {
        if(0 < newVal.length && "string" != typeof newVal[0] && !(newVal[0] instanceof Array)){
            this.actions = newVal;
        }
      }
    },
    methods: {
      isNotSlot(v){
        return (typeof v !== 'string')
      },
      buttonTap: function(e) {
        var t = e.currentTarget.dataset, o = t.value, n = t.groupindex, r = t.index;
        this.triggerEvent("actiontap", {
          value: o,
          groupindex: n,
          index: r
        });
      },
      closeActionSheet: function(e) {
        var t = e.currentTarget.dataset.type;
        (this.maskClosable || t) && (this.setData({
          show: !1
        }), this.triggerEvent("close"));
      }
    }
  }
</script>

<style>
  @import 'index.less';
</style>
