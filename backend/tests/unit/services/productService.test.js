const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { productsDBFormat } = require('../../mocks/products');
const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');

chai.use(chaiHttp);
const { expect } = chai;    
const productNotFoundMsg = 'Product not found';

describe('Testando o services do produto:', function () {
    describe('Testando os médotos select:', function () {
        afterEach(function () {
        sinon.restore();
        });

        it('Retorna um array de produtos caso não seja passado nenhum id.', async function () {
            sinon.stub(productModel, 'getProducts').resolves(productsDBFormat);
            const productList = await productService.getProducts();     
            expect(productList).to.be.deep.equal(productsDBFormat);
        });

        it('Retorna um erro caso o model não consiga pesquisar.', async function () {
            sinon.stub(productModel, 'getProducts').throws();
            try { 
                await productService.getProducts(); 
            } catch (error) {
              expect(error.message).to.be.deep.equal('Erro ao solicitar produtos'); 
            }
        });

        it('Retorna um unico produto caso não seja passado um id válido.', async function () {
            sinon.stub(productModel, 'getProductById').resolves(productsDBFormat[1]);
            const productList = await productService.getProduct(4);     
            expect(productList).to.be.deep.equal(productsDBFormat[1]);
        });

        it('Retorna uma mensagem de erro caso o id do produto não exista no banco.', async function () {
            sinon.stub(productModel, 'getProductById').throws(new Error(productNotFoundMsg));
            try {
                await productService.getProduct(55);
            } catch (error) {
                expect(error.message).to.be.equal(productNotFoundMsg);
            }
        });
    }); 

    describe('Testando os métodos insert:', function () {
        beforeEach(function () {
            // sinon.stub(tools, 'serverLog'); // Stub vazio para evitar mensagens no console'
          });
        
        afterEach(function () { 
        sinon.restore();
        });

        it('Retorna um objeto com o mesmo name e um novo id se o name for válido.', async function () {
            const name = 'Eisenbahn Pale Ale 600ml';
            sinon.stub(productModel, 'insertProduct').resolves({ id: 5, name });
            const newProduct = await productService.insertProduct({ name });   
            expect(newProduct).to.be.deep.equal({ id: 5, name });
        });
    });
 
    describe('Testando os métodos update: ', function () {
        afterEach(function () {
        sinon.restore();
        }); 

        it('Retorna um objeto com o mesmo objeto passado caso o update seja bem sucedido.', async function () {
            const newProduct = { name: 'Eisenbahn Pale Ale 600ml' };
            const id = 99;
            sinon.stub(productModel, 'updateProduct').resolves({ ...newProduct, id });
            sinon.stub(productModel, 'getProductById').resolves();
            const updatedProduct = await productService.updateProduct(id, newProduct);  
            expect(updatedProduct).to.be.deep.equal({ ...newProduct, id });
        }); 

        it('Retorna uma mensagem erro caso o id informado não esteja no banco.', async function () {
            sinon.stub(productModel, 'getProductById').throws(new Error(productNotFoundMsg));
            try {
                await productService.updateProduct({ name: 'name' });
            } catch (error) {
                expect(error.message).to.be.equal(productNotFoundMsg);
            }
        });
    });

    describe('Testando os métodos delete: ', function () {
        afterEach(function () {
        sinon.restore();
        });
 
        it('Retorna um true caso o objeto não esteja mais no banco.', async function () {
            const id = 5;
            sinon.stub(productModel, 'deleteProduct').resolves(true);    
            const hasDeleted = await productService.deleteProduct(id);   
            expect(hasDeleted).to.be.deep.equal(true);
        }); 
         
        it('Retorna um erro caso não model não consiga deletar.', async function () {
            const id = 5;
            sinon.stub(productModel, 'deleteProduct').throws(new Error(productNotFoundMsg));
            try {
                await productService.deleteProduct(id);
            } catch (error) {
                expect(error.message).to.be.deep.equal(productNotFoundMsg);
            }
        });
    });
}); 
