import { genArr, getPixRatio } from "../../utils"

interface GameCallbacks {
  onDone?: Function,
  onOver?: Function
}

type ChessType = 'black' | 'white'

class Chess {
  constructor (public row: number, public col: number, public type: ChessType) {}

  draw (ctx: CanvasRenderingContext2D, bSize: number, chessSize: number, bSpace: number) {
    const space = bSize + bSpace
    ctx.save()
    ctx.fillStyle = this.type === 'black' ? '#000' : '#fff'
    ctx.beginPath()
    ctx.arc(
      this.col * space + space / 2,
      this.row * space + space / 2,
      chessSize / 2,
      0,
      Math.PI * 2
    )
    ctx.fill()
    ctx.restore()
  }
}

class AIPlayer {
  constructor (public game: Game) {}
}

class Game {
  private ctx
  private pixRatio
  private bSize = 0
  private chessSize = 0
  private bSpace
  private readonly rows = 15
  private readonly cols = 15
  private isGameover = false
  private aiPlayer
  private chessList: Chess[] = []

  constructor (private cvs: HTMLCanvasElement, private callbacks: GameCallbacks) {
    this.ctx = cvs.getContext('2d') as CanvasRenderingContext2D
    this.pixRatio = getPixRatio(this.ctx)
    this.bSpace = this.pixRatio
    this.aiPlayer = new AIPlayer(this)
    this.addListeners()
  }

  start () {
    this.isGameover = false
    this.updateSize()
    this.drawUI()
  }

  private drawGrid () {
    const { ctx, cvs, bSize, bSpace, rows, cols } = this
    const space = bSize + bSpace
    ctx.save()
    ctx.lineWidth = bSpace
    ctx.strokeStyle = '#333'
    ctx.translate(space / 2, space / 2)
    ctx.beginPath()
    genArr(rows).forEach((_, i) => {
      ctx.moveTo(-bSpace / 2, space * i)
      ctx.lineTo(cvs.width - bSize - bSpace / 2, space * i)
      ctx.moveTo(space * i, -bSpace / 2)
      ctx.lineTo(space * i, cvs.width - bSize - bSpace / 2)
    })
    ctx.stroke()
    ctx.fillStyle = '#000'
    ;[
      { row: 3, col: 3 },
      { row: 3, col: cols - 4 },
      { row: rows - 4, col: 3 },
      { row: rows - 4, col: cols - 4 }
    ].forEach(_ => {
      ctx.beginPath()
      ctx.arc(space * _.col, space * _.row, bSize * .1, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.restore()
  }

  private drawUI () {
    const { ctx, cvs } = this
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    this.drawGrid()
    this.chessList.forEach(_ => {
      _.draw(ctx, this.bSize, this.chessSize, this.bSpace)
    })
  }

  private updateSize () {
    const width = this.cvs.offsetWidth * this.pixRatio
    this.bSize = (width - this.cols * this.bSpace) / this.cols
    this.chessSize = this.bSize * .6
    this.cvs.width = this.cvs.height = width
  }

  private getCurrent (event: MouseEvent) {
    const ex = (event.offsetX || event.pageX) * this.pixRatio
    const ey = (event.offsetY || event.pageY) * this.pixRatio
    const { bSize, bSpace } = this
    const space = bSize + bSpace
    const row = Math.round((ey - space / 2) / space)
    const col = Math.round((ex - space / 2) / space)
    if (this.chessList.some(_ => _.row === row && _.col === col)) return
    const cx = col * space + space / 2
    const cy = row * space + space / 2
    if (Math.pow(ex - cx, 2) + Math.pow(ey - cy, 2) < Math.pow(this.chessSize / 2, 2)) {
      return new Chess(row, col, 'black')
    }
  }

  private onClick (event: MouseEvent) {
    const chess = this.getCurrent(event)
    if (chess) {
      this.chessList.push(chess)
      this.drawUI()
    }
  }

  private onResize () {
    this.updateSize()
    this.drawUI()
  }

  private addListeners () {
    this.cvs.addEventListener('click', this.onClick.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  removeListeners () {
    this.cvs.removeEventListener('click', this.onClick)
    window.removeEventListener('resize', this.onResize)
  }
}

export default Game