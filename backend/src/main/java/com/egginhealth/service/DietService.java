package com.egginhealth.service;

import com.egginhealth.data.dto.comment.CommentInputDto;
import com.egginhealth.data.dto.diet.DietInputDto;
import com.egginhealth.data.entity.Comment;
import com.egginhealth.data.entity.Diet;
import com.egginhealth.data.entity.Member;
import com.egginhealth.data.repository.CommentRepository;
import com.egginhealth.data.repository.DietRepository;
import com.egginhealth.data.repository.MemberRepository;
import com.egginhealth.util.DateTimeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DietService {

    private static final String DIR_NAME ="diet";

    private final MemberRepository memberRepository;
    private final DietRepository dietRepository;
    private final CommentRepository commentRepository;
    private final S3Service s3Service;

    public Map<String,Integer> save(DietInputDto dietInputDto,int memberId) throws IOException{

        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new RuntimeException("Member not found"));

        String url = s3Service.upload(dietInputDto.image(),DIR_NAME);

        LocalDateTime dateTime = DateTimeUtil.getStringToDateTime(dietInputDto.date());

        Diet dietData = Diet.builder()
                .type(dietInputDto.type())
                .date(dateTime)
                .imgUrl(url)
                .member(member)
                .build();

        int dietId = dietRepository.save(dietData).getId();

        Map<String,Integer> response = new HashMap<>();
        response.put("dietId",dietId);

        return response;
    }

    public void saveComment(CommentInputDto commentInputDto, int memberId) throws IOException{
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
}
