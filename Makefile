.PHONY: start

start:
	cd Backend && npm install && npx nodemon server.js &
	cd Frontend && npm install && npm run dev
