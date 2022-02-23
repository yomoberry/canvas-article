// 改行文字で折り返し＆段落の先頭にスペース
function WrapLF(arr){
	let result_array = [];
	for(var i = 0; i < arr.length; i++){
		let splited = arr[i].split("\n");
		// 段落の先頭にスペース
		for(var j = 0; j < splited.length; j++){
			if(splited[j].length > 0){
				splited[j] = `　${splited[j]}`;
			}
		}
		Array.prototype.push.apply(result_array, splited);
	}
	return result_array;
}
// アルファベットの時は改行ロジックを変更
function WrapAlphabetic(arr){
	let result_array = [];
	for(var i = 0; i < arr.length; i++){
		// console.log(arr[i]);

		let retus = arr[i].match(/セントエルモ/);
		// console.log(retus);

		// it:Cattedrale dei Santi Erasmo e Marciano e di Santa Maria Assunta
		// The Rime of the Ancient Mariner


		// Array.prototype.push.apply(result_array, arr[i]);
		result_array.push(arr[i]);
	}
	return result_array;
}

// 文字数で折り返し＆句読点が先頭に来ているとき改行
function WrapLength(arr, length){
	let result_array = [];
	let regexp = new RegExp(".{1," + length + "}", "g");
	for(var i = 0; i < arr.length; i++){
		if(arr[i].length >= length){
			var splited = arr[i].match(regexp);
			// 句読点が先頭に来ているとき改行
			for(var j = 0; j < splited.length; j++){
				let laststr = splited[j].slice(0, 1);
				if(j > 0 && ["。", "、"].includes(laststr)){
					splited[j-1] = `${splited[j-1]}${splited[j].slice(0, 1)}`;
					splited[j] = splited[j].slice(1);
				}
			}
			Array.prototype.push.apply(result_array, splited);
		}
	}
	return result_array;
}


// 他タスク

// 転び字を実装
// 鏡文字を実装
// トップ文字を大きくするやつを実装

// フォント・文字サイズ設定を実装


function ArticleCanvas(ctx, x, y, text){
	if(typeof ctx != 'object' || typeof x != 'number' || typeof y  != 'number' || typeof text  != 'string'){
		throw '必要な値がないか、形式が正しくありません';
	}

	let textwidth = 700;
	let fontsize = 18;
	let fonttipe = 'inherit';

	// 折り返し処理
	let text_arr = [text];
	text_arr = WrapLF(text_arr);

	text_arr = WrapAlphabetic(text_arr);

	let chara_length = Math.floor(textwidth / fontsize);
	text_arr = WrapLength(text_arr, chara_length);

	console.log(text_arr);

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