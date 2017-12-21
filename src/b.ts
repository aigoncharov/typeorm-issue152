import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { A } from './a'

@Entity()
export class B {
  @PrimaryGeneratedColumn()
  id: number
  
  @OneToMany(
    (type) => A,
    (ref) => ref.b,
    {
      eager: true
    }
  )
  a: A[]
}
