<template>
  --jumpBall Game--
  <canvas ref="jumpBall" width="400" height="300"></canvas>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { drawJumpBall } from './config'

const jumpBall = ref(null)

const speedInfo = reactive({
  vx: 4,  // 水平速度
  vy: 8,  // 垂直速度
})

onMounted(() => {
  renderBall()
})

const renderBall = () => {
  const ctx: CanvasRenderingContext2D = jumpBall.value.getContext('2d')
  drawJumpBall(ctx)
}

</script>

