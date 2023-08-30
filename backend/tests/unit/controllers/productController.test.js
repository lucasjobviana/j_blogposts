const sinon = require('sinon');
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { productsDBFormat } = require('../../mocks/products');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');
// const app = require('../../../src/app');
const { setServerLog } = require('../../../src/tools');

setServerLog(false);

chai.use(chaiHttp);
const { expect } = chai;    
chai.use(sinonChai);

describe('Testando as rotas do produto:', function () {
    describe('Testando o método GET:', function () {
        afterEach(function () {
        sinon.restore();
        });

        it('Deve retornar o status 200 e a lista de produtos caso não seja passado nenhum id', async function () {
            const res = {};
            const req = {};
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(productService, 'getProducts')
              .resolves(productsDBFormat);
            await productController.getProducts(req, res);
            
             expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(productsDBFormat);
          });
 
        it('Deve retornar o status 200 e um unico produto caso seja passado um id válido', async function () {
        const res = {};
        const req = { params: { id: 1 } };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(productsDBFormat[0]);
        sinon.stub(productService, 'getProduct')
            .resolves(productsDBFormat[0]);
        await productController.getProduct(req, res);
        
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsDBFormat[0]);
        });

        it('Retorna uma mensagem de erro caso o id do produto não exista no banco.', async function () {
        const res = {};
        const req = { params: { id: 4 } };
        const next = sinon.stub();
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'getProduct')
            .throws(new Error('Product not found'));
        await productController.getProduct(req, res, next);
        
        expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });

        it('Rota: /products/search. Retorna um array de produtos caso não seja passado nenhum name.', async function () {
            const res = {};
            const req = { query: { r: '' } };
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(productsDBFormat);
            sinon.stub(productService, 'getProductsByName').resolves(JSON.stringify(productsDBFormat[0]));
            sinon.stub(productService, 'getProducts').resolves(productsDBFormat);
            await productController.getProductByName(req, res);
            
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(productsDBFormat);
        });

        // it('Rota: /products/search. Retorna um array de produtos correspondentes ao name caso name seja informado.', async function () {
        //     const res = {};
        //     const req = { query: { q: 'Lata' } };
        //     res.status = sinon.stub().returns(res);
        //     res.json = sinon.stub().returns(productsDBFormat);
        //     sinon.stub(productService, 'getProductsByName').resolves(JSON.stringify(productsDBFormat[0]));
        //     sinon.stub(productService, 'getProducts').resolves(productsDBFormat);
        //     await productController.getProductByName(req, res);
            
        //     expect(res.status).to.have.been.calledWith(200);
        //     expect(res.json).to.have.been.calledWith(productsDBFormat);
        // });
    });

    describe('Testando o método POST:', function () {        
        afterEach(function () {
        sinon.restore();
        });

        it('Retorna um objeto com o mesmo name e um novo id se o name for válido.', async function () {
            const name = 'Eisenbahn Pale Ale 60ml';
            const res = {};
            const req = { body: { name } };
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(productsDBFormat);
            sinon.stub(productService, 'insertProduct').resolves({ id: 5, name });
            await productController.insert(req, res);
            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith({ id: 5, name });
        }); 

        it('Retorna uma mensagem de erro caso o nome do produto seja tenha tamanho inválido.', async function () {
            const res = {};
            const req = { body: { name: 'Ei' } };
            const next = sinon.stub();
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            // sinon.stub(productService, 'insertProduct').resolves({ message: '"name" length must be at least 5 characters long' });
            await productController.insert(req, res, next);
            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });

        it('Retorna uma mensagem de erro caso o nome do produto não seja informado.', async function () {
            const res = {};
            const req = { body: { } };
            const next = sinon.stub();
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            await productController.insert(req, res, next);
            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });
    });

    describe('Testando os métodos update: ', function () {
        afterEach(function () {
        sinon.restore();
        });

        it('Retorna um objeto identico ao passado.', async function () {
            const name = 'Eisenbahn Pale Ale 6ml';
            const res = {};
            const req = { body: { name }, params: { id: '5' } };
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns({ id: 5, name: 'Eisenbahn Pale Ale 600ml' });
            sinon.stub(productService, 'updateProduct').resolves({ id: 5, name: 'Eisenbahn Pale Ale 600ml' });
            await productController.update(req, res);
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ id: 5, name: 'Eisenbahn Pale Ale 600ml' });
        });
    
        it('Retorna uma mensagem de erro caso o nome do produto não seja informado.', async function () {
            const res = {};
            const req = { body: { }, params: { id: '5' } };
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns({ id: 5, name: 'Eisenbahn Pale Ale 600ml' });
            // sinon.stub(productService, 'updateProduct').throws(new Error('"name" is required'));
            await productController.update(req, res);
           // expect(res.status).to.have.been.calledWith(200);
           expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
        });
    });
 
    describe('Testando o método delete:', function () {
        afterEach(function () {
        sinon.restore();
        });

        it('Retorna o status 204 e nenhum corpo caso o delete funcione.', async function () {
            const res = {};
            const req = { params: { id: '5' } };
            const next = sinon.stub();
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(productService, 'deleteProduct').resolves(true);
            await productController.deleteProduct(req, res, next);
            expect(res.status).to.have.been.calledWith(204);
            // expect(res.json).to.have.been.calledWith({});
        });

        it('Retorna o status 404 e a mensagem Product Not Found caso o produto não exista.', async function () {
            const res = {};
            const req = { params: { id: 77 } };
            const next = sinon.stub();
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(productService, 'deleteProduct').throws(new Error('Product not found'));
            await productController.deleteProduct(req, res, next);
            // expect(res.status).to.have.been.calledWith(404);
            // expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });
    });
});
