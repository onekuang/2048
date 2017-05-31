var board = new Array();
var score = 0;
var bood =new Array();


// 页面加载完执行函数
$(document).ready(function() {
	newgame();
});



function newgame(){
	// 初始化棋盘
	init();
	// 随机生成两个格子生成数字
	shengChengOneNumber();
	shengChengOneNumber(); 
}



// 设置初始化棋盘的函数
function init(){
	for(var i=0; i<4 ;i++)
		for(var j=0;j<4;j++){
	// 通过循环获许到格子的ID;
		var gridcell=$("#grid-cell-"+i+"-"+j);


		// 利用函数获取格子的 位置;函数在底层;
		gridcell.css("top",getPosTop(i,j));
		gridcell.css("left",getPosLeft(i,j));

	}

// 初始化的时候定义了board为一维数组,
// 将一纬数组转成二纬数组
// 并初始值为0
	for(var i=0;i<4;i++){
		board[i]=new Array();
		bood[i] =new Array();
		for(var  j=0 ; j < 4 ; j ++){
			board[i][j]=0;
			bood[i][j]=false;
		}

	}
	updateBoardView();
}
	

	function updateBoardView(){
		$(".number-cell").remove();
		for(var i=0;i<4;i++)
			for(var j=0; j<4;j++){
				$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
				var theNumberCell=$('#number-cell-'+i+'-'+j);
	
				if(board[i][j]==0){
					theNumberCell.css('width','0px');
					theNumberCell.css('height','0px');
					theNumberCell.css('top',getPosTop(i,j)+50);
					theNumberCell.css('left',getPosLeft(i,j)+50);
				}
				else{
					theNumberCell.css('width','100px');
					theNumberCell.css('height','100px');
					theNumberCell.css('top',getPosTop(i,j));
					theNumberCell.css('left',getPosLeft(i,j));
					theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
					theNumberCell.css('color',getNumberColor(board[i][j]));
					theNumberCell.text(board[i][j]);
				
				}
				bood[i][j]=false;
			}
	}



function shengChengOneNumber(){
	if(nospace(board))
		return false;
	

	// 随机一个位置

	// 随机一个0-4之间的浮点数,有小数
	// var randx = Math.random()*4 

	// 将浮点数向下取整,无小数
	// var randx = Math.floor(Math.random()*4)

	// 向下取整后转成整型 可以代用
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));

	// 判断位置是否可以生成
	var times = 0;
	while(times <50){
		if(board[randx][randy]==0) //判断位置是否可以生成
			break;
		// 如果不能循环则在随机一次xy
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if(times==50){
		for(var i =0 ;i<4 ;i++)
			for(var j =0; j<4 ;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
	}

	// 随机生成一个数字

	// Math.random()是生成一个0-1的随机数字.小数点17位
	// 如果数字小于0.5 则生成2,否则4
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	// 随机位置显示随机数字
	board[randx][randy]=randNumber;

	showNumberWithAnimation(randx,randy,randNumber);

	return true;

}


	// keydown()玩家按下按键时的操作
$(document).keydown(function(event){
	switch(event.keyCode){ //循环判断玩家按的是什么键
		case 37: 		//37是左键
			if(muveLeft()){
				shengChengOneNumber();
				isgameover();
			}

			break;

		case 38	: 		//38是上键 	
			if(moveUp()){
				shengChengOneNumber();
				isgameover();
			}
			break;

		case 39	: 		//39是右键
			if(muveRight()){
				shengChengOneNumber();
				isgameover();
			}
			break;

		case 40: 		//40是下键
			if(muveDown()){
				shengChengOneNumber();
				isgameover();
			}
			break;

		default:
			break;
	}
});

function isgameover(){

}

function muveLeft(){
	if(!canMoveLeft(board))
		return false;
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){

				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlock(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlock(i,k,j,board)&& !bood[i][k]){

						showMoveAnimation(i,j,i,k);

						board[i][k] += board[i][j];

						board[i][j]=0;

						bood[i][k]=true;
						continue;
					}
				}
			}
		}	
	setTimeout("updateBoardView()",200);
	return true;
}

function muveRight(){
	if(!canMoveRight(board))
		return false;
	for(var i=0 ; i<4 ; i++)
		for(var j=2; j>=0;j--){
		if(board[i][j]!=0){
			for(var k=3;k>j;k--){
				if(board[i][k]==0 && noBlockYou(i,k,j,board)){
					showMoveAnimation(i,j,i,k);
					board[i][k]=board[i][j];
					board[i][j]=0;
					continue;
				}
				else if(board[i][k]==board[i][j]&&noBlockYou(i,k,j,board)&&!bood[i][k]){
					showMoveAnimation(i,j,i,k);
					board[i][k]+= board[i][j];
					board[i][j]=0;
					bood[i][k]=true;
					continue;
				}
			}
		}
	}
	setTimeout("updateBoardView()",200)
	return true;
}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	for(var i =1; i<4 ; i++)
		for(var j =0; j<4 ;j++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockUp(i,k,j,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockUp(i,k,j,board)&&!bood[i][k]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						bood[i][k]=true;
						continue;
					}
				}
			}
		}
		setTimeout("updateBoardView()",200);
		return true;
 }




function muveDown(){
	if(!canMoveDown(board))
		return false;
		for(var i=2; i>=0;i--)
			for(var j=0; j<4;j++){
				if(board[i][j]!=0){
					for(var k=3; k>i;k--){
						if(board[k][j]==0&& noBlockXia(j,k,i,board)){
							showMoveAnimation( i , j , k , j );
							board[k][j]=board[i][j];
							board[i][j]=0;
							continue;
						}
						else if(board[k][j]==board[i][j]&&noBlockXia(j,k,i,board)&&!bood[i][k]){
							showMoveAnimation( i , j , k , j );
							board[k][j]+=board[i][j];
							board[i][j]=0;
							bood[i][k]=true;
							continue;

						}
					}
				}
			}
			setTimeout("updateBoardView()",200)
	return true;
}