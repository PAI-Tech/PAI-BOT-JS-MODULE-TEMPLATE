


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