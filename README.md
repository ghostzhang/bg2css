# bg2css

CSS Sprites 样式生成工具

## 使用说明

1. 运行软件
2. 将要处理的图片拖入界面或 \<kbd\>command+o\</kbd\>
3. 双击图片上的任意位置，会得到一个蓝色的区域，区域可移动位置，按住右下角可改变区域的大小

## 安装说明

1. 先安装[Adobe Air](http://get.adobe.com/cn/air/)运行环境
2. 下载安装最新版的[bg2css.air](https://github.com/ghostzhang/bg2css/releases)

## 版本信息

bg2css v3.2.3 2020-12-22

- (fix)帮助文档地址迁移到 github
- (fix)版本更新改为手动
- (fix)样式问题
- (add)默认界面

bg2css v3.2.2 2019-2-17

- (fix)更新证书，请重新安装

bg2css v3.2.1 2010-2-8

- (add)复制当前大小
- (add)复制提示优化
- (add)从样式表导入
- (add)多语言支持

bg2css v3.2 2010-2-3

- (fix)拖动全选
- (fix)使用快捷键修改位置和大小时无边界判定
- (add)修改层配色
- (add)优化改变位置的快捷键
- (add)优化改变大小的快捷键
- (add)优化图片缩放的快捷键
- (add)更新当前图片

bg2css v3.1.2 2009-11-30

- (add)“复制当前位置”
- (fix)“操作区”位置挡到滚动条
- (fix)复制坐标时没有“-”号

bg2css v3.1.1 2009-8-1

- (add)‘选中层时显示“当前层信息”’为默认选中
- (fix)当前层激活状态不正确

bg2css v3.1 2009-8-1

- (fix)样式输出格式不统一
- (fix)当图片太小是层大小判定错误
- (fix)读取有边距的记录时层位置出错

bg2css v3.0 2009-6-16

- (add)单独定义层的输出设置
- (add)当前信息层显示设置
- (add)更新所有层信息窗
- (fix)新建层时不激活
- (fix)读取设置后图片不能缩放
- (fix)操作界面布局

bg2css v2.3 2009-6-2

- (add)图片缩放增加快捷键
- (add)新的程序图标
- (fix)当前信息层会被层挡住

bg2css v2.2 2009-5-27

- (add)优化操作界面，操作区扩展到整个窗口
- (add)程序菜单
- (add)右键菜单
- (fix)数字输入框内容不容易选中

bg2css v2.1 2009-5-20

- (add)窗口改变时保持当前层在窗口中
- (fix)移动当前层信息框时当前层变灰
- (fix)放大后载入新图层没有初始化

bg2css v2.0 2009-5-12

- (add)优化操作界面
- (add)放大时定位到当前层位置
- (add)图片放大不消锯齿
- (add)图片放大 6 倍（用于原图过小的情况，大图片慎用）
- (fix)图片放大后添加层再缩小信息出错

bg2css v1.9.5 2009-5-2

- (fix)保存时文件不能替换

bg2css v1.9.4 2009-5-2

- (add)自定义保存路径
- (add)单独复制宽、高、X 坐标、Y 坐标
- (add)复制当前样式时类名可选择
- (fix)修改默认层大小
- (fix)拖入文件时检查类型
- (fix)"关于"里的链接在浏览器窗口打开

bg2css v1.9.3 2009-4-14

- (add)文件保存时覆盖提示
- (fix)修改图片拖动响应区域

bg2css v1.9.2 2009-4-13

- (add)图片背景色可改
- (add)快捷键删除层
- (add)拖动更改图片

bg2css v1.9.1 2009-4-12

- (fix)支持中文路径

bg2css v1.9.0 2009-4-12

- (add)复制当前层
- (fix)读取设置后再保存出错
- (fix)修改了部分界面

bg2css v1.8.2 2009-4-10

- (add)公共样式部分可编辑
- (fix)修改了部分界面
  保存的设置文件增加一个项，请在之前保存的 xml 里的“imginfo”节点下手动增加一个“gbstyle”节点，值为“”.

bg2css v1.8.1 2009-4-9

- (add)一定范围的负边界
- (add)复制选中层的样式
- (fix)输出 0 时的显示
  保存的设置文件增加一个项，请在之前保存的 xml 里的“imginfo”节点下手动增加一个“margin”节点，值为“0”.

bg2css v1.8.0 2009-4-7

- (add)复制样式
- (add)层列表，以方便管理

bg2css v1.7.0 2009-4-1

- (add)保存层位置信息

bg2css v1.6.0 2009-3-27

- (add)边界验证
- (fix)修改类名后放大失效

bg2css v1.5.1 2009-3-26

- (add)图片放大培数可改

bg2css v1.5.0 2009-3-25

- (add)图片放大预览
- (fix)空值无验证

bg2css v1.4.1 2009-3-21

- (add)支持快捷键
- (add)在线更新
- (fix)添加层时有 bug：双负数
- (fix)窗口滚动影响微调
- (fix)值为 0 时输出为"-0px"

bg2css v1.3 2009-3-20

- (add)输出样式时可选是否输出宽高
- (fix)生成样式时最后一个类删除后生成有问题
- (fix)样式路径自定义

bg2css v1.2 2009-3-19

- (add)双击添加层
- (add)层位置和大小微调

bg2css v1.0 2009-3-17

- (add)添加、删除层
- (add)拖动层、修改层大小
- (add)显示层相关信息
- (add)生成样式
- (add)当前层样式

bg2css v1.1 2009-3-18

- (add)修改类名
- (add)修改层位置、大小
- (add)重置层
- (add)保存成样式文件
