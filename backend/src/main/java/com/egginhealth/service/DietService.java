package com.egginhealth.service;

import com.egginhealth.data.dto.DateDto;
import com.egginhealth.data.dto.comment.CommentDietDto;
import com.egginhealth.data.dto.comment.CommentInputDto;
import com.egginhealth.data.dto.diet.DietDayOutputDto;
import com.egginhealth.data.dto.diet.DietInputDto;
import com.egginhealth.data.dto.diet.DietSetDto;
import com.egginhealth.data.entity.Comment;
import com.egginhealth.data.entity.Diet;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.CommentRepository;
import com.egginhealth.data.repository.DietRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.util.DateTimeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DietService {

    private static final String DIR_NAME = "diet";

    private final MemberRepository memberRepository;
    private final DietRepository dietRepository;
    private final CommentRepository commentRepository;
    private final CommentService commentService;
    private final S3Service s3Service;
    private final MemberStatusService memberStatusService;

    public Map<String, Integer> save(DietInputDto dietInputDto, int memberId) throws IOException {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        String url = s3Service.upload(dietInputDto.image(), DIR_NAME);

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(dietInputDto.date());

        System.out.println("Test");
        Diet dietData = Diet.builder()
                .type(dietInputDto.type())
                .date(dateTime)
                .imgUrl(url)
                .member(member)
                .build();

        int dietId = dietRepository.save(dietData).getId();

        Map<String, Integer> response = new HashMap<>();
        response.put("dietId", dietId);
        memberStatusService.updateMemberDietStatus(DateDto.localDateTimeToDateDto(dateTime), true);

        return response;
    }

    public void saveComment(CommentInputDto commentInputDto, int memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(commentInputDto.createdAt());

        Comment comment = Comment.builder()
                .content(commentInputDto.content())
                .createdAt(dateTime)
                .boardId(commentInputDto.boardId())
                .boardType(commentInputDto.boardType())
                .member(member)
                .build();

        commentRepository.save(comment);
    }

    public void updateDiet(DietInputDto dietInputDto, int id) throws IOException {
        Diet diet = dietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diet not found"));

        String prevUrl = diet.getImgUrl();
        s3Service.delete(DIR_NAME, prevUrl);
        String url = s3Service.upload(dietInputDto.image(), DIR_NAME);

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(dietInputDto.date());

        DietSetDto dietSetDto = DietSetDto.from(dietInputDto, dateTime, url);
        diet.updateDietBy(dietSetDto);
    }

    public boolean deleteDiet(int id) {
        Diet diet = dietRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Diet not found"));

        s3Service.delete(DIR_NAME, diet.getImgUrl());
        dietRepository.deleteById(id);
        return true;
    }

    public List<DietDayOutputDto> getDayRegister(int memberId, int year, int month, int day) {
        return dietRepository.findByDietDayList(memberId, year, month, day)
                .stream()
                .map(diet -> {
                    List<CommentDietDto> commentList = commentService.getDietCommentToDay(diet.getId(), "D");
                    return DietDayOutputDto.from(diet, commentList);
                })
                .collect(Collectors.toList());
    }
}
