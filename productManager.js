import fs from 'fs'

export class ProductManager{
    constructor(path) {
        this.path = path
        this.format = 'utf-8'
        
}
    
getNextID = async () => {
    const data = await this.getProduct()
    const count = await data.length
    
    if (count > 0) {

        
        return data[count - 1].id + 1
    } else {
        return 1
    }
    
}

addProducts = async (title, description, price, thumbnail, code, stock) => {
                const productID = await this.getNextID();
                const products = {id:productID, title, description, price, thumbnail, code, stock}
                const list = await this.getProduct()
                list.push(products)
                await fs.promises.writeFile(this.path, JSON.stringify(list))
}

getProduct = async () => {
    try {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const dataObj = JSON.parse(data)
        return dataObj
    } catch (error) {
        console.log('No se encontro el archivo, se devuelve vacio')
        return []
    }
    }
getProductsByID = async (id) => {
        try{
        const productByID = await this.getProduct()
        const filtroID = productByID.find((producto) => producto.id === id);
        return filtroID      
         
         } catch (error) {
         console.log("not found")}
         }

updateProduct = async (id, product) => { 
        const listUpdate = await this.getProduct(); 
        const itemParaActualizar = listUpdate.find((producto) => producto.id === id); 
        
        if (!itemParaActualizar) { 
                console.log('no se encuentra ese id'); 
                return; 
        }; 
        
        const newProduct = product
        const listaModificada = listUpdate.map(product=>product.id === newProduct.id);
        const nuevaLista = listUpdate.findIndex((elemento, nuevaLista) => {
            if (elemento.id === id)
            return listUpdate[nuevaLista] = newProduct;
            console.log('Se actualizo el producto ', newProduct)
        })
        
        
                
        

        await fs.promises.writeFile(this.path, JSON.stringify(listUpdate))
        
    
    }



deleteProduct = async (id) => {
     const data = await this.getProduct()
     const dataObj = data.filter(product=>product.id != id)
     console.log('Elemento Eliminado')
     await fs.promises.writeFile(this.path, JSON.stringify(dataObj))
    }
    }
    



    
    
   

async function run() {
    const product = new ProductManager('productos.json')
 

}

run()
