export default function() {
  var canvas = document.getElementById('graph');

  var saw = T("noise", {freq: 220, mul:0.15}).play();

  var fft;

  var blah = T("spectrum", {size:512, interval:100}).on("data", function() {
    fft.plot({target:canvas});
  });

  console.log(blah);
  fft = blah.listen(saw);
  console.log(fft);
}
