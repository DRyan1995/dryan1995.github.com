#Database

## How to connect to Panpan's Database && Some simple usage:

> + Panpan's Database `mysql -uroot -h 10.0.0.15`

> + My local Database `mysql -uroot -proot`

> + `SHOW Databases;`

> + `USE Database_name`

> + `Show Tables;`

> + `desc table_name`

>  How to add a column in a table:

> + `ALTER TABLE Table_name ADD Field_name data_type AFTER Field_name2`

> How to select data in a table

> + `SELECT * FROM table_name WHERE Field_name = value`

> How to update data in a table

> + `UPDATE table_name SET Field_name1 = value1 WHERE Field_name2 = value2`

> How to modify a column name in a table

> + `ALTER TABLE table_name CHANGE Field_name1 Field_name2 Field_type`

> How to delete a column in a table

> + `ALTER TABLE table_name DROP Field_name`
