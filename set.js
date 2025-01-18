const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0IxQ0N5VzJDTTR0aWxEeVIyS0N6VElVamRxcUpnd2RUVk1xOS9aSVIyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnZiTEx5MXBWVlZSdUN5YjBGZmI0YmYycmpiY0t2RFhKVWJPMjgxaVIxWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTkJOWG84Rk9jNkdnaXluWTY2eHJRN3ZIMUltL0drVm9rZ00zVGV4Wm04PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYdFI3c3daczVidHRxSjF1aDN3N1RaWHdXSUlVNVJDTjZwTXNLLzZRN3pnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdCN2N5Vmt5ZWduR3ZMMnQ5MVVpb1lSd2N5dlVOb256ZmExMGU4NE9pMzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdtY0dZZHRwRnBzMjVPeldSakRxS212cGYzWCtON0l6TURjTVdQeXp4MTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0xFU0o4QXMrbUxOZG5HSmdoYTBoMHlKbDJ6bTh6VC9EUWFuQkRtZFVIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoickJDU1VFd1JNdVdnckUvK1BOcklob1NDUGdEdkFiSnZ4cDRZU1ZqRzJSOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpteUo1TTVoWmN6RTc2Q2ROMHo4bWtKSENMbUtSNHR5YnBsZFZiaUI1dGNydzR3NzlvTU9VWnl4SmV3N0RjQWxZQVRWcmJvalpCRCszay95c3ZZZEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJLVTdIMHo4TXZGNjkzZVlqYUxJQytpbUVKcitrajFPc0ZqL0Y3OEZ2RnBNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNc0pMR09tc1RYV2tOZWxUSVlaQU1BIiwicGhvbmVJZCI6IjQxOWZlMThkLWJjMGYtNGJjNy05MDFlLWUwNzQ0YzE1ZjY3ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2alVjS2dWNUJRL0FKMnBhNElISXJiT1FkTW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDN6dzh2QmdCK2xzUkFDQXdFWi83RjZMOUJRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRQWkdXVlRXIiwibWUiOnsiaWQiOiIyMzQ4MTA3OTI0NjU4OjE3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMYmkwc1VCRVBxMHJid0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvSG9GQytkZ2xNWTgxSVJaakU1OVhUM3hKamdYeDhWdlZRRi92SVdsbG44PSIsImFjY291bnRTaWduYXR1cmUiOiI3OHAzdkhnWU5ERjVoWFhPUFNML0dtZ1NLbWM3VmpMYXc5c1l6MXZRMUNRbW4wYTBmYlF6SURQUktGUGFCT1Fnai9TU0I3ekdUcUFTUDdoNDByT3BCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicUh4ZlBTZHorYTM2TTFRTTZaZFkxNXdwNmFyUmExL3hza0NZTzhkVk00aWk3dmk1Y1JwWi8wcGN2K284UUxCQkVKWFFiaVY3a2dvSTVKRlltZDVmQ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTA3OTI0NjU4OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZ4NkJRdm5ZSlRHUE5TRVdZeE9mVjA5OFNZNEY4ZkZiMVVCZjd5RnBaWi8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzcxODU5MjYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSWYrIn0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Possy",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348107924658",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
