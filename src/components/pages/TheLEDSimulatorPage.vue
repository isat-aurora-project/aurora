<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="mx-auto" color="#B0C4DE" width="968" height="800">
          <v-card-actions>
            <v-btn 
              id="button"
              color="primary"
              class="toggle"
              @click="start_stop()" 
            >
              {{ running ? 'Stop' : 'Start' }}
            </v-btn>
          </v-card-actions>
          <div class="position">
            <div>
              <an-led-strip :leds="strip.slice(  0, 121)" class="strip1 strip-horizontal" />
              <an-led-strip :leds="strip.slice(121, 212)" class="strip2 strip-vertical"   />
              <an-led-strip :leds="strip.slice(212, 333)" class="strip3 strip-horizontal" />
              <an-led-strip :leds="strip.slice(333, 424)" class="strip4 strip-vertical"   />
            </div>
           <div>
            <monaco-editor class="editor" v-model="code" language="javascript" contenteditable="true" ></monaco-editor>
            </div>
          </div>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import { setInterval } from 'timers';
// import { scan } from '@/scripts/demo'
import MonacoEditor from "vue-monaco";
import AnLedStrip from "@/components/simulator/AnLedStrip.vue";
let text = `// DO NOT REMOVE COMMENTS!!
setup () {
  strip.map((p, i) => {
    p.color = i === 0 ? 'black': 'red'
    return p
  })
}/***END SETUP***/

loop () {
  // find out the currently "unlit" pixel in our strip
  const unlit = strip.findIndex(led => led.color === 'black')
  // turn "on" the currently unlit pixel
  strip[unlit].color = 'red'
  // figure out the next pixel
  const next = unlit + 1 === strip.length ? 0 : unlit + 1
  // turn it "off"
  strip[next].color = 'black'
}/***END LOOP***/
`

export default {
  components: {
    AnLedStrip,
    MonacoEditor,
  },

  data: () => ({
    code: text,
    intervalID: null,
    running: false,
    stop: stop,
    strip: []
  }),
  
  methods: {
    start_stop () {
      // figure out if we're starting or stopping
      if (this.running) {
        // we need to stop
        // stop the code
        clearInterval(this.intervalID)
      } else {
        // we need to start
        // get the current code from the editor
        const code = this.code
        // make sure they didn't delete the END SETUP  and END LOOP comments
        if (!code.includes('/***END SETUP***/') || !code.includes('/***END LOOP***/')) {
          // uh oh!!!
          console.log('Houston, we have a problem. (closing comments deleted)')
          return
        }
        // get the content of the setup() function in a string variable
        const getSetup = /setup ?\(.*?\)\s*\{(.*?)}\/\*\*\*END SETUP/is
        const getLoop = /loop ?\(.*?\)\s*\{(.*?)}\/\*\*\*END LOOP/is
        // get the content of the loop() function in a string variable   
        // create and run the setup() function
        const setup = code.match(getSetup)[1]
        const loop = code.match(getLoop)[1]
        
        const setupFunction = new Function('strip', setup)
        setupFunction(this.strip)
        // create the loop function and give it to setInterval
        // load into the Function that will run
        const f = new Function('strip', loop)
        // do any initialization, if necessary
        // start
        this.intervalID = setInterval(f, 200, this.strip)
      }
      // toggle this.running
      this.running = !this.running
    }
  },
  mounted: function() {
    // initialize the strip of LEDs
    this.strip = new Array(424).fill().map(el => ({ color: 'black' }))
    this.strip[0].color = 'red'
  }
};


</script>

<style>
.position {
  position: relative;
  width: 100%;
  height: 100%;
}
.editor {
  position: absolute;
  width: 968px;
  height: 712px;
  top: 4px;
  right: 0px;
}
.strip-horizontal {
  display: flex;
  justify-content: center;
}
.strip1 {
  position: absolute;
  top: -4px;
  left: 0;
}
.strip2 {
  position: absolute;
  transform: rotate(90deg);
  top: 348px;
  right: -368px;
}
.strip3 {
  position: absolute;
  transform: rotate(180deg);
  top: 716px;
  left: 0;
}
.strip4 {
  position: absolute;
  transform: rotate(270deg);
  top: 228px;
  right: 489px;
  width: 100%;
}
.button {
  background-color: #4CAF50; 
  border: 3px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
