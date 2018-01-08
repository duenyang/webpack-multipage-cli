#!/bin/sh

handle=$1;
env=$2;
newDir=$3;

# 使用脚本时，把'your remote ip'替换为你的远程服务器地址即可
# 远程部署机 webhook
# 如果用远程机器部署的话就要用到以下方法
# preHandle(){
#     git pull orgin master
#     //设置淘宝源，不推荐
#     (npm config set registry http://registry.npm.taobao.org/)
#     npm install
#     npm run build-prod
# }

# 对于在服务器上没有相关的项目目录的，可以尝试新建一个目录，当然你也可以自己去服务器新建一个
newRemoteDir(){
    echo "[exec]正在服务器上新建项目目录 remote:your remote ip"
    ssh root@your remote ip "mkdir /home/www/dist"
}
# 清空dist目录
emptyRemoteDist(){
    if [ $env == "prod" ]
    then
        echo "[exec]正在清空服务器目录文件 remote:your remote ip(prod)"
        ssh root@your remote ip "rm -f /home/www/dist/*"
    else
        echo "[exec]正在清空服务器目录文件 remote:your remote ip(dev)"
        ssh root@your remote ip "rm -f /home/www/dist/*"
    fi
}
# 发送文件到正式服
transferFileToProSever(){
    echo "[exec]正在发送文件到正式服 remote:your remote ip(prod)"
    scp -r ./dist/* root@your remote ip:/home/www/dist/
}
# 发送文件到测试服
transferFileToTestSever(){
    echo "[exec]正在发送文件到测试服 remote:your remote ip(dev)"
    scp -r ./dist/* root@your remote ip:/home/www/dist/
}


if [ $handle == "build" ]
then
    if [ $newDir == "newDir" ]
    then
        newRemoteDir
    fi
    if [ $env == "prod" ]
    then
        env='prod'
        echo "[exec]build ==> build production"
        npm run build
        emptyRemoteDist
        transferFileToProSever
    else
        env='dev'
        echo "[exec]build ==> build development"
        npm run build
        emptyRemoteDist
        transferFileToTestSever
    fi
fi