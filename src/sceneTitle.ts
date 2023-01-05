import { GameMainParameterObject } from "./parameterObject";

function main(param: GameMainParameterObject): g.Scene {
	//------------------------------
	// シーン
	//------------------------------
	const scene = new g.Scene({
		game: g.game,
		assetIds: [],
	});
	//==============================
	// シーン読込時処理
	//==============================
	scene.onLoad.add(() => {
	});
	return scene;
}

export = main;
