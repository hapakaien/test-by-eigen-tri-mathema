import { Injectable } from '@nestjs/common';
import { Member } from '../entities/member.entity';
import { IMemberRepository } from '../interfaces/member.interface';

@Injectable()
export class FindAllMemberWithBookCount {
	constructor(private readonly memberRepository: IMemberRepository) {}

	async execute() {
		const members = await this.memberRepository.findAllWithBookCount();

		return members;
	}
}
