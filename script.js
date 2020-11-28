document.addEventListener("DOMContentLoaded",function(){
  let slider = this.getElementById("brightness");
  slider.addEventListener("input",adjustSlider);
  adjustSlider(slider);
});
function adjustSlider(e) {
  let body = document.body,
    switchLightMin = 40,
    switchLightMax = 100,
    tar = e.target || e,
    pct = +tar.value / +tar.max,
    L1 = pct * (switchLightMax - switchLightMin) + switchLightMin,
    L2 = L1 - 10,
    L3 = L1  - 37,
    L = [L1,L2,L3],
    thumbHue = 0,
    thumbSat = 0,
    thumbLightMin = 0,
    thumbLightMax = 100,
    thumbLight = -pct * (thumbLightMax - thumbLightMin) + thumbLightMax,
    thumbHSL = `${thumbHue},${thumbSat}%,${thumbLight}%`;

  if (thumbLight > 20 && thumbLight < 80) thumbLight = - 3 * pct * (thumbLightMax - thumbLightMin) + thumbLightMax;

  // update the slider shade
  L.forEach((light,i) => {
    if (light < 0)
      light = 0;
    body.style.setProperty(`--l${i + 1}`,`hsl(228,9.8%,${light}%)`);
  });
  // update the thumb icon hue
  body.style.setProperty(`--p`,`hsl(${thumbHSL})`);
  body.style.setProperty(`--pT`,`hsla(${thumbHSL},0)`);
}
