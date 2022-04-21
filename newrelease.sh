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
    
    if [ "$tagDate" == "$today" ]; then
        echo "${newline}Boraaaa gerar apps${newline}"
    else
        echo "${newline}Hojé não tem tag nova :)"
        echo "Vamos aproveitar e limpar as coisas por aqui..."
        rm -rf  ~/automation/marketplace/marketplace-react/sources
        rm -rf ~/automation/marketplace/marketplace-react/releases

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
    
    for project in ${projects[@]};
    do
        echo "./auto -v $tagName -p $project -a $extension"
        ./auto -v $tagName -p $project -a $extension
        sleep 2
    done;
    
    
    
}

removeFolderSources(){
    echo "${newline}${bold}Function:$normal removeFolderSources"
    echo "${bold}Descrição: $normal Deletar a pasta sources${newline}"
    cd ~/automation/marketplace/marketplace-react
    rm -rf sources
    echo "----------------------------------"
    
}


main(){
    #Algumas variáveiss :)
    newline=$'\n'
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
    bold=$(tput bold)
    normal=$(tput sgr0)
    
    declare -a projectsAab=(
        moldeshopping
        moldeautopecas
        molde_restaurante
        moldefarmacia
    )
    projectsApk=(
        demomarketplace
    )
    
    
    echo $bold
    echo "##########################"
    echo "##                      ##"
    echo "## Generete NewReleases ##"
    echo "##                      ##"
    echo "##########################"
    echo $normal
    
    
    echo "$newline $(date "+%H:%M - %d/%m")"
    
    getInfoTag
    conditionalRunJob
    buildApps projectsAab aab
    buildApps projectsApk apk
    
}
main

