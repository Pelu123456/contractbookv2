const knex = require('../database/knex');

class ContactService {
    constructor(){
        this.contacts = knex ('contacts');
    }
    //Define methods for accessing the database

    #getContact(payload){
        const contact = {...payload};
        const contactProperties = [
            "name", "email", "address", "phone", "favorite"
        ];
        // remove non-contact properties
        Object.keys(contact).forEach(function(key){
            if (contactProperties.indexOf(key)== -1 ){
                delete contact[key];
            }
        });
        return contact;
    }
    async create(payload){
        const contact = this.#getContact(payload);
        const [id] = await this.contacts.inset(contact);
        return {id, ...contact}
    }
    async all(){
        return await this.contacts.select('*');
    }

    async findByName(name) {
        return await this.contacts
        .where('name', 'like', `%${name}%`)
        .select('*');
    }
    async delete(id){
        return await this.contacts.where('id', id).del();
    }
    async allFavorite(){
        return await this.contacts.where('favorite',1).select('*');
    }
    async deleteAll(){
        return await this.contacts.del();
    }

}

    



module.exports = ContactService;