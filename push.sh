git add .
git commit -m "$1"
git push
ssh -t versionaplicativoderestaurante "cd codificar/codificar-next/ && git pull && pm2 restart codificar"
echo "http://version.aplicativoderestaurante.com.br:3000"
# echo "test $1"