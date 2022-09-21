import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1660868773823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                { // default obrigatory field
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10, //part inteira
                    scale: 2, // 2 casas decimais
                },
                {
                    name: 'quantity',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        }))
    }

    // delete migration
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }
}
