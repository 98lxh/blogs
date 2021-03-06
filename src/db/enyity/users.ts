import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  nickname!: string

  @Column()
  avatar!: string

  @Column()
  introduce!: string
}
