<template>
	<view class="uni-calendar-item__weeks-box" :class="{
		'uni-calendar-item--disable':weeks.disable,
		'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
		'uni-calendar-item--checked':(calendar.fullDate === weeks.fullDate && !weeks.isDay) ,
		'uni-calendar-item--before-checked':weeks.beforeMultiple,
		'uni-calendar-item--multiple': weeks.multiple,
		'uni-calendar-item--after-checked':weeks.afterMultiple,
		}" @click="choiceDate(weeks)">
		<view class="uni-calendar-item__weeks-box-item">
			<!-- <text v-if="selected&&weeks.extraInfo" class="uni-calendar-item__weeks-box-circle"></text> -->
			<text v-if="selected&&weeks.extraInfo&&weeks.extraInfo.info=='经期'"
				class="uni-calendar-item__weeks-box-circle"></text>
				<text v-if="selected&&weeks.extraInfo&&weeks.extraInfo.data && weeks.extraInfo.data.data_info"
					class="uni-calendar-item__weeks-box-circle"></text>
			<text class="uni-calendar-item__weeks-box-text" :class="{
				'uni-calendar-item--isDay-text': weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.date}}</text>

			<text v-if="!lunar&&!weeks.extraInfo && weeks.isDay" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				}">{{todayText}}</text>
			<text v-if="lunar&&!weeks.extraInfo" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.isDay ? todayText : (weeks.lunar.IDayCn === '初一'?weeks.lunar.IMonthCn:weeks.lunar.IDayCn)}}</text>
			<text v-if="weeks.extraInfo&&weeks.extraInfo.info" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--extra':weeks.extraInfo.info=='经期',
				'uni-calendar-item--extra1':weeks.extraInfo.data && weeks.extraInfo.data.type==1,
				'uni-calendar-item--extra2':weeks.extraInfo.data && weeks.extraInfo.data.type==2,
				'uni-calendar-item--extra3':weeks.extraInfo.data && weeks.extraInfo.data.type==3,
				'uni-calendar-item--extra4':weeks.extraInfo.data && weeks.extraInfo.data.type==4,
				'uni-calendar-item--extra5':weeks.extraInfo.data && weeks.extraInfo.data.type==5,
				'uni-calendar-item--extra6':weeks.extraInfo.data && weeks.extraInfo.data.type==6,
				'uni-calendar-item--extra7':weeks.extraInfo.data && weeks.extraInfo.data.type==7,
				'uni-calendar-item--extra8':weeks.extraInfo.data && weeks.extraInfo.data.type==8,
				'uni-calendar-item--extra9':weeks.extraInfo.data && weeks.extraInfo.data.type==9,
				'uni-calendar-item--extra10':weeks.extraInfo.data && weeks.extraInfo.data.type==10,
				'uni-calendar-item--extra11':weeks.extraInfo.data && weeks.extraInfo.data.type==11,
				'uni-calendar-item--extra12':weeks.extraInfo.data && weeks.extraInfo.data.type==12,
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.extraInfo.info}}</text>
		</view>
	</view>
</template>

<script>
	import {
		initVueI18n
	} from '@dcloudio/uni-i18n'
	import i18nMessages from './i18n/index.js'
	const {
		t
	} = initVueI18n(i18nMessages)

	export default {
		emits: ['change'],
		props: {
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			todayText() {
				return t("uni-calender.today")
			},
		},
		methods: {
			choiceDate(weeks) {
				this.$emit('change', weeks)
				console.log(weeks);
			}
		}
	}
</script>

<style lang="scss" scoped>
	$uni-font-size-base: 14px;
	$uni-text-color: #333;
	$uni-font-size-sm: 12px;
	$uni-color-error: #e43d33;
	$uni-opacity-disabled: 0.3;
	$uni-text-color-disable: #c0c0c0;
	$uni-primary: #2979ff !default;

	.uni-calendar-item__weeks-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uni-calendar-item__weeks-box-text {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
	}

	.uni-calendar-item__weeks-lunar-text {
		font-size: $uni-font-size-sm;
		color: $uni-text-color;
	}

	.uni-calendar-item__weeks-box-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
	}

	.uni-calendar-item__weeks-box-circle {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background-color: $uni-color-error;
	}

	


	.uni-calendar-item--disable {
		background-color: rgba(249, 249, 249, $uni-opacity-disabled);
		color: $uni-text-color-disable;
	}

	.uni-calendar-item--isDay-text {
		color: $uni-primary;
	}

	.uni-calendar-item--isDay {
		background-color: $uni-primary;
		opacity: 0.8;
		color: #fff;
	}

	.uni-calendar-item--extra {
		color: $uni-color-error;
		opacity: 0.8;
	}
	.uni-calendar-item--extra1 {
		color: #ff0000;
		opacity: 0.8;
	}
	.uni-calendar-item--extra2 {
		color: #ff8600;
		opacity: 0.8;
	}
	.uni-calendar-item--extra3 {
		color: #ffed00;
		opacity: 0.8;
	}
	.uni-calendar-item--extra4 {
		color: #68fd00;
		opacity: 0.8;
	}
	.uni-calendar-item--extra5 {
		color: #00ff40;
		opacity: 0.8;
	}
	.uni-calendar-item--extra6 {
		color: #00ffff;
		opacity: 0.8;
	}
	.uni-calendar-item--extra7 {
		color: #0085ff;
		opacity: 0.8;
	}
	.uni-calendar-item--extra8 {
		color: #0040ff;
		opacity: 0.8;
	}
	.uni-calendar-item--extra9 {
		color: #2b1cff;
		opacity: 0.8;
	}
	.uni-calendar-item--extra10 {
		color: #7f18ff;
		opacity: 0.8;
	}
	.uni-calendar-item--extra11 {
		color: #ff00d4;
		opacity: 0.8;
	}
	
	.uni-calendar-item--extra12 {
		color: #ff0094;
		opacity: 0.8;
	}
	.uni-calendar-item--extra2 {
		color: #0055ff;
		opacity: 0.8;
	}
	.uni-calendar-item--checked {
		background-color: $uni-primary;
		color: #fff;
		opacity: 0.8;
	}

	.uni-calendar-item--multiple {
		background-color: $uni-primary;
		color: #fff;
		opacity: 0.8;
	}

	.uni-calendar-item--before-checked {
		background-color: #ff5a5f;
		color: #fff;
	}

	.uni-calendar-item--after-checked {
		background-color: #ff5a5f;
		color: #fff;
	}

	.uni-calendar-item__weeks-box-circle_1 {
		color: #2979ff;
	}
</style>