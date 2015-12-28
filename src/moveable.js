export default class Moveable {
  constructor(stage, options) {
    if (options.isContainer) {
      this.entity = new createjs.Container();
    } else {
      this.entity = new createjs.Shape();
      this.graphics = this.entity.graphics;
    }
    this.entity.width = options.width || options.size;
    this.entity.height = options.height || options.size;
    if (options.x) this.entity.x = options.x;
    if (options.y) this.entity.y = options.y;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
    this.r = options.r || 0;
    this.entity.r = options.r || 0;
    this.aabb = options.aabb;

    this.isBounded = options.isBounded;
    this.isCircleBounded = options.isCircleBounded;
    stage.addChild(this.entity);
  }

  moveTo(x, y) {
    if (!isNaN(parseFloat(x)) && isFinite(x)) {
      this.entity.x = x;
    }
    if (!isNaN(parseFloat(y)) && isFinite(y)) {
      this.entity.y = y;
    }
  }

  moveBy(x, y) {
    if (x) {
      this.entity.x += x;
      if (this.isBounded) {
        if (this.entity.x < this.aabb[0]) {
          this.entity.x = this.aabb[0];
        } else if (this.entity.x + this.entity.width > this.aabb[2]) {
          this.entity.x = this.aabb[2] - this.entity.width;
        }
      } else if (this.isCircleBounded) {
        if (this.entity.x - this.r < this.aabb[0]) {
          this.entity.x = this.aabb[0] + this.r;
        } else if (this.entity.x + this.r > this.aabb[2]) {
          this.entity.x = this.aabb[2] - this.r;
        }
      }
    }
    if (y) {
      this.entity.y += y;
      if (this.isBounded) {
        if (this.entity.y < this.aabb[1]) {
          this.entity.y = this.aabb[1];
        } else if (this.entity.y + this.entity.height > this.aabb[3]) {
          this.entity.y = this.aabb[3] - this.entity.height;
        }
      } else if (this.isCircleBounded) {
        if (this.entity.y - this.r < this.aabb[1]) {
          this.entity.y = this.aabb[1] + this.r;
        } else if (this.entity.y + this.r > this.aabb[3]) {
          this.entity.y = this.aabb[3] - this.r;
        }
      }
    }
  }

  move(delta) {
    delta = delta || 16;
    this.moveBy(this.dx * delta / 100, this.dy * delta / 100);
  }

  isOnBoundary() {
    return (this.entity.x <= this.aabb[0] ||
      this.entity.x >= this.aabb[2] ||
      this.entity.y <= this.aabb[1] ||
      this.entity.y >= this.aabb[3]);
  }
}
