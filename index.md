
<div id="sun"></div>

<div id="window">

	<div id="t1" class="tile"></div>
	<div id="t2" class="tile"></div>
	<div id="t3" class="tile"></div>
	<div id="t4" class="tile"></div>
	<div id="t5" class="tile"></div>
	<div id="t6" class="tile"></div>
	<div id="t7" class="tile"></div>
	<div id="t8" class="tile"></div>
	<div id="t9" class="tile"></div>
	<div id="t10" class="tile"></div>
	<div id="t11" class="tile"></div>
	<div id="t12" class="tile"></div>
	<div id="t13" class="tile"></div>
	<div id="t14" class="tile"></div>
	<div id="t15" class="tile"></div>
	<div id="t16" class="tile"></div>
	<div id="t17" class="tile"></div>
	<div id="t18" class="tile"></div>
	<div id="t19" class="tile"></div>
	<div id="t20" class="tile"></div>
	<div id="t21" class="tile"></div>
	<div id="t22" class="tile"></div>
	<div id="t23" class="tile"></div>

</div>

body,
html {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

body {
	background: black;
	display: flex;
	align-items: center;
	justify-content: center;
}

#sun {
	z-index: -100;
	width: calc(90vmin);
	height: calc(90vmin);
	border-radius: 50%;
	border: 3px solid yellow;
	box-shadow: 0 0 50px 20px orange;
	background-color: #ffff11;
	position: absolute;
	left: 50%;
	bottom: 50%;
	transform: translate(-50%, 50%);
	animation: rise 15s infinite;
	filter: blur(5px);
}

@keyframes rise {
	0% {
		bottom: -50%;
		box-shadow: 0 0 40px 30px orange;
	}
	15% {
		box-shadow: 0 0 30px 35px orange;
	}
	35% {
		bottom: 50%;
		box-shadow: 0 0 50px 40px orange;
	}
	50% {
		bottom: 50%;
		box-shadow: 0 0 60px 30px orange;
	}
	75% {
		box-shadow: 0 0 50px 25px orange;
	}
	100% {
		bottom: -50%;
		box-shadow: 0 0 40px 30px orange;
	}
}

#window {
	position: absolute;
	z-index: 1;
	opacity: 0.5;
	backdrop-filter: blur(20px);
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-rows: repeat(20, 1fr);
	grid-template-columns: repeat(20, 1fr);
	border: 5px solid black;
}

.tile {
	border: calc(0.005 * 100vmin) solid black;
}

#t1 {
	background-color: #f2a20c;
	grid-row: 2 / 4;
	grid-column: 1/ 21;
}

#t2 {
	background-color: #f22987;
	grid-row: 4 / 12;
	grid-column: 3 / 11;
}
#t3 {
	background-color: #2168a6;
	grid-row: 12 / 21;
	grid-column: 6 / 9;
}

#t4 {
	background-color: #118c3c;
	grid-row: 1 / 1;
	grid-column: 1 / 14;
}

#t5 {
	background-color: #f28b0c;
	grid-row: 4 / 8;
	grid-column: 1 / 2;
}

#t6 {
	background-color: #bf0436;
	grid-row: 12 / 21;
	grid-column: 1 / 6;
}

#t7 {
	background-color: #0477bf;
	grid-row: 8 / 12;
	grid-column: 1 / 3;
}

#t8 {
	background-color: #80d2f2;
	grid-row: 4 / 8;
	grid-column: 2 / 3;
}

#t9 {
	background-color: #ff7c47;
	grid-row: 1 / 1;
	grid-column: 14 / 21;
}

#t10 {
	background-color: #ffe560;
	grid-row: 4 / 11;
	grid-column: 14 / 17;
}

#t11 {
	background-color: #d9abff;
	grid-row: 11 / 17;
	grid-column: 11 / 18;
}

#t12 {
	background-color: #eaf205;
	grid-row: 18 / 21;
	grid-column: 9 / 16;
}

#t13 {
	background-color: #ffa6b5;
	grid-row: 12 / 17;
	grid-column: 9 / 11;
}

#t14 {
	background-color: #fcdec0;
	grid-row: 17 / 18;
	grid-column: 9 / 21;
}

#t15 {
	background-color: #97feaf;
	grid-row: 11 / 15;
	grid-column: 18 / 21;
}

#t18 {
	background-color: #addc4e;
	grid-row: 15 / 17;
	grid-column: 18 / 21;
}

#t16 {
	background-color: #fb796b;
	grid-row: 4 / 11;
	grid-column: 11 / 13;
}

#t17 {
	background-color: #f25050;
	grid-row: 4 / 11;
	grid-column: 13 / 14;
}

#t19 {
	background-color: #f22987;
	grid-row: 5 / 7;
	grid-column: 17 / 21;
}

#t20 {
	background-color: #04d9d9;
	grid-row: 4 / 5;
	grid-column: 17 / 21;
}

#t21 {
	background-color: #c482c1;
	grid-row: 7 / 11;
	grid-column: 17 / 21;
}

#t22 {
	background-color: #59dcb2;
	grid-row: 20 / 21;
	grid-column: 16 / 21;
}

#t23 {
	background-color: #3f649d;
	grid-row: 18 / 20;
	grid-column: 16 / 21;
}
