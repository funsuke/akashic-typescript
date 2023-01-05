// ボタン用Font
export const font = new g.DynamicFont({
	game: g.game,
	fontFamily: "monospace",
	size: 32,
	fontColor: "black",
});

/**
 * 塗りつぶされた矩形エンティティを生成
 * @param {g.Scene}	scene			属するシーン
 * @param {string}	cssColor	色		
 * @param {number}	width			幅
 * @param {number}	height		高さ
 * @returns {g.FilledRect}	矩形エンティティ
 */
export function createRect(scene: g.Scene, width: number, height: number, cssColor: string): g.FilledRect {
	return new g.FilledRect({
		scene: scene,
		cssColor: cssColor,
		width:	width,
		height:	height,
	});
}

/**
 * 幅２の線を生成
 * @param {g.Scene}	scene	属するシーン
 * @param {number}	x0 		左上のX
 * @param {number}	y0 		左上のY
 * @param {number}	x1 		右下のX
 * @param {number}	y1 		右下のY
 * @param {string}	c 		色
 */
export function createLine(scene: g.Scene, p0: g.CommonOffset, p1: g.CommonOffset, cssColor: string = "black") {
	const w = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
	const h = 1;
	const angle = Math.atan2(p1.y-p0.y, p1.x-p0.x) * 180 / Math.PI;
	let r: g.FilledRect;
	r = createRect(scene, w, h, cssColor);
	r.anchorX = 0.0;
	r.anchorY	= 0.5;
	r.x = p0.x;
	r.y = p0.y;
	r.angle = angle;
	return r;
}

export function createTriangle(
	scene: g.Scene,
	p0: g.CommonOffset, p1: g.CommonOffset, p2: g.CommonOffset, cssColor: string = "black"): g.E {
	// 親エンティティの設定
	const parent = new g.Pane({scene: scene, width: g.game.width, height: g.game.height });
	// 基本矩形を表示
	const baseRect = createRect(scene, 0, 0, cssColor);
	baseRect.x = Math.min(p0.x, p1.x, p2.x);
	baseRect.y = Math.min(p0.y, p1.y, p2.y);
	baseRect.width  = Math.max(p0.x, p1.x, p2.x) - baseRect.x;
	baseRect.height = Math.max(p0.y, p1.y, p2.y) - baseRect.y;
	parent.append(baseRect);
	// 削除用矩形
	const removeArea: g.FilledRect[] = new Array<g.FilledRect>(3);
	for (let i=0; i<3; i++) {
		removeArea[i] = createRect(scene, 0, 0, "#000000");
		removeArea[i].compositeOperation = "destination-out";
		parent.append(removeArea[i]);
	}
	const [pA, pB, pC] = toCounterClockwise(p0, p1, p2);
	updateRemoveArea(removeArea[0], pA, pB);
	updateRemoveArea(removeArea[1], pB, pC);
	updateRemoveArea(removeArea[2], pC, pA);
	return parent;
}

function updateRemoveArea(rect: g.FilledRect, p0: g.CommonOffset, p1: g.CommonOffset): void {
	const angleRad = Math.atan2(p1.y - p0.y, p1.x - p0.x);
	const size = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
	const dx = p0.x + Math.cos(angleRad - Math.PI / 2) * size;
	const dy = p0.y + Math.sin(angleRad - Math.PI / 2) * size;
	rect.x = (p1.x + dx) / 2;
	rect.y = (p1.y + dy) / 2;
	rect.width = size * 2;
	rect.height = size;
	rect.anchorX = 0.5;
	rect.anchorY = 0.5;
	rect.angle = angleRad / Math.PI * 180;
	rect.modified();
}

function toCounterClockwise(
	p0: g.CommonOffset, p1: g.CommonOffset, p2: g.CommonOffset
): [g.CommonOffset, g.CommonOffset, g.CommonOffset] {
	if (p1.x === p0.x) {
		if ((p0.y > p1.y && p0.x > p2.x) || (p0.y <= p1.y && p0.x <= p2.x)) {
			return [p1, p0, p2];
		} else {
			return [p0, p1, p2];
		}
	} else {
		const y = p0.y + (p1.y - p0.y) / (p1.x - p0.x) * (p2.x - p0.x);
		if ((y > p2.y && p1.x > p0.x) || (y <= p2.y && p1.x <= p0.x)) {
			return [p1, p0, p2];
		} else {
			return [p0, p1, p2];
		}
	}
}

/**
 * ラベルエンティティを生成
 * @param {g.Scene}	scene 属するシーン
 * @param {g.Font}	font	フォント
 * @param {string}	text	テキスト
 * @returns 
 */
export function createLabel(scene: g.Scene, font: g.Font, text: string): g.Label {
	return new g.Label({
		scene:	scene,
		font:		font,
		text:		text,
	});
}

// export class FilledRect extends E {
// 	/**
// 	 * 矩形を塗りつぶす色。
// 	 * この値を変更した場合、 `this.modified()` を呼び出す必要がある。
// 	 */
// 	cssColor: string;
// 	/**
// 	 * 各種パラメータを指定して `FilledRect` のインスタンスを生成する。
// 	 * @param param このエンティティに対するパラメータ
// 	 */
// 	constructor(param: FilledRectParameterObject) {
// 		super(param);
// 		if (typeof param.cssColor !== "string")
// 			throw ExceptionFactory.createTypeMismatchError("ColorBox#constructor(cssColor)", "string", param.cssColor);
// 		this.cssColor = param.cssColor;
// 	}
// 	/**
// 	 * このエンティティ自身の描画を行う。
// 	 * このメソッドはエンジンから暗黙に呼び出され、ゲーム開発者が呼び出す必要はない。
// 	 */
// 	renderSelf(renderer: Renderer): boolean {
// 		renderer.fillRect(0, 0, this.width, this.height, this.cssColor);
// 		return true;
// 	}
// }

/**
 * ボタンエンティティ
 */
export class Button extends g.FilledRect {
	// ボタンのテキスト
	private label:	g.Label;
	// ボタンの影
	private rectShadow:	g.FilledRect;
	// 影表示のための座標
	private point: g.CommonOffset;
	/**
	 * ボタンクラスのインスタンス生成
	 * @param scene	属するシーン
	 * @param text	表示するテキスト
	 * @param cssColor	色 
	 * @param width		幅
	 * @param height	高さ
	 */
	constructor(
		scene: g.Scene, 
		text: string = "test", 
		cssColor:	string = "white",
		width: number = 240, 
		height: number = 60) {
		// 
		super({scene: scene, cssColor: cssColor, width: width, height: height});
		this.touchable = true;
		// ボタン内のラベル(rectの子になる)
		this.label = createLabel(scene, font,	text);
		this.label.width = width;
		this.label.fontSize = font.size / 60 * height;
		this.label.widthAutoAdjust = false;
		this.label.textAlign = "center";
		this.label.y = (height - font.size) / 4;
		this.label.invalidate();
		this.append(this.label);
		// ボタンにポインタが重なった時の影
		this.rectShadow = createRect(scene, width, height, "black");
		this.rectShadow.opacity = 0.5;
		this.rectShadow.hide();
		this.append(this.rectShadow);
		// pointの初期化
		this.point = {x:-1, y:-1};
		//------------------------------
		// ボタンイベント
		//------------------------------
		this.onPointDown.add((ev) => {
			this.point = ev.point;
			this.rectShadow.show();
		});
		this.onPointMove.add((ev) => {
			this.point.x += ev.prevDelta.x;
			this.point.y += ev.prevDelta.y;
			if ( this.inArea() ) {
				this.rectShadow.show();
			} else {
				this.rectShadow.hide();
			}
		});
		this.onPointUp.add((ev) => {
			this.rectShadow.hide();
		});
	}
	// ボタン内にマウスがあるか判定する
	public inArea(): boolean {
		if ( pointInArea2(this.point, this) ) {
			return true;
		}
		return false;
	}
	// テキストを変える
	set text(text: string) {
		this.label.text = text;
	}
	public invalidate(): void {
		this.label.invalidate();
	}
	// ボタンを押したままにして操作無効にする
	public deactivate(): void {
		this.touchable = false;
		this.rectShadow.show();
	}
	public setLocal(local: boolean): void {
		if (this.children != null) {
			for (let i=0; i<this.children?.length; i++) {
				this.children[i].local = local;
			}
		}
		this.local = local;
	}
}

export class ButtonSprite extends g.Sprite {
	// マウス座標
	private point: g.CommonOffset;
	constructor(scene: g.Scene, src: string, srcX: number, srcY: number, width: number, height: number) {
		//
		super({scene: scene, src: scene.assets[src] as g.ImageAsset, srcX: srcX, srcY: srcY, width: width, height: height});
		this.touchable = true;
		// pointの初期化
		this.point = {x:-1, y:-1};
		//------------------------------
		// ボタンイベント
		//------------------------------
		this.onPointDown.add((ev) => {
			this.srcY = height;
			this.modified();
			this.point = ev.point;
		});
		this.onPointMove.add((ev) => {
			this.point.x += ev.prevDelta.x;
			this.point.y += ev.prevDelta.y;
			if ( this.inArea() ) {
				this.srcY = height;
			} else {
				this.srcY = 0;
			}
			this.modified();
		});
		this.onPointUp.add((ev) => {
			this.srcY = 0;
			this.modified();
		});
	}
	// ボタン内にマウスがあるか判定する
	public inArea(): boolean {
		if ( pointInArea2(this.point, this) ) {
			return true;
		}
		return false;
	}
	// ボタンを押したままにして操作無効にする
	public deactivate(): void {
		this.touchable = false;
		this.srcY = this.height;
		this.modified();
	}
}

/**
 * オフセットが領域内か否か(Scene用)
 * @param {g.CommonOffset}	p	判定する点
 * @param {g.CommonArea}		a	判定する領域
 * @returns {boolean}
 */
export function pointInArea(p: g.CommonOffset, a: g.CommonArea): boolean {
	if (p == null || a == null) return false;
	return !(p.x < a.x || p.x > a.x + a.width || p.y < a.y || p.y > a.y + a.height);
}

/**
 * オフセットが領域内か否か(エンティティ用)
 * @param {g.CommonOffset}	p	判定する点
 * @param {g.CommonArea}		a	判定する領域
 * @returns {boolean}
 */
 export function pointInArea2(p: g.CommonOffset, a: g.CommonArea): boolean {
	if (p == null || a == null) return false;
	return !(p.x < 0 || p.x > a.width || p.y < 0 || p.y > a.height);
}
