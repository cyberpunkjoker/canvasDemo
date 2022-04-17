<template>
  <canvas ref="diceCanvas" width="400" height="300"></canvas>
  <button @click="throwDice">掷骰子</button>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import * as configFn from "./config/index";

const { randomIntNumber, drawface } = configFn;

const diceCanvas: HTMLCanvasElement = ref(null);
const baseInfo = {
  cw: 400, //画布宽
  ch: 300, //画布高
  dx: 50,  //外盒起点x轴
  dy: 50,  //外盒起点y轴
  dw: 100, //骰子宽
  dh: 100, //骰子高
  dotrad: 6, //圆点半径
};

onMounted(() => {
  renderDice(1)
})

const renderDice = (num: number) => {
  const ctx: CanvasRenderingContext2D = diceCanvas.value.getContext("2d");
  drawface(ctx, num, baseInfo)
}

const throwAnimation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {renderDice(1)}, 50)
    setTimeout(() => {renderDice(2)}, 100)
    setTimeout(() => {renderDice(3)}, 150)
    setTimeout(() => {renderDice(4)}, 200)
    setTimeout(() => {renderDice(5)}, 250)
    setTimeout(() => {renderDice(6)}, 300)
    setTimeout(resolve, 400)
  })
}

const throwDice = () => {
  const randomNum = randomIntNumber(6);
  throwAnimation().then(() => {
    renderDice(randomNum)
  })
}
</script>