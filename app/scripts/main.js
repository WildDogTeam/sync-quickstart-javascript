<!-- 创建 Wilddog Sync 实例 -->
var config = {
  // 将 wild-rat-39764 替换成你自己的 AppID
  syncURL: "https://wild-rat-39764.wilddogio.com/"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

//disccus container
var listContent = document.getElementsByClassName('discuss-list')[0];

//insert discuss
function createDisscus (content, presenter) {
	var li = document.createElement('li');
		li.className = 'discuss-item clearfix';
	var discussContent = document.createElement('div');
		discussContent.className = 'pull-left discuss-content';
	var discussPresenter = document.createElement('div');
		discussPresenter.className = 'pull-left discuss-presenter';
	li.appendChild(discussContent);
	li.appendChild(discussPresenter);
	discussContent.textContent = content;
	discussPresenter.textContent = presenter;
	listContent.appendChild(li);
}

// discuss show container
var discussShow = document.getElementsByClassName('discuss-details')[0];

// discuss content to submit
var discussContentInput = document.getElementById('discuss-content');

// discuss presenter
var discussPresenterInput = document.getElementById('discuss-presenter');

//submit button
var submitBtn = document.getElementById('discuss-submit');

// submit discuss
function submitDisscus () {
	var content = discussContentInput.value;
	var presenter = discussPresenterInput.value;
	if (!content || !presenter) {
		return false
	} else {
		// push() 方法可以写入数据。更多写入方式请参考文档。
		ref.child("messageboard").push({
			content: content,
			presenter: presenter
		}).then(function () {
			discussContentInput.value = '';
			discussPresenterInput.value = '';
		})
	}
}

//submit listener
submitBtn.addEventListener('click', function () {
	submitDisscus();
})

<!-- 使用 on() 或 once() 方法可以读取并监听数据。-->
// 'child_added'是 Child 事件的一种，此外还可以设置 Value 事件
ref.child("messageboard").on('child_added', function (snap) {
	var val = snap.val();
	createDisscus(val.content, val.presenter);
    discussShow.scrollTop = discussShow.scrollHeight;
});
