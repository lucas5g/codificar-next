!/bin/bash

content=$(curl --header "Authorization: Bearer glpat-MxixEZyRu1aSFWcQ23gK" "https://git.codificar.com.br/api/v4/projects/238/repository/tags" | jq '.[0]' | jq '{name, created_at: .commit.created_at}')

tagName=$(echo $content | jq '.name')
tagName=2.13.8
tagCreated_at=$(echo $content | jq '.created_at')

echo $tagCreated_at
echo $tagName

# bash
# #todos projetos atualmente
projects=('moldeshopping' 'moldeautopecas' 'demomarketplace')


# ./auto -v $tagName -p ${projects[0]} -a apk


cd ~/automation/marketplace/marketplace-react

for project in ${projects[*]};
do
    echo $project
    ./auto -v $tagName -p $project -a apk
    sleep 3m    
done;


