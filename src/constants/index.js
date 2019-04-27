export const refreshControl = {
  tintColor: 'rgba(241,196,15, 1)',
  title: '正在加载...',
  colors: ['rgba(241,196,15, 1)', 'rgba(241,196,15, 0.9)', 'rgba(241,196,15, 0.8)'],
  progressBackgroundColor: '#292829',
};

export const imagePickerOptions = {
  title: '设置封面',
  cancelButtonTitle: '取消',
  chooseFromLibraryButtonTitle: '从相册选择',
  takePhotoButtonTitle: '拍照',
  noData: true,
  // allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  permissionDenied: {
    text: '你可以用你的相机拍照，并从你的图书馆中选择图片',
    reTryTitle: '重试',
    okTitle: '确认',
  },
};
