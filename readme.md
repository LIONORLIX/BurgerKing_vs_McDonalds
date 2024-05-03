# readme

本次Glyph Visualization采用了相对更加轻便的方式，即使用Python的`SimpleHTTPServer`模块进行代码测试。

在命令行进入代码所在文件夹code后输入下方命令：

```
＃如果Python版本是3.X 
python -m http.server 
＃如果Python版本是2.X 
python -m SimpleHTTPServer
```

默认情况下将在本地Web服务器上的端口8000上运行内容。在浏览器输入localhost:8000后稍等片刻即可查看（推荐chrome）。