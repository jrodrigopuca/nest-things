import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'varchar' })
  username: string;
  @Column({ type: 'varchar' })
  rol: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
