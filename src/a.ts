import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { B } from './b'

@Entity()
export class A {
  @PrimaryGeneratedColumn()
  id: number
  
  @ManyToOne(
    (type) => B,
    (ref) => ref.a
  )
  b: B
}
