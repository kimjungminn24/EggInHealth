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


    public void saveGoal(GoalDto goalDto, int userId) {
        Member member = memberRepository.getOne(userId);
        goalRepository.save(Goal.createGoal(goalDto, member));
    }

}
