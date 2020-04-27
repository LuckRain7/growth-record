window.addEventListener('DOMContentLoaded', _ => {
	let navBox = document.getElementById('navBox');

	//=>渲染队列机制导致引发一次回流（读写分离）
	// navBox.style.width = '100px';
	// navBox.style.height = '100px';
	// console.log(navBox.clientWidth);

	//=>触发两次
	// navBox.style.width = '100px';
	// console.log(navBox.clientWidth);
	// navBox.style.height = '100px';

	//=>10次回流
	/* for (let i = 0; i < 10; i++) {
		let span = document.createElement('span');
		navBox.appendChild(span);
	} */

	/* let frag = document.createDocumentFragment();
	for (let i = 0; i < 10; i++) {
		let span = document.createElement('span');
		frag.appendChild(span);
	}
	navBox.appendChild(frag); */

	// let str = ``;
	// for (let i = 0; i < 10; i++) {
	// 	str += `<span></span>`;
	// }
	// navBox.innerHTML = str;

});