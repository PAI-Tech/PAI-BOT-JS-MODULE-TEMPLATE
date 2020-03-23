/*
 Sample for PAI Data Entity for data management

 Author       : Tamir Fridman
 Date Created : 9/25/2019
 Copyright PAI-TECH 2018, all right reserved

 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */



const {PAIDataSource, PAIEntity, PAIEntityList} = require('@pai-tech/pai-code');


const schema = {
    /**
     * Name of the entity, this field must be unique
     */
    name: "my-data-entity",

    /**
     * Array of fields - for more info check out: field-json-schema.js
     */
    fields:  [
        {
            name: "entity-name",
            type: "string",
            required: true
        }


        /**
         *  possible values: string, number, array, object, date, objectId
         */
    ]
};

class MyDataEntity extends PAIEntity {


    constructor() {
        super(schema);
    }

    setEntityName() {
        return schema.name;
    }
}


module.exports = MyDataEntity;