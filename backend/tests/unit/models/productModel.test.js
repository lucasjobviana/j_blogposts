const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const connection = require('../../../src/models/connection');
const { productsDBFormat } = require('../../mocks/products');
const productModel = require('../../../src/models/productModel');

chai.use(chaiHttp);
const { expect } = chai;   

describe('Testando o models do produto:', function () {
    describe('Testando os métodos select:', function () {        
        afterEach(function () {
        sinon.restore();
        }); 

        it('Retorna um array de produtos caso não seja passado nenhum id.', async function () {
            sinon.stub(connection, 'execute').resolves([productsDBFormat]);
            const productList = await productModel.getProducts();     
            expect(productList).to.be.deep.equal(productsDBFormat); 
            // sinon.restore();
        });

        it('getProductsByName: Retorna um array de produtos caso não seja passado nenhum name.', async function () {
            sinon.stub(connection, 'execute').resolves([productsDBFormat]);
            const productList = await productModel.getProductsByName('asd');     
            expect(productList).to.be.deep.equal(productsDBFormat); 
            // sinon.restore();
        });

        it('Retorna apenas um unico produto caso não seja passado um id válido.', async function () {
            sinon.stub(connection, 'execute').resolves([[productsDBFormat[1]]]);
            const productList = await productModel.getProductById(4);     
            expect(productList).to.be.deep.equal(productsDBFormat[1]);
            // sinon.restore();
        });

        it('Retorna uma mensagem de erro caso o id do produto não exista no banco.', async function () {
            sinon.stub(connection, 'execute').resolves([[]]);
            try {
                await productModel.getProductById(55);
            } catch (error) {
                expect(error.message).to.be.equal('Product not found');
            }
            // sinon.restore();
        }); 

        it('Retorna uma mensagem erro caso o banco não consiga ser consultado.', async function () {
            sinon.stub(connection, 'execute').resolves();
            try {
                await productModel.getProducts();
            } catch (error) {
                expect(error.message).to.be.equal('Erro ao solicitar produtos.');
            }
            // sinon.restore();
        }); 
    });
 
    describe('Testando os métodos insert: ', function () {
        // beforeEach(function () {
        //     // sinon.stub(tools, 'serverLog'); // Stub vazio para evitar mensagens no console'
        //   });
        
        afterEach(function () {
        sinon.restore();
        });

        it('Retorna um objeto com o mesmo name e um novo id se o name for válido.', async function () {
            sinon.stub(connection, 'execute').resolves([{ insertId: 5, affectedRows: [1] }]);
            const newProduct = await productModel.insertProduct({ name: 'Eisenbahn Pale Ale 600ml' });   
            expect(newProduct).to.be.deep.equal({ id: 5, name: 'Eisenbahn Pale Ale 600ml' });
            // sinon.restore();
        });

        it('Retorna uma mensagem erro caso o banco não consiga ser consultado.', async function () {
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
            try {
                await productModel.insertProduct({ name: 'name' });
            } catch (error) {
                expect(error.message).to.be.equal('Erro ao inserir produto.');
            }
            // sinon.restore();
        }); 
    });  

    describe('Testando os métodos update: ', function () {
        afterEach(function () {
        sinon.restore();
        });
 
        it('Retorna um objeto com o mesmo objeto passado caso o update seja bem sucedido.', async function () {
            // sinon.restore();
            const newProduct = { name: 'Eisenbahn Pale Ale 600ml' };
            const id = 5;
            sinon.stub(connection, 'execute').resolves([{ affectedRows: [1] }]);
            sinon.stub(productModel, 'getProducts').resolves([
                { id: 1, name: 'Skol Lata 250ml' },
                { id: 5, name: 'Heineken 600ml' },
                { id: 12, name: 'Antarctica Pilsen 300ml' },
              ]);
              
            const updatedProduct = await productModel.updateProduct(id, newProduct);   
            expect(updatedProduct).to.be.deep.equal({ ...newProduct, id });
        });

        it('Retorna uma mensagem erro caso o update não seja bem sucedido.', async function () {
            sinon.stub(connection, 'execute').resolves();
            sinon.stub(productModel, 'getProducts').resolves([
                { id: 1, name: 'Skol Lata 250ml' },
                { id: 2, name: 'Heineken 600ml' },
                { id: 12, name: 'Antarctica Pilsen 300ml' },
              ]);
            try {
                await productModel.updateProduct(5, { name: 'name' });
            } catch (error) {
                expect(error.message).to.be.equal('Erro ao solicitar produtos.');
            }
        }); 
    });

    describe('Testando os métodos delete: ', function () {
        afterEach(function () {
        sinon.restore();
        });
 
        it('Retorna um true caso o objeto seja deletado.', async function () {
            const id = 5;
            sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);    
            const hasDeleted = await productModel.deleteProduct(id);   
            expect(hasDeleted).to.be.deep.equal(true);
        });

        it('Retorna um erro caso não consiga deletar.', async function () {
            const id = 5;
            sinon.stub(connection, 'execute').resolves([{ affectedRows: [] }]);
            try {
                await productModel.deleteProduct(id);
            } catch (error) {
                expect(error.message).to.be.deep.equal('Product not found');
            }
        });
    });
});
