const getImage = () => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = '/src/assets/darksoul.jpg'
    img.onload = () => {
      resolve(img)
    }
  })
}

export const drawInfo = {
  boxx: 20,  //盒子起始位置 x
  boxy: 30,  //盒子起始位置 y
  boxw: 350, //盒子宽
  boxh: 250, //盒子高
  bollr: 10, //球半径
  bollx: 50, //球初始位置 x
  bolly: 60, //球初始位置 y
  hue: [     //边框颜色渐变组
    [255, 0, 0],
    [255, 255, 0],
    [0, 255, 0],
    [0, 255, 255],
    [255, 0, 255],
  ],
  getBound: function(type: 'top' | 'bottom'| 'left'| 'right') { //求圆心到边框的距离
    const {boxx, boxy, boxw, boxh, bollr} = this
    const boundVal = {
      top: boxy + bollr,
      bottom: boxy + boxh - bollr,
      right: boxx + boxw - bollr,
      left: boxx + bollr,
    }
    return boundVal[type]
  },
  setBallPosition: function(type: 'bollx' | 'bolly', num: number) {
    this[type] = num
  }
}
// 基础值信息
const { boxx, boxy, boxw, boxh, bollr, bollx, bolly, hue } = drawInfo

export async function drawJumpBall(ctx: CanvasRenderingContext2D) {
  // 颜色绘制
  let grad = ctx.createLinearGradient(boxx, boxy, boxx + boxw, boxy + boxh)
  hue.forEach((i, idx) => {
    const color = `rgba(${i[0]}, ${i[1]}, ${i[2]})`
    grad.addColorStop(idx/hue.length, color)
  })
  ctx.fillStyle = grad
  ctx.lineWidth = bollr

  // 绘制边框
  ctx.fillRect(boxx, boxy + bollr, bollr, boxh) //左墙
  ctx.fillRect(boxx + boxw + bollr, boxy + bollr, bollr, boxh) //右墙
  ctx.fillRect(boxx, boxy, boxw + 2*bollr, bollr) //上墙
  ctx.fillRect(boxx, boxy + bollr + boxh, boxw + 2*bollr, bollr) //下墙

  moveBall(ctx)
  
  const image = await getImage()
  
  ctx.drawImage(image, bollx - bollr, bolly - bollr, 2*bollr, 2*bollr)

}


const moveBall = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(boxx + bollr, boxy + bollr, boxw, boxh)
  //TODO: 校验边界
  moveAndCheck()
  ctx.beginPath()
  ctx.arc(bollx, bolly, bollr, 0, Math.PI*2, true)
  ctx.lineWidth = 7
  ctx.stroke();
}


const moveAndCheck = () => {

}
