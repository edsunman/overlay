# overlay

Overlay is a web app for designing and controlling graphics which can be overlaid on a video live stream using software such as OBS.

Built using sveltekit, prisma, tailwind and lucia auth, overlay is designed to be deployed to serverless enviroments such as vercel and communicate with a corresponding websocket server overlay-server using socket-io. 

### how to use

https://user-images.githubusercontent.com/14927523/232598070-990313aa-64bb-40f8-986b-a1855f8da386.mp4

### enviroment vars

`DATABASE_URL` mysql:// address to database

`WS_URL` http:// address for server function to communicate with socket.io websocket server

`PUBLIC_WS_URL` wss:// address for client javascript to communicate with socket.io websocket server

### roadmap



