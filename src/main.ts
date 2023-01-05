// JoinとLeaveとニコ生の話
// https://akashic-games.github.io/shin-ichiba/column-join-leave.html
// https://github.com/akashic-contents/with-game-master/blob/master/src/main.ts#L17

// 以下、ラック氏(https://www.nicovideo.jp/user/523139)のコメント
// https://nicorakku.hatenablog.com/entry/ar1979578
/*
akashic init -t javascript-shin-ichiba-ranking
akashic-sandbox
akashic scan asset
bmpfont-generator --chars '0123456789' --height 48 --fill #000000 --stroke #ffffff rounded-x-mplus-1c-black.ttf bitmap.png --margin 8
ffmpeg -ss 0.0 -to 1.5 -i se.mp3 -af volume=-5dB se.ogg
ffmpeg -i input1.mp3 -i input2.mp3 -filter_complex "concat=n=2:v=0:a=1" output.mp3
akashic export html -f --output file.zip --atsumaru
akashic export html --bundle --minify --magnify --atsumaru -o game.zip
*/
/*
scene.onUpdate.add(function() {
});

function createRect() {
}

scene.setTimeout(function() {
}, 3000);

scene.setInterval(function() {
}, 500);

g.game.random.generate();

rect.onPointDown.add(function(ev) {
	let x = ev.point.x;
	let y = ev.point.y;
});
rect.onPointUp.add(function(ev) {
	rect.x += ev.startDelta.x;
	rect.y += ev.startDelta.y;
});
rect.onPointMove.add(function(ev) {
		rect.x += ev.prevDelta.x;
		rect.y += ev.prevDelta.y;
});
scene.onPointDownCapture.add(function(ev) {
});

if (soundState) scene.assets["se_start"].play().changeVolume(1);

let sprite  = new g.Sprite({
		scene: scene, src: scene.assets["tutorial"], parent: buttonLayer,
		x: g.game.width/2, y: g.game.height/2,
		anchorX: 0.5, anchorY: 0.5, opacity: 1,
});
let fSprite = new g.FrameSprite({
	scene: scene, src: scene.assets[""], parent: touchLayer,
	x: g.game.width/2, y: g.game.height, scaleX: 1, scaleY: 1,
	width: 200, height: 200, srcWidth: 200, srcHeight: 200, frames: [0, 1], interval: 150, loop: true,
	anchorX: 0.5, anchorY: 0.5, opacity: 1, touchable: false,
});

let font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	// "sans-serif": サンセリフ体・ゴシック体のフォント。
	// "serif": セリフ体・明朝体のフォント。
	// "monospace": 等幅フォント。
	fontWeight: "bold",	// "normal"　または　"bold"
	size: 96, fontColor: "black", strokeWidth: 8, strokeColor: "white",
});
let label = new g.Label({
	scene:	scene,
	font:		font,
	text:		"",
});

let glyph = JSON.parse(scene.assets["font_round_glyphs"].data);
let font = new g.BitmapFont({
		src: scene.assets["font_round"],
		map: glyph,
		defaultGlyphWidth: 96,
		defaultGlyphHeight: 96,
});

let syncRandom = param.random;	//	g.game.random
*/

import { GameMainParameterObject } from "./parameterObject";
import sceneTitle = require("./sceneTitle");

export function main(param: GameMainParameterObject): void {
	// 次のシーンへ遷移
	g.game.pushScene(sceneTitle(param));
}
