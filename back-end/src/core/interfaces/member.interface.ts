import { Injectable } from '@nestjs/common';
import type { Member } from '../entities/member.entity';

export interface MemberRow extends Member {
	id: number;
	penalized_at?: Date | null;
	created_at: Date;
	updated_at: Date;
}

@Injectable()
export abstract class IMemberRepository {
	abstract findAllWithBookCount(): Promise<
		Array<Member & Pick<MemberRow, 'id'> & { book: number }>
	>;

	abstract findOne(
		id: number,
	): Promise<(Member & { penalized_at: Date | null }) | null>;

	abstract updateOne(
		id: number,
		input: Partial<Member> & { penalized_at?: string; updated_at: string },
	): Promise<(Member & { penalized_at: Date | null }) | null>;
}
