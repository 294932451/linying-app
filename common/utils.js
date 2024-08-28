export function goToPage(url) {
  uni.navigateTo({
    url: url,
    success() {
      console.log('Navigation successful');
    },
    fail(err) {
      console.error('Navigation failed:', err);
    }
  });
}