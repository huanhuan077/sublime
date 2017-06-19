(function() {
	var Menubar = function(elementId) {
		this.eId = elementId || 'wrap';
		this.el = document.getElementById(this.eId);
		this.state = 'allClosed';
		this.el.addEventListener('click', function(e) {
			e.stopPropagation();
		});
		var self = this;
		this.currentOpenedMenuContent = null;
		this.menuList = document.querySelectorAll('#' + this.eId + '>div');
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click', function(e) {
				var menuContentEl = document.getElementById(e.currentTarget.id + '-content');
				if (self.state == 'allClosed') {
					menuContentEl.style.top = 0;
					menuContentEl.style.left='-85px';
					menuContentEl.className='nav-content';
					menuContentEl.classList.add('menuContent-move-right');
					self.state = 'hasOpened';
					console.log('打开' + menuContentEl.id);
					self.currentOpenedMenuContent = menuContentEl;
				} else {
					console.log('关闭' + self.currentOpenedMenuContent.id);
					console.log('打开' + menuContentEl.id);
					self.currentOpenedMenuContent.className = 'nav-content';
					self.currentOpenedMenuContent.style.top = '0';
					self.currentOpenedMenuContent.style.left='35px';
					self.currentOpenedMenuContent.classList.add('menuContent-move-left');
					menuContentEl.className='nav-content';
					menuContentEl.style.top='250px';
					menuContentEl.style.left='35px';
					menuContentEl.classList.add('menuContent-move-up');
					self.currentOpenedMenuContent = menuContentEl;

				}
			})
		};
		this.menuContentList=document.querySelectorAll('.nav-content > div.nav-con-close');
		for(i=0;i<this.menuContentList.length;i++){
			this.menuContentList[i].addEventListener('click',function(e){
				var menuContent=e.currentTarget.parentNode;
					menuContent.className='nav-content';
					menuContent.style.top='0';
					menuContent.style.left='35px';
					menuContent.classList.add('menuContent-move-left');
			})
		}
	};
	var Sidebar = function(elementId, closeBarId) {
		this.eId = elementId || 'sidebar';
		this.el = document.getElementById(this.eId);
		this.closeBarEl = document.getElementById('closeBar' || closeBarId);
		this.state = 'opened';
		var self = this;
		this.menubar = new Menubar();
		this.el.addEventListener('click', function(evt) {
			if (evt.target != self.el) {
				self.triggerSwitch();
			}
		})
	};
	Sidebar.prototype.close = function() {
		this.state = 'closed';
		this.el.className='sidebar-move-left';
		this.closeBarEl.className='closeBar-move-right';
	};
	Sidebar.prototype.open = function() {
		this.state = 'opened';
		this.el.style.left='-120px';
		this.el.className='sidebar-move-right';
		this.closeBarEl.style.left='160px';
		this.closeBarEl.className='closeBar-move-left';

	};
	Sidebar.prototype.triggerSwitch = function() {
		if (this.state == 'opened') {
			this.close();
		} else {
			this.open();
		}
	};
	var sidebar = new Sidebar();


})();