import { User } from './users';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity("user_auth")
export class UserAuth extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  identity_type!: string

  @Column()
  identifier!: string

  @Column()
  credential!: string

  @ManyToOne(() => User, {
    cascade: true
  })

  @JoinColumn({ name: 'user_id' })
  user!: User
}
