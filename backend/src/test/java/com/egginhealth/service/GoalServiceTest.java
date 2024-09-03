package com.egginhealth.service;

import com.egginhealth.data.dto.GoalDto;
import com.egginhealth.data.entity.Goal;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.GoalRepository;
import com.egginhealth.data.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GoalServiceTest {

    @InjectMocks
    private GoalService goalService;

    @Mock
    private GoalRepository goalRepository;

    @Mock
    private MemberRepository memberRepository;

    @Spy
    private Member member = Mockito.spy(Member.class);


    @Test
    @DisplayName("목표가 저장된다.")
    void testSaveGoal() {
        // given
        GoalDto givenGoalDto = new GoalDto(1, 1, 1);
        int givenUserId = 10;

        given(memberRepository.findById(givenUserId))
                .willReturn(Optional.of(member));
        given(goalRepository.findByMemberId(givenUserId))
                .willReturn(Optional.empty());

        // when
        goalService.saveGoal(givenGoalDto, givenUserId);

        // then
        verify(goalRepository).save(any(Goal.class));
        verify(goalRepository, times(1)).save(any(Goal.class));
    }

    @Test
    @DisplayName("멤버가 존재하지 않을 때 에러를 던진다. .")
    void testSaveGoalMemberNotFound() {
        // given
        GoalDto givneGoalDto = new GoalDto(1, 1, 1);
        int givenUserId = 1;
        given(memberRepository.findById(givenUserId)).willReturn(Optional.empty());

        // when & then
        assertThrows(IllegalArgumentException.class, () -> goalService.saveGoal(givneGoalDto, givenUserId));
        verify(goalRepository, never()).save(any(Goal.class));
    }


}