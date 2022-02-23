// 改行文字で折り返し
function WrapLF(arr){
	let result_array = [];
	for(var i = 0; i < arr.length; i++){
		let splited = arr[i].split("\n");
		Array.prototype.push.apply(result_array, splited)
	}
	return result_array;
}
// アルファベットの時は改行ロジックを変更
function WrapAlphabetic(arr){}


// 文字数で折り返し
function WrapLength(arr, length){
	let result_array = [];
	let regexp = new RegExp(".{1," + length + "}", "g");
	for(var i = 0; i < arr.length; i++){
		if(arr[i].length >= length){
			var splited = arr[i].match(regexp);
			Array.prototype.push.apply(result_array, splited)
		}
	}
	return result_array;
}



// 他タスク
// 句読点が先頭に来ているとき改行
// 先頭にスペースがある場合改行


// 転び字を実装
// 鏡文字を実装
// トップ文字を大きくするやつを実装

// フォント・文字サイズ設定を実装
// CSS調整


function ArticleCanvas(ctx, x, y, text){
	if(typeof ctx != 'object' || typeof x != 'number' || typeof y  != 'number'){
		throw '必要な値がないか、形式が正しくありません';
	}

	let textwidth = 700;
	let fontsize = 18;
	let fonttipe = 'inherit';

	// 折り返し処理
	let text_arr = [];
	text_arr.push(text);

	text_arr = WrapLF(text_arr);

	let chara_length = Math.floor(textwidth / fontsize);
	text_arr = WrapLength(text_arr, chara_length);

	// 出力
	let position_x = x;
	let position_y = y;
	for(var i = 0; i < text_arr.length; i++){
		if(i != 0){
			position_y = position_y + fontsize;
		}
		ctx.font = `${fontsize}px "${fonttipe}"`;
		ctx.fillText(text_arr[i], position_x, position_y, textwidth );
	}
}