<template>
  <div class="grid grid-cols-4 gap-4 m-4">
    <div class="bg-blue-500">
      <GsapNumber :from="0" :to="290" />
    </div>
    <div class="bg-red-500">
      <GsapNumber :from="0" :to="11456" />
    </div>
    <div class="bg-pink-500">
      <GsapNumber :from="0" :to="367" />
    </div>
    <div class="bg-green-500">
      <GsapNumber :from="0" :to="56789" />
    </div>

    <div class="bg-blue-500">
      <GsapNumber :from="1230" :to="0" />
    </div>
    <div class="bg-red-500">
      <GsapNumber :from="30" :to="0" />
    </div>
    <div class="bg-pink-500">
      <GsapNumber :from="870" :to="0" />
    </div>
    <div class="bg-green-500">
      <GsapNumber :from="3404" :to="0" />
    </div>
  </div>
</template>

<style scoped>
.grid > div {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #fff;
}
</style>
