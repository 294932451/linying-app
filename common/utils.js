export function goToPage(url, data = null, type = 1) {
	if (data) {
		const query = Object.keys(data)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
			.join('&');
		// 如果 URL 已经有 `?`，则用 `&` 连接，否则用 `?`
		url += url.includes('?') ? '&' : '?';
		url += query;
	}
	switch (type) {
		case 1:
			uni.navigateTo({
				url: url,
				success() {},
				fail(err) {}
			});
			break;
		case 2:
			uni.redirectTo({
				url: url,
				success() {},
				fail(err) {}
			});
			break;
	}

}