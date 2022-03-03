let slider;

const synth = new Tone.PluckSynth();
const drum = new Tone.MembraneSynth({
  "pitchDecay" : 0.2 ,
  "octaves" : 2.2 ,
  "oscillator" : {
    "type" : "sine"
} ,
  "envelope" : {
    "attack" : 0.001 , 
    "decay" : 0.8 ,
    "sustain" : 0.01 ,
    "release" : 0.4 ,
    "attackCurve" : "exponential"
  }
});
const metal = new Tone.MetalSynth({
  "frequency" : 45 , 
  "envelope" : {
    "attack" : 0.001 ,
    "decay" : 0.4 ,
    "release" : 0.2
  } ,
  "harmonicity" : 8.5 ,
  "modulationIndex" : 40 ,
  "resonance" : 300 ,
  "octaves" : 1.5
});

const reverb = new Tone.JCReverb(0.4).toDestination();

synth.connect(reverb);
drum.connect(reverb);
metal.connect(reverb);

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);
  synth.release = 2;
  synth.resonance = 0.98;
  synth.triggerAttackRelease("C4", "8n");
  
  
  slider = createSlider(0., 1., 0.5, 0.05);
  slider.mouseReleased( ()=>{
    reverb.roomSize.value = slider.value(); 


  })
}

function draw() {
  background(250, 90, 250);
}

function keyPressed() {
  let toPlay = notes[key];
  
  synth.triggerAttackRelease(toPlay, 0.5);
  metal.triggerAttackRelease("C3", '8n', '+0.5')
  drum.triggerAttackRelease("C2", "8n", '+1');
}