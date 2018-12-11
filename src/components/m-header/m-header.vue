<template>
  <div class="m-header">
    <i class="icon-geren" ></i>
    <div class="icon"></div>
    <h1 class="text">Music Player</h1>
    <i class="icon-mulu"></i>
  </div>
</template>

<script>
/* eslint-disable */
export default {}
</script>
<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  background: $color-background;
  vertical-align: middle;
  .icon-geren,
  .icon-mulu {
    color: $color-text;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .icon-geren {
    float: left;
    left: 10px;
    font-size: 30px;
    color: $color-theme;
  }
  .icon-mulu {
    float: right;
    right: 10px;
    font-size: 20px;
    color: $color-theme;
  }
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 32px;
    height: 32px;
    margin-right: 9px;
    @include bg-image('logo');
    // background-image: url('logo@2y.png');
    background-size: 32px 32px;
  }
  .text {
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
    // color: $color-text;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-text;
    }
  }
}
</style>
