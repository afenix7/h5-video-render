import {PerspectiveCamera,VideoTexture,Vector3,Scene,WebGLRenderer,MeshBasicMaterial,BoxBufferGeometry,Mesh} from "three";
import { GodRaysEffect,BloomEffect, BokehEffect, GlitchEffect,EffectComposer, EffectPass,RenderPass} from "postprocessing";
// let shader = require('./my-lovely-shader.glsl');

let vtex,cv,cam;
let scn,rd,geo,vmtl;
let composer
const v = document.querySelector('#v')
v.onloadedmetadata = e=>{
    v.play();
}; 
let draw = ()=>{
    rd.render(scn,cam);
    composer.render()
    window.requestAnimationFrame(draw);
};
let init_video = async ()=>{
    let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false}).catch(e=>console.log(e))
    v.srcObject = stream
}
let init_btn = ()=>{
    const list = document.querySelectorAll(".fx-item")
    list.forEach(it=>{
      it.addEventListener('click',e=>{
          apply_fx(e.target.innerText)
      })  
    })
}
let init_render = ()=>{
    cv = window;
    vtex = new VideoTexture(v);
    cam = new PerspectiveCamera(45,cv.innerWidth/cv.innerHeight,1,1000);
    cam.position.z = 12;
    cam.lookAt(new Vector3(0,0,0));
    scn = new Scene();
    rd = new WebGLRenderer({
        powerPreference:"high-performance",
        antialias: false,
        stencil: false,
        depth: false
    });
    rd.setSize(cv.innerWidth,cv.innerHeight);
    vmtl = new MeshBasicMaterial({map:vtex});
    geo = new BoxBufferGeometry(20,10,1);
    scn.add(new Mesh(geo,vmtl));
    document.body.appendChild(rd.domElement);
    composer = new EffectComposer(rd)
    composer.addPass(new RenderPass(scn, cam));
    draw();
}
let bloomOn = false, glitchOn = false, bokehOn = false
const bloomPass = new EffectPass(cam, new BloomEffect())
const glitchPass = new EffectPass(cam,new GlitchEffect())
const bokehPass = new EffectPass(cam,new BokehEffect())
let apply_fx = name=>{
    if(name=='Bloom'){
        !bloomOn?composer.addPass(bloomPass):composer.removePass(bloomPass)
        bloomOn = !bloomOn
    }
    else if(name=='Glitch'){
       !glitchOn? composer.addPass(glitchPass):composer.removePass(glitchPass)
       glitchOn = !glitchOn
    }
    else if(name=='Bokeh'){
        !bokehOn?composer.addPass(bokehPass):composer.removePass(bokehPass)
        bokehOn = !bokehOn
    }
}
window.onresize = e=>{
    cam.aspect = cv.innerWidth / cv.innerHeight;
    cam.updateProjectionMatrix();
    rd.setSize(cv.innerWidth, cv.innerHeight);
}
window.onabort = e=>{
    composer.removeAllPasses()
    console.log("abort:"+e)
}
init_video()
init_btn()
init_render()
