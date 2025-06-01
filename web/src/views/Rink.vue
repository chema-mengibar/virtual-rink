Rink<script>
export default {
  name: "Rink",
  inject: ["$services"],
  data: () => ({
    t: {},
    data: null,
  }),
  methods: {
    centerFirst: function () {
      this.$services.toolService.centerFirst()
    },
    nextGame: function () {
      this.$services.toolService.nextGame()
    },
    load: function () {
      const _ = this;
      this.$services.toolService.flow_prepare();
      const mainFrame = document.querySelector('#main-frame');
      mainFrame.addEventListener('dblclick', function() {
        _.$services.toolService.fullScreen()
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
  background-color: rgba(0,0,0,.1);
  width:100%;
  display:flex;
  gap:10px;

}

#mini{
  
}

#controls{

  display:flex;
  flex-direction:column;
  flex:1;
  padding:20px;

  .row{
    flex:1;
    display:flex;
    gap:20px;
  }

  input{
    width:100%;
  }
  
  button {
    background-color: #007BFF;  
    color: white;              
    border: none;              
    padding: 10px 20px;        
    border-radius: 5px;        
    font-size: 16px;          
    cursor: pointer;          
    transition: background-color 0.3s ease; 
    &:hover {
      background-color: #0056b3; 
    }
  }
  }


#display{
  padding:7px;
}

.team-wrapper{
  border: 1px solid rgba(255,255,255, .5);
  padding: 3px 11px;
  border-radius:5px;
  display:flex;
  gap:7px;
  align-items: center;

.team{
  width:20px;
  height:20px;
  border-radius:10px;
  &[data-team="home"]{
    background-color:red;
  }
  &[data-team="guest"]{
    background-color:white;
  }
}
}



</style>

<template>
  <div id="main-frame"></div>
  <div id="top-frame">
    <div id="mini"></div>
    <div id="controls">
      <div class="row"> <input type="range" id="cam-slider" min="-180" max="180" value="0" /> </div>
      <div class="row"> 
         <div class="team-wrapper" :data-team="$services.toolService.team">
            <div class="team" :data-team="$services.toolService.team"></div>
            {{$services.toolService.team}}</div>
        
        <button v-on:click="centerFirst()">First center</button> 
        <button v-on:click="nextGame()">Next game</button> 
        
      </div>
     
     
    </div>
    <div id="display"></div>
     
  </div>
  
</template>