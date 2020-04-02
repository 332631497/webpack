<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import '../theme/index.css';
@import '../theme/adjust/index.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.title_description{
  background-color: rgb(255, 230, 230);
  border-left-color: red;
  border-left-style: solid;
  border-left-width: 3px;
  color: #FF3399;
  font-size: 12px;
  line-height: 1.5rem;
  padding: .5rem 1rem .5rem 1rem;
  text-align: left;
  clear: both;
}
.title_description2{
  font-size: 14px;
  text-align: left;
  font-weight: bold;
  min-height: 1.5rem;
  line-height: 1.5rem;
  clear: both;
}
.title_description2 > div:first-child {
  color: rgb(255, 147, 0);
  font-size: 1.5rem;
  float: left;
  margin: 0rem 0.5rem;
}
.el-input.is-disabled .el-input__inner {
  color: #666666;
}
.el-textarea.is-disabled .el-textarea__inner {
  color: #666666;
}
.el-select.is-disabled .el-input__inner {
  color: #666666;
}
.el-range-editor.is-disabled {
  color: #666666;
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 100%;
}
</style>
