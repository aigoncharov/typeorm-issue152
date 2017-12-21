import 'reflect-metadata'
import { createConnection, Entity, ManyToOne, PrimaryGeneratedColumn, ConnectionOptions } from 'typeorm'

import { A } from './a'
import { B } from './b'

const issue1352 = async () => {
  const dbConfig: ConnectionOptions = {
    type: 'sqlite',
    logging: 'all',
    database: '/tmp/issue1352/issue1352.db',
    entities: [ A, B ],
    synchronize: true
  }
  const connection = await createConnection(dbConfig)
  const entityManager = connection.createEntityManager()
  const aNum = 5
  const aArr = new Array(aNum).fill(0).map(() => entityManager.create(A))
  await Promise.all(aArr.map((item) => entityManager.save(A, item)))
  const b = entityManager.create(B, { a: aArr })
  await entityManager.save(B, b)
  const bDB = await entityManager.findOneOrFail(B, b.id)
  if (!b.a || b.a.length !== aNum) {
    throw new Error('Create does not set relations')
  }
}

issue1352()
