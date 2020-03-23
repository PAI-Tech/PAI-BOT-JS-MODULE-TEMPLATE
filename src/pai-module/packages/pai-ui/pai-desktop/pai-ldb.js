/*
    PAI Local Database
     Description  : Client local NoSQL database
     Author       : Tamir Fridman
     Date Created : 29/04/2019
     Copyright PAI-TECH 2018, all right reserved
 */


/*
     * enc:
     * ---------
     * 0 = none  - plain-text
     * 1 = table - the entire table will be converted
     * 2 = row   - only rows will be converted
     *
     */

const PAI_LDB_VERSION = "0.2";
const PAI_LDB_SCHEMA_ENC = 0;  //database schema tables encryption  level
const PAI_LDB_DEFAULT_ENC = 0; //tables & objects default encryption level
const PAI_LDB_TABLES = "pai-ldb-tables";

class PAI_LDB
{

    constructor()
    {

    }

    static init(clear = true)
    {
        if(clear)
        {
            localStorage.clear();
        }
        let pai_ldb = {
            "database-name":"discovery-bank",
            "version":PAI_LDB_VERSION,
        };
        let pai_ldb_tables = {
            "pai-ldb-tables": {
                "table-id":PAI_LDB.get_uid(),
                "table-name":"pai-ldb-tables",
                "enc":PAI_LDB_SCHEMA_ENC,
            }
        }
        PAI_LDB.set_object("pai-ldb-schema",pai_ldb,PAI_LDB_SCHEMA_ENC);
        PAI_LDB.set_object(PAI_LDB_TABLES,pai_ldb_tables,PAI_LDB_SCHEMA_ENC);
    }

    static get_uid()
    {
        let chars = '0123456789abcdef'.split('');
        let uuid = [], rnd = Math.random, r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4'; // version 4
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | rnd() * 16;

                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r & 0xf];
            }
        }
        return uuid.join('');
    }

    static encode(data)
    {
        return btoa(encodeURIComponent(data));
    }

    static decode(data)
    {
        return decodeURIComponent(atob(data));
    }


    static set_data(key,data,enc = PAI_LDB_DEFAULT_ENC)
    {
        let d = (enc == 1) ? this.encode(data) : data;
        localStorage.setItem(key,d);
    }

    static get_data(key,dec = PAI_LDB_DEFAULT_ENC)
    {
        let d = localStorage.getItem(key);
        return (dec == 1) ? this.decode(d) : d;
    }

    static set_object(key,data,enc = PAI_LDB_DEFAULT_ENC)
    {
        this.set_data(key,JSON.stringify(data),enc);
    }

    static get_object(key,dec = PAI_LDB_DEFAULT_ENC)
    {
        let d = this.get_data(key,dec);
        return JSON.parse(d);
    }

    static del_object(key)
    {
        localStorage.hasOwnProperty(key)
        {
            localStorage.removeItem(key);
        }
    }

    static update_tables_list(table_name,meta_data)
    {
        let ldb_tables = PAI_LDB.get_object(PAI_LDB_TABLES,PAI_LDB_SCHEMA_ENC);
        ldb_tables[table_name] = meta_data;
        PAI_LDB.set_object(PAI_LDB_TABLES,ldb_tables,PAI_LDB_SCHEMA_ENC);
    }

    static get_table_metadata(table_name)
    {
        let ldb_tables = PAI_LDB.get_object(PAI_LDB_TABLES,PAI_LDB_SCHEMA_ENC);
        return ldb_tables[table_name];
    }


    static create_table(table_name,table_data_object,pk_field_name,enc = PAI_LDB_DEFAULT_ENC)
    {
        let meta = {"table-id":PAI_LDB.get_uid(),"table-name":table_name,"enc":enc};

        let index = {};
        for (let row in table_data_object)
        {
            if (table_data_object.hasOwnProperty(row))
            {
                let rec = table_data_object[row];
                let index_id = (' ' + rec[pk_field_name]).slice(1);  //string cloning (deep copy)
                let d = rec;
                if(enc === 2)
                {
                    d = this.encode(JSON.stringify(rec));
                }
                index[index_id] = d;
            }
        }

        PAI_LDB.set_object(table_name,index,enc);
        PAI_LDB.update_tables_list(table_name,meta);
    }

    static get_table(table_name)
    {
        let md = this.get_table_metadata(table_name);
        return PAI_LDB.get_object(table_name,md.enc);
    }

    static get_record(table_name,id)
    {
        let tbl = PAI_LDB.get_table(table_name);
        if(tbl) {
            if(tbl.hasOwnProperty(id)) {
                return tbl[id];
            }
            else
            {
                console.log("PAI-LDB :] id " + id + " not found in table " + table_name )
            }
        }
        else
        {
            console.log("PAI-LDB :] table " + table_name + " not found")
        }
    }

    static del_record(table_name,id)
    {
        let tbl = PAI_LDB.get_table(table_name);
        if(tbl) {
            if(tbl.hasOwnProperty(id)) {
                delete tbl[id];
                let md = this.get_table_metadata(table_name);
                PAI_LDB.set_object(table_name,tbl,md.enc);
            }
            else
            {
                console.log("PAI-LDB :] id " + id + " not found in table " + table_name )
            }
        }
        else
        {
            console.log("PAI-LDB :] table " + table_name + " not found")
        }
    }

    static update_record(table_name,id,data)
    {
        let tbl = PAI_LDB.get_table(table_name);
        if(tbl) {
            if(tbl.hasOwnProperty(id)) {
                tbl[id] = data;
                let md = this.get_table_metadata(table_name);
                PAI_LDB.set_object(table_name,tbl,md.enc);
            }
            else
            {
                console.log("PAI-LDB :] id " + id + " not found in table " + table_name )
            }
        }
        else
        {
            console.log("PAI-LDB :] table " + table_name + " not found")
        }
    }

    static add_record(table_name,id,data)
    {
        let tbl = PAI_LDB.get_table(table_name);
        if(tbl) {
            tbl[id] = data;
            let md = this.get_table_metadata(table_name);
            PAI_LDB.set_object(table_name,tbl,md.enc);
        }
        else
        {
            console.log("PAI-LDB :] table " + table_name + " not found")
        }
    }

    static create_index(index_name,table_name,field_name)
    {
        let data = PAI_LDB.get_table()
    }

}