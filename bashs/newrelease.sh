#!/bin/bash

export $(cat ../.env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )

content=$(curl --header "Authorization: Bearer "$GITLAB_KEY"" $GITLAB_URL_TAG | jq '.[0]' | jq '{name, created_at: .commit.created_at}')

tagName=$(echo $content | jq '.name')
tagName=${tagName//'"'/''}

tagCreated_at=$(echo $content | jq '.created_at')

# echo $tagCreated_at
# # echo ${tagName//'"'/''}
# echo $tagName
# exit 0

# bash
# #todos projetos atualmente
projectsAab=(
    moldeshopping
    moldeautopecas
    molde_restaurante
    moldefarmacia
)



cd ~/dev/automation/marketplace/marketplace-react

for project in ${projectsAab[*]};
do
    echo "./auto -v $tagName -p $project -a aab"
    ./auto -v $tagName -p $project -a aab
    # echo $project
    sleep 2m
done;


