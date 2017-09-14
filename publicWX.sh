#!/bin/sh
mkdir "releaseWX";
mkdir "releaseWX/temp"; 
#VER="$(git rev-list HEAD --first-parent --count)"

VER="$(cut -c 7,8,9,10,11 releaseWX/LastVersion.txt)"
#!/bin/sh
#VER="$(git rev-list HEAD --first-parent --count)" 
#检查是否版本号是一个数字
isNum=1; 
expr $VER + 0 &>/dev/null
[ $? -ne 0 ] && { isNum=0;} 
if [ "$isNum" -ne "1" ] ; then
	VER=10000;
else
	VER=$((10#${VER}+1))
fi
#读取git提交最后一次提交hash码
HASH="$(git log --pretty=format:%h -1)"
v="$1";
sv="$2";

#判断是否有接收到大版本号参数，如果没有则默认为6.0.0
if [ -z "$1" ]; then
  v="1.0.0"
fi
#判断是否有接收到发布场景代码，如果没有则默认为nightly
if [ -z "$sv" ]; then
  sv="bate"
fi
#版本号拼合
version=$v"."$VER"."$HASH"."$sv
echo " 当前版本号:{$version}"
#进行包安装，以正确添加新的依赖包
echo " 安装依赖包---------------------"
npm install
#执行打包指令
npm run build
echo " 构建中---------------------"

# #执行webpack的打包指令
# versionInfo="webpack."$sv".web.config.js"
# versionInfoEcho=$versionInfo" ,构建中---------------------"
# echo $versionInfoEcho;
# webpack --progress --profile --colors --display-modules --config $versionInfo


# sed -i '' 's/'$version'/g' dist/static/js/app.js

# FILE=$version".wx.zip";
# cd dist
# cp -r "dist" "../releaseWX/temp/"
# cp "index.html" "../releaseWX/temp/"
# cd "../releaseWX/temp"
# #替换114.251.242.147   为 loalhost
# # sed -i "" '/http:\/\/114.251.242.147/s/http:\/\/114.251.242.147//g' package/app.js 
# mv "index.html" "index.html"

echo " js加入版本号---------------------"
mv "dist/static/js/app.js" "dist/static/js/app."$version".js"

# touch cache.manifest
# #将要缓存的文件写入缓存清单
# echo "CACHE MANIFEST" >> cache.manifest
# echo "CACHE:" >> cache.manifest
# echo "#"$version >> cache.manifest
# echo "package/app."$version".js" >> cache.manifest 
# imgPath='package/images'
# for file in ` ls $imgPath `  
# do  
#     echo $imgPath"/"$file >> cache.manifest  
# done  

# #首页不能缓存，否则更新有问题
# echo "\n" >> cache.manifest
# echo "NETWORK:" >> cache.manifest
# echo "/" >> cache.manifest
# echo "*" >> cache.manifest

# sed -i "" '/__VERSION__/s//'$version'/g' index.html

echo " 更新html中的js版本号---------------------"
cd dist
sed -i "" 's/app.js/'app.${version}'.js/g' index.html
echo " -------------------------------"


# echo " 压缩文件---------------------"
# FILE=$version".wx.zip";
# zip -r $FILE ./* 
# cp $FILE "../"
# cd ..
# rm -rf temp 
echo $FILE >"LastVersion.txt"
echo " -------------------------------"

echo " 拷贝文件到本地nginx服务器---------------------"
rm  rm -rf dist
cp -r "dist" "/usr/local/var/www"
echo " -------------------------------"


echo " 清理nginx文件---------------------"
cd  /usr/local/var/www/dist

cp -r "static"  "/usr/local/var/www"
cp -r "index.html"  "/usr/local/var/www"
cd ..
rm -rf /usr/local/var/www/dist
echo " -------------------------------"


echo " 打印本地IP，拼接地址---------------------"
IP=`/sbin/ifconfig -a|grep inet|grep -v 127.0.0.1|grep -v inet6|awk '{print $2}'|tr -d "addr:"`
localHttpIp="http://"${IP}":9999/"
des="已成功发布,访问地址为:${localHttpIp}"
echo $des
echo " -------------------------------"

# cd ..
# rm -rf build/package