/**
 * @description 生成随机数函数
 * @param max 最大值
 * @returns 最终随机整数
 */
export function randomIntNumber(max: number = 10) {
  return Math.floor(Math.random() * max) + 1
}

interface IbaseInfo {
  cw: number;
  ch: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  dotrad: number;
}
/**
 * @description 筛子绘制函数
 * @param ctx 
 * @param n 
 * @param baseInfo 
 */
export function drawface(ctx: CanvasRenderingContext2D, n: number, baseInfo: IbaseInfo) {
  const { cw, ch, dx, dy, dw, dh, dotrad} = baseInfo
  const draw = {
    1: () => draw1(),
    2: () => draw2(),
    3: () => draw3(),
    4: () => draw4(),
    5: () => draw5(),
    6: () => draw6()
  }
  // 2,4中需要使用到的偏移量
  const offset = 3*dotrad

  const drawRound = (x: number,y: number) => {
    ctx.beginPath()
    ctx.arc(x, y, dotrad, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()
  }
  
  const draw1 = () => {
    const dotx = dx + 0.5*dw
    const doty = dy + 0.5*dh
    drawRound(dotx, doty)
  }

  const draw2 = () => {
    const dotx1 = dx + offset
    const doty1 = dy + offset
    drawRound(dotx1, doty1)
    const dotx2 = dx + dw - offset
    const doty2 = dy + dh - offset
    drawRound(dotx2, doty2)
  }

  const draw3 = () => {
    draw1()
    draw2()
  }

  const draw4 = () => {
    draw2()
    const dotx1 = dx + dw - offset
    const doty1 = dy + offset
    drawRound(dotx1, doty1)
    const dotx2 = dx + offset
    const doty2 = dy + dh - offset
    drawRound(dotx2, doty2)
  }

  const draw5 = () => {
    draw1()
    draw4()
  }

  const draw6 = () => {
    draw4()
    ctx.beginPath()
    const dotx1 = dx + offset
    const doty1 = dy + 0.5*dw
    drawRound(dotx1, doty1)
    const dotx2 = dx + dw - offset
    const doty2 = dy + 0.5*dw
    drawRound(dotx2, doty2)
  }
  //外框绘制
  ctx.clearRect(0,0,cw,ch)
  ctx.beginPath()
  ctx.lineWidth = 5
  ctx.strokeRect(dx, dy, dw, dh)
  //点数绘制
  draw[n]()
}