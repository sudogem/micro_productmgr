npm install \
  seneca \
  seneca-web-adapter-express \
  express-session \
  seneca-web \
  seneca-basic \
  seneca-entity \
  seneca-mongo-store \
  body-parser \
  express --save

cls && npm start
cls && node services/productSvc.js


npm run pretest
========================================
curl -X GET http://localhost:3001/api/product

curl -X POST http://localhost:3001/api/product \
-d '{"name":"hotdog","category":"food","description":"description here...","price":"100"}' \
-H "Content-Type: application/json"

curl -X GET http://localhost:3001/api/product/5f3d3c6155252c5078814ffb

curl -X PUT http://localhost:3001/api/product/5f3e847fa309c927d8fbca9f \
-d '{"name":"edit-hamburger","category":"food","description":"description here...","price":"200"}' \
-H "Content-Type: application/json"

curl -X DELETE http://localhost:3001/api/product/5f3d3c6155252c5078814ffb

curl -X GET http://localhost:3001/api/gettest
