import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Member } from '../../core/entities/member.entity';
import {
	IMemberRepository,
	MemberRow,
} from '../../core/interfaces/member.interface';

@Injectable()
export class MemberRepository implements IMemberRepository {
	constructor(@InjectKnex() private readonly knex: Knex) {}

	async findAllWithBookCount(): Promise<
		(Member & Pick<MemberRow, 'id'> & { book: number })[]
	> {
		const members: Array<Member & Pick<MemberRow, 'id'> & { book: number }> =
			await this.knex
				.table('members')
				.select([
					'members.id',
					'members.code',
					'members.name',
					this.knex.raw('COALESCE(SUM(member_books.id), 0) as book'),
				])
				.from('members')
				.leftOuterJoin('member_books', 'members.id', 'member_books.member_id')
				.leftOuterJoin('books', 'member_books.book_id', 'books.id')
				.groupBy('members.id')
				.groupBy('member_books.member_id');

		return members;
	}

	async findOne(
		id: number,
	): Promise<(Member & { penalized_at: Date | null }) | null> {
		const memberRecord = await this.knex('members')
			.where('members.id', id)
			.first<Member & { penalized_at: Date | null }>(
				'members.code',
				'members.name',
				'members.penalized_at',
			);

		if (!memberRecord) {
			return null;
		}

		const { penalized_at, ...record } = memberRecord;

		const member: Member & { penalized_at: Date | null } = {
			...record,
			penalized_at: penalized_at ? new Date(penalized_at) : null,
		};

		return member;
	}

	async updateOne(
		id: number,
		input: Partial<Member> & {
			penalized_at?: string | undefined;
			updated_at: string;
		},
	): Promise<(Member & { penalized_at: Date | null }) | null> {
		const members = await this.knex('members')
			.where('id', id)
			.update(input)
			.returning<Array<Member & { penalized_at: string | null }>>([
				'members.code',
				'members.name',
				'members.penalized_at',
			]);

		const memberRecord = members[0];

		const { penalized_at, ...record } = memberRecord;

		const member: Member & { penalized_at: Date | null } = {
			...record,
			penalized_at: penalized_at ? new Date(penalized_at) : null,
		};

		return member;
	}
}
