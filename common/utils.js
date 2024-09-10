export function goToPage(url,type=1) {
	switch(type) {
		case 1:
		uni.navigateTo({
		  url: url,
		  success() {
		  },
		  fail(err) {
		  }
		});
		break;
		case 2:
		uni.redirectTo({
		  url: url,
		  success() {
		  },
		  fail(err) {
		  }
		});
		break;
	}

}