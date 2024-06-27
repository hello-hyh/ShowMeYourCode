echo "build env file"
touch .env
echo  "JWTPRIVATEKEY=${{ secrets.JWTPRIVATEKEY }}" >> .env-test
echo  "SMTP_HOST=${{ secrets.SMTP_HOST }}" >> .env
echo  "SMTP_USER=${{ secrets.SMTP_USER }}" >> .env
echo  "SMTP_PASS=${{ secrets.SMTP_PASS }}" >> .env
echo  "DATABASE_URL=${{ secrets.DATABASE_URL }}" >> .env
