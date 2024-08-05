package com.egginhealth.service;

import com.egginhealth.data.dto.GoalDto;
import com.egginhealth.data.entity.Goal;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.GoalRepository;
import com.egginhealth.data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GoalService {

    private final GoalRepository goalRepository;
    private final MemberRepository memberRepository;


    public void saveGoal(GoalDto goalDto, int uid) {
        Member member = memberRepository.findById(uid)
                .orElseThrow(() -> new IllegalArgumentException("Member not found for ID: " + uid));
        Goal goal = goalRepository.findByMemberId(uid).orElse(Goal.createGoal(goalDto, member));
        goal.updateGoal(goalDto);
        goalRepository.save(goal);
    }

    public GoalDto getGoal(int uid) {
        Goal goal = goalRepository.findByMemberId(uid)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자의 목표가 없습니다."));
        return GoalDto.from(goal);
    }

}
