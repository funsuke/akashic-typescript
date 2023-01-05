/**
 * 配列を並び変える(フィッシャー・イェーツ)
 * @param {Array<T>} array 並び変える配列
 */
export function arrShuffle<T>(array: Array<T>): void {
	for (let i=array.length-1; i>0; i--) {
		const j = Math.floor(g.game.random.generate() * (i+1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function limit(x: number, min: number, max: number): number {
	if (x < min) return min;
	if (x > max) return max;
	return x;
}