#!/bin/bash

getInfoTag(){
    echo "${newline}${bold}Function:$normal getInfoTag"
    echo "${bold}Descrição:$normal Pegar as informações da última tag"
    content=$(curl -sS --header "Authorization: Bearer "$GITLAB_KEY"" $GITLAB_URL_TAG | jq '.[0]' | jq '{name, created_at: .commit.created_at}')
    tagName=$(echo $content | jq '.name')
    tagName=${tagName//'"'/''}
    # tagName="'$tagName'"
    
    
    tagCreated_at=$(echo $content | jq '.created_at')
    tagCreated_at=${tagCreated_at//'"'/''}
    
    tagDate=$(date -d $tagCreated_at +%Y-%m-%d)
    
    echo "${bold}Data de criação:$normal $tagDate"
    echo "${bold}Nome:$normal $tagName"
    echo "----------------------------------"
    
}
conditionalRunJob(){
    
    today=$(date +%Y-%m-%d)
    local action=$1
    
    if [ "$tagDate" == "$today" ] || [ "$action" == "force" ]; then
        echo "${newline}Boraaaa gerar apps${newline}"
    else
        echo "${newline}Hoje não tem tag nova :)"
        echo "----------------------------------"
        exit 0
    fi
    
}

buildApps(){
    
    # projects=${1[@]}
    local -n projects=$1
    extension=$2
    
    echo "${newline}${bold}Function:$normal buildApps"
    echo "${bold}Descrição:$normal Gerar apps com extensão .$extension${newline}"
    
    cd ~/automation/marketplace/marketplace-react
    # folderReleaseExist="$HOME/automation/marketplace/marketplace-react/releases/$tagName"
    folderReleaseExist="$PATH_AUTOMATION/releases/$tagName"
    for project in ${projects[@]};
    do
        if [ ! -d "$folderReleaseExist/$project" ]; then
            echo "./auto -v $tagName -p $project -a $extension"
            # echo "$folderReleaseExist/$project"
            ./auto -v $tagName -p $project -a $extension
        else
            echo "$project-$tagName - Já tem essa release no seu pc"
        fi
        sleep 2
    done;
    
    
    
}



deleteReleases(){
    
    local clean=$1
    
    if [ "$clean" == "deleteReleases" ]; then
        echo "${newline}${bold}Function:$normal deleteRelease"
        echo "${bold}Descrição:$normal Deletar a pasta release e sources"
        rm -rf  ~/automation/marketplace/marketplace-react/sources
        rm -rf ~/automation/marketplace/marketplace-react/releases
        exit 0
    fi
}

#Passar variávies pelo terminal
action=$1
main(){
    #Algumas variáveiss :)
    newline=$'\n'
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
    bold=$(tput bold)
    normal=$(tput sgr0)
    
    projectsAab=(
        moldeshopping
        moldeautopecas
        molde_restaurante
        moldefarmacia
    )
    projectsApk=(
        demomarketplace
        molde
    )
    
    
    echo $bold
    echo "##########################"
    echo "##                      ##"
    echo "## Generete NewReleases ##"
    echo "##                      ##"
    echo "##########################"
    echo $normal
    
    
    echo "$newline $(date "+%H:%M - %d/%m")"
    
    deleteReleases $action
    getInfoTag
    conditionalRunJob $action
    buildApps projectsAab aab
    buildApps projectsApk apk
    
}
main

