import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Article } from './article';

@Entity("categorys")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  title!: string

  @Column()
  cover!: string

  @Column()
  article_count!: number;

  @ManyToMany(() => Article, {
    cascade: true
  })

  @JoinTable({
    name: 'articles_categorys_rel',
    joinColumn: {
      name: 'category_id'
    },
    inverseJoinColumn: {
      name: 'article_id'
    }
  })
  articles!: Article[]
}
