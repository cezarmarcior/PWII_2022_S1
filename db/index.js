const config =  require('config');

async function connect() {
    const mysql = require('mysql2/promise');
    if (global.connection &&
        global.connection.state !== 'disconnected')
        return global.connection;

    const mysqlConnection = await mysql.createConnection(
        {
            host: config.get('mysql.host'),
            user: config.get('mysql.usuario'),
            password: config.get('mysql.senha'),
            database: config.get('mysql.banco-de-dados'),
            port: config.get('mysql.port')
        }
    );
    global.connection = mysqlConnection;
    console.log('Conectou...');
    return mysqlConnection;
}

async function selectTb(){
    try {
        const conn = await connect();
        let consulta = 'SELECT * FROM teste.tb_tes;';
        const [rows] = await conn.query(consulta);
        return await rows;
    } catch (erro) {
        return erro;
    }
}

async function selectWhereTb(ids){
    try {
        const conn = await connect();
        let query = `SELECT * FROM teste.tb_tes where ids=${ids}`;
        console.log('Execute selectWhereTb');
        console.log(ids);
        console.log(query);
        const [rows] = await conn.query(query);
        console.log(rows.length);
        const final = await rows.length === 0 ? ['Sem reg'] : rows;
        return await final;
    } catch(erro){
        return erro;
    }
}

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
}

async function insertTb(dados){
    try {
        if(isEmpty(dados)) {
            return ['Dados nulos, erro ao inserir'];
        }
        else {
            const conn = await connect();
            const query = 
            'insert into tb_tes (ids, nome) values (?, ?)';
            const values = [dados.ids, dados.nome];
            await conn.query(query, values);
            return ['Dados inseridos com sucesso'];
        }
    } catch (erro) {
        return erro;
    }
}

async function deleteWhereTB(ids){
    try {
        const conn = await connect();
        const [rows] = await 
           conn.query('SELECT * FROM teste.tb_tes where ids=?', ids);
            let final = [];
            if (rows.length === 0)
                final = ['Nenhum registro encontrado'];
            else {
                conn.query('DELETE FROM teste.tb_tes where ids=?', ids);
                final = [`O registro ${ids} foi excluido com sucesso`];
            }
        return await final;
    } catch (erro) {
        return erro;
    }
}

async function updateTb(tb) {
    try {
        const conn = await connect();
        const query = 
            "update teste.tb_tes set ids=?, nome=? where ids=?;";
        const change = [tb.idsNew, tb.nome, tb.ids];
        await conn.query(query, change);
    } catch (erro) {
        return erro;
    }
}
module.exports = { selectTb, selectWhereTb, insertTb, deleteWhereTB, updateTb }
