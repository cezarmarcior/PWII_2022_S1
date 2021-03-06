const express = require('express');
const router = express.Router();
const db = require('./db');

const root = './';
router.get(
    "/",(request,response)=>{
        response.sendFile('dist/index.html',{root});
    }
);

router.post( // C  - Create
    "/post",async (request,response)=>{
        const dados = await db.insertTb(request.body);
        console.log(request.body);
        response.send(
            JSON.stringify(dados)
        )
    }
);

router.get(   //R - Read
    "/get", async (request,response)=>{
        const dados = await db.selectTb();
        console.log('Get...');
        console.log(dados);
        response.send(
            JSON.stringify(dados)
        )
    }
);
router.get(    // R - Read with where
    "/get/:ids", async (request,response) => {
        const dados = await db.selectWhereTb(request.params.ids);
        console.log(dados);
        response.send(
            JSON.stringify(dados)
        );
    }
);
router.put( // U - Update
    "/put",async (request,response)=>{
        const result = await db.updateTb(request.body);
        response.send(
            JSON.stringify(result)
        );
    }
);
router.delete( // D - Delete
    "/delete/:ids",async (request,response)=>{
        const result = await db.deleteWhereTB(request.params.ids);
        response.send(
            JSON.stringify(result)
        );
    }
);

router.get(
    "/dados",(request,response)=>{
        response.send("Resposta Dados executada!!!!!!!");
    }
);

module.exports = router;