#!/bin/bash
build(){
    local version=$1
    local project=$2
    local extension=$3
    echo "${newline}${bold}Function:$normal buildApps"
    echo "${bold}Descrição:$normal Gerar app com extensão .$extension${newline}"
    
    cd ~/automation/marketplace/marketplace-react
    
    echo "./auto -v $version -p $project -a $extension"
    ./auto -v $version -p $project -a $extension   
    sleep 2
}

action=$1

main(){
    newline=$'\n'
    # export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
    bold=$(tput bold)
    normal=$(tput sgr0)
    
    
    local version=$action
    
    build $version pizzapoint apk
    # build $version molde apk
    
    
}
main