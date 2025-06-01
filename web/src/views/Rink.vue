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
      this.$services.toolService.centerFirst();
    },
    nextGame: function () {
      this.$services.toolService.nextGame();
    },
    load: function () {
      const _ = this;
      this.$services.toolService.flow_prepare();
      const mainFrame = document.querySelector("#main-frame");
      mainFrame.addEventListener("dblclick", function () {
        _.$services.toolService.fullScreen();
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
  },
};
</script>

<style  lang="scss">
@import "../styles/media";

#app {
  position: relative;
}

.info-panel {
  position: absolute;
  top: 10px;
  right: 10px;
}

.toolbar {
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  gap: 20px;
}

.tool {
  &.full {
    flex: 1;
  }

  input {
    width: 100%;
  }

  button {
    background-color: #007bff;
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

.team-wrapper {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 3px 11px;
  border-radius: 5px;
  display: flex;
  gap: 7px;
  align-items: center;

  .team {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    &[data-team="home"] {
      background-color: red;
    }
    &[data-team="guest"] {
      background-color: white;
    }
  }
}


.top-rink {
      position: absolute;
      top:0;
      left:0;
      padding:5px;
      background: #1a1a1a;
      border: 2px solid #ccc;

    .players-wrapper{
      position: relative;
      height: calc(45px * 7);   
      width: calc(27px * 7);  
    }

    .line{
      position: absolute;
      width:50%;
      height:50%;
      border: 1px solid grey;

      &.tl{ top:0; left:0}
      &.tr{top:0; right:0}
      &.bl{bottom:0; left:0}
      &.br{bottom:0; right:0}
    }


    .player {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .is-first{
      border:2px solid yellow;
    }

    .home { background: red; }
    .guest { background: white; }
}


</style>

<template>
  <div id="main-frame"></div>

  <div  class="top-rink">
    <div class="line tl"></div>
    <div class="line tr"></div>
    <div class="line bl"></div>
    <div class="line br"></div>
    <div id="top-rink" class="players-wrapper"></div>
   
  </div>

  <div class="info-panel">
    <div class="team-wrapper" :data-team="$services.toolService.team">
      <div class="team" :data-team="$services.toolService.team"></div>
      {{ $services.toolService.team }}
    </div>
    <div id="display"></div>
  </div>

  <div class="toolbar">
    <div class="tool">
      <button v-on:click="centerFirst()">Reset</button>
    </div>
    <div class="tool full">
      <input type="range" id="cam-slider" min="-180" max="180" value="0" />
    </div>
    <div class="tool"><button v-on:click="nextGame()">Next game</button></div>
  </div>
</template>