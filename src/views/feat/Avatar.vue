<template>
  <div class="flex m-10">
    <img src="~/assets/images/avatar2.png" />
    <div class="d3"></div>
  </div>
</template>

<style lang="scss" scoped>
.d3 {
  margin-left: 100px;

  transform-style: preserve-3d;
  transform: perspective(450px);
  position: relative;
  width: 200px;
  height: 200px;
  background-color: lightpink;
  border-radius: 100%;
}

.d3::before {
  display: block;
  position: absolute;
  bottom: 0;

  content: '';
  width: 100%;
  height: 100%;
  border: 6px solid green;
  border-radius: 100%;
  transition: transform 0.15s ease-in-out;
  transform-style: preserve-3d;
  perspective: 450px;
  translate: 0 0 30px;
}

.d3::after {
  content: '';
  position: absolute;
  background: url(~/assets/images/avatar2.png) no-repeat center 100%;
  background-size: 90%;
  width: 100%;
  height: 100%;
  border-radius: 0 0 900px 900px;
  display: block;
  left: 0;
  bottom: 0;
  transform: rotateX(-10deg);
  transform-origin: 50% 60%;
  transition: 0.15s ease-in-out;
  translate: 0 0 30px;
}

// 悬停状态
.d3:hover::after {
  width: 95%;
  height: 115%;
  left: 2.5%;
  background-size: 115%;
}
.d3:hover::before {
  transform: scale(0.95) translateY(2.5%);
}

img {
  --s: 200px; /* image size */
  --b: 6px; /* border thickness */
  --c: var(--el-color-danger); /* border color */
  --cb: #e9ecef; /* background color */
  --f: 1; /* initial scale */

  box-sizing: content-box;
  width: var(--s);
  height: var(--s);
  aspect-ratio: 1;
  padding-top: calc(var(--s) / 5);
  cursor: pointer;
  border-radius: 0 0 999px 999px;
  --_g: 50% / calc(100% / var(--f)) 100% no-repeat content-box;
  --_o: calc((1 / var(--f) - 1) * var(--s) / 2 - var(--b));
  outline: var(--b) solid var(--c);
  outline-offset: var(--_o);
  background: radial-gradient(
      circle closest-side,
      var(--cb) calc(99% - var(--b)),
      var(--c) calc(100% - var(--b)) 99%,
      #0000
    )
    var(--_g);
  -webkit-mask: linear-gradient(#000 0 0) no-repeat 50% calc(1px - var(--_o)) /
      calc(100% / var(--f) - 2 * var(--b) - 2px) 50%,
    radial-gradient(circle closest-side, #000 99%, #0000) var(--_g);
  transform: scale(var(--f));
  transition: 0.5s;
}
img:hover {
  --f: 1.2; /* hover scale */
}
</style>
