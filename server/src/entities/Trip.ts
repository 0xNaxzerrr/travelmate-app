import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';
import { ITrip, IPhoto, IEquipment } from '../interfaces/ITrip';
import { ICity } from '../interfaces/ILocation';

@Entity('trips')
export class Trip implements ITrip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.trips)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('jsonb')
  destination: {
    country: string;
    cities: ICity[];
  };

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  duration: number;

  @Column({
    type: 'enum',
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned'
  })
  status: 'planned' | 'ongoing' | 'completed';

  @Column('jsonb', { default: [] })
  photos: IPhoto[];

  @Column('jsonb')
  recommendations: {
    equipment: IEquipment[];
  };

  @Column({ nullable: true })
  shareableLink?: string;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Trip>) {
    Object.assign(this, partial);
  }
}