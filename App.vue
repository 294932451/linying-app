<script>
	export default {
		onLaunch: function() {
			const lang = uni.getStorageSync('lang') || 'zh';  // 如果没有设置，默认使用英文
			this.$i18n.locale = lang;  // 设置语言
		
		},
		onShow: function() {
			console.log('App Show')
				checkUpdate()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
	
	// 检查更新
	function checkUpdate() {
	    uni.request({
	        url: 'http://39.98.115.211:8787/api/login/update_app', // 访问服务器上版本文件
	        success: function(res) {
	            if (res.data.code === 200) {
	                const serverVersion = res.data.data.version; // 从版本文件中读取版本号
					const isNew = res.data.data.isNew
	                if (isNew) {
	                    // 发现新版本，执行下载更新
	                    downloadWgt(res.data.data.wgtUrl); // 传入WGT文件的下载地址
	                }
	            }
	        },
	        fail: function() {
	            console.log('检查更新失败');
	        }
	    });
	}
// 下载 WGT 文件
function downloadWgt(wgtUrl) {
    plus.downloader.createDownload(wgtUrl, {}, function (download, status) {
        if (status == 200) {
            console.log('WGT文件下载成功：' + download.filename);
            installWgt(download.filename); // 下载成功后安装
        } else {
            console.log('下载WGT文件失败');
        }
    }).start();
}

// 安装 WGT 文件
function installWgt(path) {
    plus.runtime.install(path, {}, function () {
        uni.request({
        	url:'http://39.98.115.211:8787/api/login/update_app',
			success: (res) => {
				if(res.data.code === 200) {
					plus.nativeUI.alert('新版本更新完成咯~', function() {
					    plus.runtime.restart(); // 安装成功后重启应用
					});
				}else{
					plus.nativeUI.alert('更新异常', function() {
					    plus.runtime.restart(); // 安装成功后重启应用
					});
				}
			}
        })
       
    }, function (e) {
        console.log('安装WGT文件失败：' + e.message);
    });
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	a {
		text-decoration: none;
		color: #777;
		transition: all .15s;
	}
</style>