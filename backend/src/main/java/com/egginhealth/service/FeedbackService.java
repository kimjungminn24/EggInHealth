package com.egginhealth.service;

import com.egginhealth.data.dto.feedback.FeedbackDto;
import com.egginhealth.data.dto.feedback.FeedbackInputDto;
import com.egginhealth.data.entity.Feedback;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.FeedbackRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.util.DateTimeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private static final String DIR_NAME = "feedback";

    private final MemberRepository memberRepository;
    private final FeedbackRepository feedbackRepository;
    private final S3Service s3Service;

    public Map<String, Integer> save(FeedbackInputDto feedbackInputDto, int memberId) throws IOException{
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new RuntimeException("Member not found"));

        String url = s3Service.upload(feedbackInputDto.record(),DIR_NAME);

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(feedbackInputDto.createdAt());

        Feedback feedbackData = Feedback.builder()
                .motionSimilarity(feedbackInputDto.motionSimilarity())
                .memo(feedbackInputDto.memo())
                .exerciseId(feedbackInputDto.exerciseId())
                .videoUrl(url)
                .createdAt(dateTime)
                .member(member)
                .build();

        int feedbackId = feedbackRepository.save(feedbackData).getId();
        Map<String, Integer> response = new HashMap<>();
        response.put("feedbackId",feedbackId);

        return response;
    }

    public List<FeedbackDto> getFeedbackList(int id, int memberId){
        memberRepository.findById(memberId)
                .orElseThrow(()-> new RuntimeException("Member not found"));

        return feedbackRepository.findById(id)
                .stream()
                .map(FeedbackDto::from)
                .toList();
    }

}
