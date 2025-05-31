Rink<script>
export default {
  name: "Rink",
  inject: ["$services"],
  data: () => ({
    t: {},
    data: null,
  }),
  methods: {
    load: function () {

      this.$services.toolService.flow_prepare();

      const mainFrame = document.querySelector('#main-frame');
      mainFrame.addEventListener('dblclick', function() {
        this.$services.toolService.fullScreen()
      });

    },
  },
  created() {
    const _ = this;
    _.t = this.$services.localeService.D();
    
  },
  mounted() {
    this.$nextTick();
    this.load();
  }
};
</script>

<style  lang="scss">
@import "../styles/media";

#app{
  position:relative;
}
#main-frame{
  //
}

#top-frame{
  position:absolute;
  top:0;
  left:0;
  display:flex;
  background-color: rgba(0,0,0,.5);
  width:100%;

}

#mini{

}

#control{
  
}

#display{
  
}

</style>

<template>
  <div id="main-frame"></div>
  <div id="top-frame">
    <div id="mini"></div>
    <div id="controls">
      <div class="control" id="control-l">L</div>
      <div class="control center" id="control-c">c</div>
      <div class="control" id="control-r">R</div>
    </div>
    <div id="display">display</div>
  </div>
  
</template>